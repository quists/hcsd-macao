import { useEffect, useRef, useState } from 'react';
import { Tx, useLang } from '@/i18n';
import type { Lang } from '@/content';
import type { View } from '@/hooks/useRoute';
import { reduceMotion, scroller } from '@/lib/motion';
import { Logo } from './common';

/* ---------- Loader: the logo animation, every visit ---------- */
// The intro is the society's own film, played in full in a framed rectangle, even when the device asks for reduced motion.
// Visitors can only skip it or turn its sound on: no controls, no pausing, no menu, no picture-in-picture, casting, fullscreen or download.
// If the browser refuses to autoplay (low-power modes do), the logo stays on screen with a Play button instead of vanishing.
export function Loader({ onDone }: { onDone: () => void }) {
  const { lang, tPlain } = useLang();
  const [startLang] = useState(lang); // the fallback logo is chosen once, by the language the visit starts in
  const [leaving, setLeaving] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const done = useRef(false);
  const timers = useRef<number[]>([]);
  const later = (fn: () => void, ms: number) => { timers.current.push(window.setTimeout(fn, ms)); };
  const finish = () => {
    if (done.current) return;
    done.current = true;
    setLeaving(true);
    try { video.current?.pause(); } catch { /* already stopped */ }
    window.setTimeout(onDone, 500);
  };
  const [soundOn, setSoundOn] = useState(false);
  const [playing, setPlaying] = useState(false); // shows the sound button once the film is running
  // Try with sound first (some browsers allow it for returning visitors). If refused, play silently and offer Sound on.
  const play = () => {
    const v = video.current; if (!v) return;
    v.muted = false;
    const ok = () => { setBlocked(false); setPlaying(true); setSoundOn(!v.muted); };
    const silent = () => {
      v.muted = true;
      const p2 = v.play();
      if (p2) p2.then(ok).catch(() => { setBlocked(true); later(finish, 6000); });
    };
    const p = v.play();
    if (p) p.then(ok).catch(silent); else ok();
  };
  const toggleSound = () => {
    const v = video.current; if (!v) return;
    v.muted = !v.muted;
    if (v.paused) v.play().catch(() => {});
    setSoundOn(!v.muted);
  };
  // Start from the first frame once enough has loaded to play through without stalling, so the whole animation is seen.
  const started = useRef(false);
  const start = () => {
    if (started.current) return;
    started.current = true;
    const v = video.current; if (v) v.currentTime = 0;
    play();
  };
  useEffect(() => {
    document.documentElement.classList.add('is-loading');
    const v = video.current;
    if (v && v.readyState >= 4) start(); else later(start, 4000); // on a slow line, start anyway after 4s
    later(finish, 30000); // a download that never starts never holds the page for more than 30s
    // The intro cannot be paused: coming back to the tab resumes it, and media keys or the lock screen cannot stop it.
    const onVisible = () => { if (!document.hidden && !done.current && started.current) play(); };
    document.addEventListener('visibilitychange', onVisible);
    const ms = 'mediaSession' in navigator ? navigator.mediaSession : null;
    const keepPlaying = () => { if (!done.current) play(); };
    const ignore = () => {};
    try {
      ms?.setActionHandler('pause', keepPlaying);
      ms?.setActionHandler('stop', keepPlaying);
      ms?.setActionHandler('seekbackward', ignore);
      ms?.setActionHandler('seekforward', ignore);
      ms?.setActionHandler('seekto', ignore);
    } catch { /* some actions are not supported everywhere */ }
    return () => {
      timers.current.forEach(clearTimeout);
      document.removeEventListener('visibilitychange', onVisible);
      try { (['pause', 'stop', 'seekbackward', 'seekforward', 'seekto'] as MediaSessionAction[]).forEach((a) => ms?.setActionHandler(a, null)); } catch { /* ignore */ }
      document.documentElement.classList.remove('is-loading');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const key = startLang === 'zh' ? 'zh' : 'en';
  return (
    <div className={'loader' + (leaving ? ' is-done' : '') + (blocked ? ' is-blocked' : '')} role="dialog" aria-label="HCSD Macao">
      <div className="loader-frame" onContextMenu={(e) => e.preventDefault()} onDoubleClick={(e) => e.preventDefault()}>
      <video ref={video} src="media/intro.mp4" playsInline preload="auto" poster="media/intro-poster.jpg" aria-hidden="true" tabIndex={-1}
        disablePictureInPicture disableRemotePlayback controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
        onContextMenu={(e) => e.preventDefault()}
        onCanPlayThrough={start}
        onVolumeChange={(e) => setSoundOn(!e.currentTarget.muted)}
        onPlaying={(e) => {
          // Safety net: the time left in the clip plus a margin, reset whenever it resumes, so it is never cut short.
          const v = e.currentTarget, left = Number.isFinite(v.duration) ? v.duration - v.currentTime : 10;
          setBlocked(false); timers.current.forEach(clearTimeout); timers.current = [];
          later(finish, left * 1000 + 8000);
        }}
        onPause={(e) => {
          // Paused by the browser before the end (a low-power mode, for instance): show the logo and the Play button instead of a blank screen.
          if (done.current || e.currentTarget.ended || document.hidden) return; // a hidden tab resumes on return
          setBlocked(true); timers.current.forEach(clearTimeout); timers.current = []; later(finish, 6000);
        }}
        onEnded={() => window.setTimeout(finish, 700)} onError={() => window.setTimeout(finish, 400)} />
      {blocked && <img className="still" src={`img/logo-${key}-ink.png`} alt="" />}
      </div>
      <div className="loader-actions">
        {!blocked && playing && (
          <button type="button" className="pill pill-white sound-btn" aria-pressed={soundOn} onClick={toggleSound}>
            {soundOn
              ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z" /><path d="M17 9l4 6M21 9l-4 6" /></svg>
              : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z" /><path d="M16.5 8.5a5 5 0 0 1 0 7M19.5 5.5a9 9 0 0 1 0 13" /></svg>}
            <Tx k={soundOn ? 'sound_off' : 'sound_on'} />
          </button>
        )}
        {blocked && (
          <button type="button" className="pill pill-cobalt" onClick={() => { timers.current.forEach(clearTimeout); timers.current = []; later(finish, 20000); play(); }}>
            <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4l13 8-13 8z" fill="currentColor" /></svg>
            <Tx k="play_intro" />
          </button>
        )}
        <button type="button" className="pill pill-ink skip-anim" onClick={finish} aria-label={tPlain('skip')}>
          <Tx k="skip" />
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 5l8 7-8 7M15 5v14" /></svg>
        </button>
      </div>
    </div>
  );
}

const LANGS: [Lang, string, string, string][] = [['en', 'en', 'EN', 'English'], ['zh', 'zh-Hant', '繁中', '繁體中文'], ['pt', 'pt', 'PT', 'Português']];
export function LangSwitch({ long = false, style }: { long?: boolean; style?: React.CSSProperties }) {
  const { lang, setLang } = useLang();
  return (
    <div className="langs" style={style} role="group" aria-label="Language · 語言 · Idioma">
      {LANGS.map(([l, tag, short, full]) => (
        <button key={l} type="button" lang={tag} aria-pressed={lang === l} onClick={() => setLang(l)}>{long ? full : short}</button>
      ))}
    </div>
  );
}

/* ---------- Top bar: tucks away while you scroll down, comes back when you scroll up ---------- */
export function TopBar({ menuOpen, onMenu, onClose }: { menuOpen: boolean; onMenu: () => void; onClose: () => void }) {
  const { tPlain } = useLang();
  const [tucked, setTucked] = useState(false);
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 120) setTucked(false);
      else if (y > last + 6) setTucked(true);
      else if (y < last - 6) setTucked(false);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className={'topbar' + (tucked && !menuOpen ? ' is-tucked' : '') + (menuOpen ? ' over-menu' : '')} onFocusCapture={() => setTucked(false)}>
      <LangSwitch />
      {menuOpen
        ? <button type="button" className="menu-btn" aria-expanded="true" aria-controls="menu" onClick={onClose}>
            <Tx k="close" className="lbl" />
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        : <button type="button" className="menu-btn" aria-expanded="false" aria-controls="menu" aria-label={tPlain('menu')} onClick={onMenu}>
            <Tx k="menu" className="lbl" />
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M4 8h16M4 16h16" /></svg>
          </button>}
    </div>
  );
}

/* ---------- Menu: a cobalt field that floods out from the button ---------- */
const LINKS: [View, string][] = [['about', 'nav_about_us'], ['projects', 'nav_projects'], ['history', 'nav_history'], ['join', 'nav_join']];
export function Menu({ open, view, onClose }: { open: boolean; view: View; onClose: (focusBack: boolean) => void }) {
  const { tPlain } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  // Stay mounted for the closing animation.
  const [shown, setShown] = useState(open);
  useEffect(() => {
    if (open) { setShown(true); return; }
    if (!shown) return;
    const t = window.setTimeout(() => setShown(false), reduceMotion ? 0 : 380);
    return () => window.clearTimeout(t);
  }, [open, shown]);
  useEffect(() => {
    if (!open) return;
    scroller.lenis?.stop();
    document.body.style.overflow = 'hidden';
    ref.current?.querySelector<HTMLElement>('li a')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose(true);
      if (e.key === 'Tab' && ref.current) {
        const f = [...Array.from(document.querySelectorAll<HTMLElement>('.topbar button')), ...Array.from(ref.current.querySelectorAll<HTMLElement>('a, button'))].filter((x) => x.offsetParent !== null);
        if (!f.length) return;
        if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); scroller.lenis?.start(); document.body.style.overflow = ''; };
  }, [open, onClose]);
  if (!shown) return null;
  return (
    <div className={'menu on-color' + (open ? '' : ' is-closing')} id="menu" ref={ref} role="dialog" aria-modal="true" aria-label={tPlain('menu')}>
      <a href="#" className="menu-home" aria-label={tPlain('home')} onClick={() => onClose(false)}><Logo variant="paper" /></a>
      <div className="menu-bottom">
        <ul>
          {LINKS.map(([id, k], i) => (
            <li key={id} style={{ ['--i' as string]: i }}><a href={`#${id}`} aria-current={view === id ? 'page' : undefined} onClick={() => onClose(false)}>{tPlain(k)}</a></li>
          ))}
        </ul>
        <a className="menu-mail" href={`mailto:${tPlain('email_ph')}`}>{tPlain('email_ph')}</a>
      </div>
    </div>
  );
}

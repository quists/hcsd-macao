import { useEffect, useRef, useState } from 'react';
import { Tx, useLang } from '@/i18n';
import type { Lang } from '@/content';
import { reduceMotion, scroller } from '@/lib/motion';
import { Logo } from './common';

/* ---------- Loader: the logo animation, every visit ---------- */
// The intro is the society's own short, skippable logo animation, so it plays even when the device asks for reduced motion.
// If the browser refuses to autoplay (low-power modes do), the logo stays on screen with a Play button instead of vanishing.
export function Loader({ onDone }: { onDone: () => void }) {
  const { lang, tPlain } = useLang();
  const [startLang] = useState(lang); // the clip is chosen once, by the language the visit starts in
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
  const play = () => {
    const v = video.current; if (!v) return;
    v.muted = true; v.defaultMuted = true; v.setAttribute('muted', '');
    const p = v.play();
    if (p) p.then(() => setBlocked(false)).catch(() => { setBlocked(true); later(finish, 6000); });
  };
  useEffect(() => {
    document.documentElement.classList.add('is-loading');
    play();
    later(finish, 20000); // a stalled download never holds the page for more than 20s
    return () => { timers.current.forEach(clearTimeout); document.documentElement.classList.remove('is-loading'); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const key = startLang === 'zh' ? 'zh' : 'en';
  return (
    <div className={'loader' + (leaving ? ' is-done' : '') + (blocked ? ' is-blocked' : '')} role="dialog" aria-label="HCSD Macao">
      <video ref={video} src={`media/logo-${key}.mp4`} muted autoPlay playsInline preload="auto" poster="media/logo-poster.jpg" aria-hidden="true"
        onPlaying={() => { setBlocked(false); timers.current.forEach(clearTimeout); timers.current = []; later(finish, 9000); }}
        onPause={(e) => {
          // Paused by the browser before the end (a low-power mode, for instance): show the logo and the Play button instead of a blank screen.
          if (done.current || e.currentTarget.ended) return;
          setBlocked(true); timers.current.forEach(clearTimeout); timers.current = []; later(finish, 6000);
        }}
        onEnded={() => window.setTimeout(finish, 500)} onError={() => window.setTimeout(finish, 400)} />
      {blocked && <img className="still" src={`img/logo-${key}-ink.png`} alt="" />}
      <div className="loader-actions">
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
export function TopBar({ menuOpen, onMenu }: { menuOpen: boolean; onMenu: () => void }) {
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
    <div className={'topbar' + (tucked && !menuOpen ? ' is-tucked' : '')} onFocusCapture={() => setTucked(false)}>
      <LangSwitch />
      <button type="button" className="menu-btn" aria-expanded={menuOpen} aria-controls="menu" aria-label={tPlain('menu')} onClick={onMenu}>
        <Tx k="menu" className="lbl" />
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M4 8h16M4 16h16" /></svg>
      </button>
    </div>
  );
}

/* ---------- Menu: a cobalt field that floods out from the button ---------- */
const LINKS: [string, string][] = [['top', 'nav_top'], ['macao', 'nav_macao'], ['what', 'nav_what'], ['projects', 'nav_projects'], ['history', 'nav_history'], ['team', 'nav_team'], ['join', 'nav_join']];
export function Menu({ open, onClose }: { open: boolean; onClose: (focusBack: boolean) => void }) {
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
        const f = Array.from(ref.current.querySelectorAll<HTMLElement>('a, button')).filter((x) => x.offsetParent !== null);
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
      <Logo variant="paper" />
      <ul>
        {LINKS.map(([id, k], i) => (
          <li key={id} style={{ ['--i' as string]: i }}><a href={`#${id}`} onClick={() => onClose(false)}>{tPlain(k)}</a></li>
        ))}
      </ul>
      <div className="foot">
        <LangSwitch long />
        <span>[EMAIL ADDRESS]</span>
      </div>
      <button type="button" className="menu-btn close-btn" onClick={() => onClose(true)}>
        <Tx k="close" />
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
      </button>
    </div>
  );
}

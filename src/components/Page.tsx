import { useRef, useState, type PointerEvent as RPointerEvent } from 'react';
import { ChevronsLeftRight } from 'lucide-react';
import { Echo, Tx, useLang } from '@/i18n';
import { CREDITS, L, TABS, TIMELINE } from '@/content';
import { gsap, motionOn, useGSAP } from '@/lib/motion';
import { ImageCompare, ImageCompareAfter, ImageCompareBefore, ImageCompareHandle, ImageCompareLabel } from '@/components/ui/image-compare';
import { Clover, Logo, NewsForm } from './common';

const Down = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 5v14M6 13l6 6 6-6" /></svg>
);

function Img({ src, altKey, className }: { src: string; altKey?: string; className?: string }) {
  const { tPlain } = useLang();
  return <img className={className} src={src} alt={altKey ? tPlain(altKey) : ''} loading="lazy" decoding="async" />;
}

/* 1. Opening: a cobalt field, the line in Latin, the same line in Chinese running down the edge */
function Hero() {
  const { lang, tPlain } = useLang();
  return (
    <section className="field field-cobalt hero on-color" id="top" aria-labelledby="hero-h">
      <a className="logo-link" href="#top" aria-label="HCSD Macao"><Logo variant="paper" /></a>
      <p className="vertical" aria-hidden="true" lang={lang === 'zh' ? 'en' : 'zh-Hant'}>{lang === 'zh' ? 'Keep it alive' : '讓它活下去'}</p>
      <div className="wrap bottom">
        <Tx k="hero_h" as="h1" id="hero-h" className="display" />
        <div className="row">
          <Tx k="hero_lede" as="p" className="lede" />
          <a className="pill pill-white" href="#join">{tPlain('join_us')}<Down /></a>
        </div>
      </div>
    </section>
  );
}

/* 2. The statement fills from grey to ink as it is read */
function Statement() {
  const { lang, t } = useLang();
  const ref = useRef<HTMLParagraphElement>(null);
  // Split into words (or characters for Chinese) so the fill can travel through the sentence.
  const text = t('statement');
  const parts = lang === 'zh' ? Array.from(text) : text.split(/(\s+)/);
  useGSAP(() => {
    if (!motionOn || !ref.current) return;
    gsap.fromTo(ref.current.querySelectorAll('.w'), { opacity: 0.16 }, {
      opacity: 1, ease: 'none', stagger: 0.04,
      scrollTrigger: { trigger: ref.current, start: 'top 80%', end: 'bottom 45%', scrub: true }
    });
  }, { dependencies: [lang], revertOnUpdate: true });
  return (
    <section className="field field-paper statement" aria-label={t('mission_h')}>
      <div className="wrap">
        <p className="big" ref={ref}>{parts.map((w, i) => /^\s+$/.test(w) ? w : <span className="w" key={i}>{w}</span>)}</p>
        <Echo k="s2_h" className="echo echo-line lede" />
      </div>
    </section>
  );
}

/* 3. Macao: its name set huge over its photographs, then the same gate in 1844 and today */
const MOSAIC: [string, string][] = [
  ['img/senado.jpg', 'alt_senado'], ['img/ruins.jpg', ''], ['img/ama-gate.jpg', 'alt_amagate'],
  ['img/lattice.jpg', ''], ['img/taipa.jpg', ''], ['img/felicidade-night.jpg', 'alt_felicidade'],
  ['img/coloane.jpg', ''], ['img/guia.jpg', ''], ['img/cunha.jpg', 'alt_cunha']
];
function Macao() {
  const { tPlain } = useLang();
  const [pos, setPos] = useState(55);
  const year = Math.round(1844 + (182 * pos) / 100);
  const label = pos <= 1 ? '1844' : pos >= 99 ? tPlain('today') : String(year);
  const jump = (e: RPointerEvent<HTMLDivElement>) => {
    if ((e.target as Element).closest('[data-slot="image-compare-handle"]')) return;
    const r = e.currentTarget.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, Math.round(((e.clientX - r.left) / r.width) * 100))));
  };
  return (
    <section className="field field-night macao on-color" id="macao" aria-labelledby="macao-h">
      <div className="wrap">
        <div className="mosaic-stage">
          <h2 className="bigname" lang="zh-Hant" aria-label="澳門 Macao">澳<br />門</h2>
          <div className="mosaic" data-mosaic>
            {MOSAIC.map(([src, alt]) => <Img key={src} src={src} altKey={alt || undefined} />)}
          </div>
        </div>
        <div className="intro" data-rise>
          <Tx k="s4_h" as="h3" id="macao-h" className="display" />
          <Tx k="s4_p" as="p" className="text" />
        </div>
        <div className="then" id="then">
          <div className="copy" data-rise>
            <Tx k="s5_h" as="h2" className="title" />
            <Tx k="s5_p" as="p" className="text" />
            <p className="years" aria-live="polite"><output>{label}</output></p>
          </div>
          <ImageCompare className="compare" position={pos} onPositionChange={(v) => setPos(Math.round(v))} onPointerDown={jump}>
            <ImageCompareBefore><Img className="img img-then" src="img/ama-1844.jpg" altKey="alt_ama1844" /></ImageCompareBefore>
            <ImageCompareAfter><Img className="img img-now" src="img/ama-now.jpg" altKey="alt_amanow" /></ImageCompareAfter>
            <ImageCompareHandle className="w-16" aria-label={tPlain('s5_aria')} getValueText={() => label}>
              <span className="compare-grip" aria-hidden="true"><ChevronsLeftRight size={22} strokeWidth={2.4} /></span>
            </ImageCompareHandle>
            <ImageCompareLabel side="before">1844</ImageCompareLabel>
            <ImageCompareLabel side="after"><Tx k="today" /></ImageCompareLabel>
            <Tx k="s5_label" className="tag" aria-hidden="true" />
          </ImageCompare>
        </div>
      </div>
    </section>
  );
}

/* 4. What we do: one field each for Record, Listen, Share */
function What() {
  const { tPlain } = useLang();
  return (
    <div id="what">
      <section className="field field-stone" aria-labelledby="record-h">
        <div className="wrap">
          <div className="stage">
            <Img className="photo" src="img/mandarin-street.jpg" altKey="alt_street" />
            <div className="copy" data-rise>
              <div className="head"><Tx k="ch3" as="h2" id="record-h" className="display" /><Echo k="ch3" as="span" className="echo" /></div>
              <Tx k="s6_p" as="p" className="text lede" />
            </div>
          </div>
        </div>
      </section>
      <section className="field field-red on-color" aria-labelledby="listen-h">
        <div className="wrap stage flip">
          <Img className="photo" src="img/vendor.jpg" altKey="alt_vendor" />
          <div className="copy" data-rise>
            <div className="head"><Tx k="ch4" as="h2" id="listen-h" className="display" /><Echo k="ch4" as="span" className="echo" /></div>
            <Tx k="s7_p" as="p" className="text lede" />
          </div>
        </div>
      </section>
      <section className="field field-dark on-color" aria-labelledby="share-h">
        <div className="wrap stage">
          <Img className="photo" src="img/dense.jpg" altKey="alt_dense" />
          <div className="copy" data-rise>
            <div className="head"><Tx k="ch5" as="h2" id="share-h" className="display" /><Echo k="ch5" as="span" className="echo" /></div>
            <ul className="ways">
              {[0, 1, 2].map((i) => <li key={i}><b>{tPlain(`w${i}`)}</b><span>{tPlain(`w${i}_d`)}</span></li>)}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

/* 5. Projects */
function Projects() {
  return (
    <section className="field field-paper" id="projects" aria-labelledby="projects-h">
      <div className="wrap">
        <div className="section-head" data-rise>
          <Tx k="nav_projects" as="h2" id="projects-h" className="display" />
          <Tx k="proj_lede" as="p" className="lede" />
        </div>
        <div className="projects-grid">
          <article className="project" data-rise>
            <Img src="img/coloane.jpg" />
            <div className="head"><Tx k="oral_h" as="h3" className="title" /><Tx k="planned_cap" className="tag" /></div>
            <Tx k="oral_p" as="p" className="text" />
            <Tx k="oral_cta" as="a" className="pill pill-ink" href="#join" />
          </article>
          <article className="project" data-rise>
            <Img src="img/cunha.jpg" altKey="alt_cunha" />
            <div className="head"><Tx k="food_h" as="h3" className="title" /><Tx k="planned_cap" className="tag" /></div>
            <Tx k="food_p" as="p" className="text" />
            <Tx k="food_cta" as="a" className="pill pill-ink" href="#join" />
          </article>
        </div>
      </div>
    </section>
  );
}

/* 6. History */
function History() {
  const { lang } = useLang();
  return (
    <section className="field field-night history on-color" id="history" aria-labelledby="history-h">
      <div className="wrap">
        <div className="section-head" data-rise>
          <Tx k="brief_h" as="h2" id="history-h" className="display" />
          <Tx k="brief_p" as="p" className="lede" />
        </div>
        <ol className="timeline">
          {TIMELINE.map(([yr, txt]) => <li key={yr} data-rise><span className="yr">{yr}</span><span>{txt[L[lang]]}</span></li>)}
        </ol>
        <Tx k="tl_note" as="p" className="note small" />
      </div>
    </section>
  );
}

/* 7. Team */
const ROLES = [0, 4, 5, 6, 1, 2, 3, 7];
function Team() {
  const { tPlain } = useLang();
  return (
    <section className="field field-white" id="team" aria-labelledby="team-h">
      <div className="wrap">
        <div className="section-head" data-rise>
          <Tx k="team_h" as="h2" id="team-h" className="display" />
          <Tx k="s9_p" as="p" className="lede" />
        </div>
        <ul className="team-grid">
          {ROLES.map((r, i) => (
            <li key={i} data-rise>
              <div className="portrait" role="img" aria-label={tPlain('portrait')}><Clover fill={i % 4 === 3 ? '#FFFFFF' : '#FBFBF8'} /></div>
              <span className="name">{tPlain('name')}</span>
              <span className="role">{tPlain(`role${r}`)}</span>
            </li>
          ))}
        </ul>
        <Tx k="team_more" as="p" className="team-more" />
      </div>
    </section>
  );
}

/* 8. Join and contact: the page closes on the colour it opened with */
function Join() {
  const { tPlain } = useLang();
  return (
    <section className="field field-cobalt on-color" id="join" aria-labelledby="join-h">
      <div className="wrap">
        <div className="section-head" data-rise>
          <Tx k="s10_h" as="h2" id="join-h" className="display" />
          <Tx k="join_lede" as="p" className="lede" />
        </div>
        <ul className="options">
          {TABS.map((d, i) => (
            <li key={d.title} data-rise>
              <h3>{tPlain(d.title)}</h3>
              <p>{tPlain(d.text)}</p>
              <p className="detail">{tPlain(d.detail)}</p>
              <a className={'pill ' + (i === 1 ? 'pill-ink' : 'pill-white')} href="#contact">{tPlain(d.cta)}</a>
            </li>
          ))}
        </ul>
        <div className="contact" id="contact">
          <div className="lines" data-rise>
            <Tx k="touch_h" as="h3" className="title" style={{ color: 'var(--white)', marginBottom: 8 }} />
            <span className="email">[EMAIL ADDRESS]</span>
            <span className="socials"><a href="#contact">[Instagram]</a><a href="#contact">[Facebook]</a><a href="#contact">[WeChat]</a><a href="#contact">[Xiaohongshu]</a></span>
            <Tx k="address" as="span" />
          </div>
          <NewsForm id="news" labelKey="news_label" after={<Tx k="news_freq" as="p" className="small" style={{ color: '#C9CCF6' }} />} />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer on-color" id="credits">
      <div className="wrap">
        <div className="top">
          <Logo variant="paper" />
          <p className="meta"><Tx k="tagline" /> · <Tx k="reg" /></p>
        </div>
        <ul className="credits" aria-label="Photo credits">
          {CREDITS.map((c) => <li key={c[3]}><a href={c[3]} target="_blank" rel="noopener">{c[0]}</a> · {c[1]} · {c[2]}, via Wikimedia Commons</li>)}
        </ul>
        <Tx k="credits_note" as="p" className="small meta" style={{ marginTop: 16 }} />
      </div>
    </footer>
  );
}

export function Page() {
  const root = useRef<HTMLDivElement>(null);
  // Arrival: each block rises a little as it enters, from fully visible content (motion only adds the travel).
  useGSAP(() => {
    if (!motionOn) return;
    gsap.utils.toArray<HTMLElement>('[data-rise]').forEach((el) => {
      gsap.from(el, { y: 32, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
    });
    // The mosaic drifts slower than the page, so the name seems to sit in front of the photographs.
    gsap.fromTo('[data-mosaic]', { yPercent: 6 }, { yPercent: -6, ease: 'none', scrollTrigger: { trigger: '#macao', start: 'top bottom', end: 'bottom top', scrub: true } });
  }, { scope: root });
  return (
    <div ref={root}>
      <Hero />
      <Statement />
      <Macao />
      <What />
      <Projects />
      <History />
      <Team />
      <Join />
      <Footer />
    </div>
  );
}

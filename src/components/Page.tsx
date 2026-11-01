import { useLayoutEffect, useRef, useState, type CSSProperties, type PointerEvent as RPointerEvent } from 'react';
import { ChevronsLeftRight } from 'lucide-react';
import { Tx, useLang } from '@/i18n';
import { CREDITS, L, TABS, TIMELINE } from '@/content';
import type { View } from '@/hooks/useRoute';
import { gsap, motionOn, useGSAP } from '@/lib/motion';
import { ImageCompare, ImageCompareAfter, ImageCompareBefore, ImageCompareHandle, ImageCompareLabel } from '@/components/ui/image-compare';
import { Clover, Logo, NewsForm } from './common';

const Arrow = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

function Img({ src, altKey, className }: { src: string; altKey?: string; className?: string }) {
  const { tPlain } = useLang();
  return <img className={className} src={src} alt={altKey ? tPlain(altKey) : ''} loading="lazy" decoding="async" />;
}

/* 1. Opening: a cobalt field and the line, large */
function Hero() {
  const { tPlain } = useLang();
  return (
    <section className="field field-cobalt hero on-color" id="top" aria-labelledby="hero-h">
      <a className="logo-link" href="#" aria-label="HCSD Macao"><Logo variant="paper" /></a>
      <div className="wrap bottom">
        <Tx k="hero_h" as="h1" id="hero-h" className="display" />
        <div className="row">
          <Tx k="hero_lede" as="p" className="lede" />
          <a className="pill pill-white" href="#join">{tPlain('join_us')}<Arrow /></a>
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
      </div>
    </section>
  );
}

/* 3. Macao: its name set huge over its photographs, then the same gate in 1844 and today */
// Photographs used nowhere else on the site. The first nine make the usual 3 x 3 grid; the rest are only added,
// a column of three at a time, on screens too wide to fill by spacing the photographs further apart.
const MOSAIC: [string, string][] = [
  ['img/senado.jpg', 'alt_senado'], ['img/ruins.jpg', ''], ['img/ama-gate.jpg', 'alt_amagate'],
  ['img/lattice.jpg', ''], ['img/m-sao-domingos.jpg', ''], ['img/felicidade-night.jpg', 'alt_felicidade'],
  ['img/taipa.jpg', ''], ['img/guia.jpg', ''], ['img/m-egg-tart.jpg', ''],
  ['img/m-lilau.jpg', ''], ['img/m-dom-pedro-v.jpg', ''], ['img/m-kun-iam.jpg', ''],
  ['img/m-na-tcha.jpg', ''], ['img/m-lou-kau.jpg', ''], ['img/m-sao-lazaro.jpg', ''],
  ['img/m-penha.jpg', ''], ['img/m-sam-kai-vui-kun.jpg', ''], ['img/m-coloane-chapel.jpg', '']
];
const ROWS = 3;
const MAX_COLS = MOSAIC.length / ROWS; // 6

/** Lays out the Macao section so the name and the photographs fill the width between the page margins.
 *  The name is always 92% as tall as the grid and overlaps it by 40% of its own width.
 *  Order of preference: keep photographs at their natural size and widen or tighten the gaps between them;
 *  on narrow screens shrink the photographs instead; only when even the widest gaps leave space, add a column.
 *  Everything follows the section's width alone, never the screen height. */
const NAME_TO_GRID = 0.92;
const OVERLAP = 0.4;
const CELL = 360;      // natural photo width
const GAP_MIN = 8;
const GAP_MAX = 56;
type Layout = { cols: number; cell: number; gap: number };
function solveLayout(S: number, ratio: number): Layout {
  const q = (1 - OVERLAP) * ratio * NAME_TO_GRID;            // name width outside the grid, per unit of grid height
  const A = (cols: number) => cols + q * ROWS * 1.25;           // width taken per unit of photo width
  const B = (cols: number) => cols - 1 + q * (ROWS - 1);        // width taken per unit of gap
  const gMin = S < 700 ? 6 : GAP_MIN;
  for (let cols = 3; cols <= MAX_COLS; cols++) {
    const gap = (S - CELL * A(cols)) / B(cols);
    if (gap > GAP_MAX) continue;                                 // too much space even at the widest gaps: one more column
    if (gap >= gMin) return { cols, cell: CELL, gap };
    return { cols, cell: (S - gMin * B(cols)) / A(cols), gap: gMin }; // not enough room: smaller photographs
  }
  return { cols: MAX_COLS, cell: (S - GAP_MAX * B(MAX_COLS)) / A(MAX_COLS), gap: GAP_MAX }; // very wide: larger photographs
}

function Macao() {
  const { lang, tPlain } = useLang();
  const stageRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const [layout, setLayout] = useState<Layout>({ cols: 3, cell: 300, gap: 8 });
  useLayoutEffect(() => {
    const st = stageRef.current, el = nameRef.current; if (!st || !el) return;
    const fit = () => {
      el.style.fontSize = '100px';
      const w100 = el.offsetWidth, h100 = el.offsetHeight; // layout sizes, unaffected by transforms or animation
      if (!w100 || !h100) return;
      const next = solveLayout(st.clientWidth, w100 / h100);
      const gridH = ROWS * 1.25 * next.cell + (ROWS - 1) * next.gap;
      const size = (NAME_TO_GRID * gridH * 100) / h100;
      el.style.fontSize = size + 'px';
      el.style.marginRight = -((w100 * size) / 100) * OVERLAP + 'px';
      setLayout((prev) => (prev.cols === next.cols && Math.abs(prev.cell - next.cell) < 0.5 && Math.abs(prev.gap - next.gap) < 0.5 ? prev : next));
    };
    fit();
    let lastW = st.clientWidth;
    const ro = new ResizeObserver(() => { if (st.clientWidth !== lastW) { lastW = st.clientWidth; fit(); } });
    ro.observe(st);
    document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, [lang]);
  const { cols, cell, gap } = layout;
  const gridStyle = { gridTemplateColumns: `repeat(${cols}, ${cell}px)`, gap: `${gap}px`, ['--shift' as string]: `${Math.round(cell * 0.14)}px` } as CSSProperties;
  return (
    <section className="field field-night macao on-color" id="macao" aria-labelledby="macao-h">
      <div className="wrap">
        <div className="mosaic-stage" ref={stageRef}>
          <h2 className="bigname" ref={nameRef}>{tPlain('bigname')}</h2>
          <div className="mosaic" data-mosaic style={gridStyle}>
            {MOSAIC.slice(0, cols * ROWS).map(([src, alt], i) => <Img key={src} src={src} altKey={alt || undefined} className={(i % cols) % 2 === 1 ? 'low' : undefined} />)}
          </div>
        </div>
        <div className="intro" data-rise>
          <Tx k="s4_h" as="h3" id="macao-h" className="display" />
          <Tx k="s4_p" as="p" className="text" />
        </div>
      </div>
    </section>
  );
}

/* The same gate in 1844 and today. The divider reveals the 1844 photograph from the left;
   the year follows what the frame shows: all 1844 at the right end, all today at the left. */
function ThenNow() {
  const { tPlain } = useLang();
  const [pos, setPos] = useState(55);
  const year = Math.round(2026 - (182 * pos) / 100);
  const label = pos >= 99 ? '1844' : pos <= 1 ? tPlain('today') : String(year);
  const jump = (e: RPointerEvent<HTMLDivElement>) => {
    if ((e.target as Element).closest('[data-slot="image-compare-handle"]')) return;
    const r = e.currentTarget.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, Math.round(((e.clientX - r.left) / r.width) * 100))));
  };
  return (
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
  );
}

/* The four pages, from the home page */
const PAGES: [View, string, string][] = [['about', 'nav_about_us', 'about_d'], ['projects', 'nav_projects', 'projects_d'], ['history', 'nav_history', 'history_d'], ['join', 'nav_join', 'join_d']];
function Explore() {
  const { tPlain } = useLang();
  return (
    <section className="field field-paper explore" aria-labelledby="explore-h">
      <div className="wrap">
        <Tx k="explore_h" as="h2" id="explore-h" className="display" data-rise />
        <ul className="explore-list">
          {PAGES.map(([v, k, d]) => (
            <li key={v} data-rise>
              <a href={`#${v}`}><span className="t">{tPlain(k)}</span><span className="d">{tPlain(d)}</span><span className="go" aria-hidden="true"><Arrow /></span></a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* The head of each page: its colour field, the logo home, the title */
function PageHead({ field, titleKey, ledeKey, id }: { field: string; titleKey: string; ledeKey: string; id: string }) {
  const light = field === 'field-paper' || field === 'field-stone' || field === 'field-white';
  return (
    <header className={`field ${field} page-head` + (light ? '' : ' on-color')}>
      <a className="logo-link" href="#" aria-label="HCSD Macao"><Logo variant={light ? 'ink' : 'paper'} /></a>
      <div className="wrap section-head" data-rise>
        <Tx k={titleKey} as="h1" id={id} className="display" />
        <Tx k={ledeKey} as="p" className="lede" />
      </div>
    </header>
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
              <div className="head"><Tx k="ch3" as="h2" id="record-h" className="display" /></div>
              <Tx k="s6_p" as="p" className="text lede" />
            </div>
          </div>
        </div>
      </section>
      <section className="field field-red on-color" aria-labelledby="listen-h">
        <div className="wrap stage flip">
          <Img className="photo" src="img/vendor.jpg" altKey="alt_vendor" />
          <div className="copy" data-rise>
            <div className="head"><Tx k="ch4" as="h2" id="listen-h" className="display" /></div>
            <Tx k="s7_p" as="p" className="text lede" />
          </div>
        </div>
      </section>
      <section className="field field-dark on-color" aria-labelledby="share-h">
        <div className="wrap stage">
          <Img className="photo" src="img/dense.jpg" altKey="alt_dense" />
          <div className="copy" data-rise>
            <div className="head"><Tx k="ch5" as="h2" id="share-h" className="display" /></div>
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
    <section className="field field-paper page-body" id="projects-body" aria-labelledby="projects-h">
      <div className="wrap">
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
    <section className="field field-night history page-body on-color" aria-labelledby="history-h">
      <div className="wrap">
        <ThenNow />
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
    <section className="field field-cobalt page-body on-color" aria-labelledby="join-h">
      <div className="wrap">
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
            <a className="email" href={`mailto:${tPlain('email_ph')}`}>{tPlain('email_ph')}</a>
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
  const { tPlain } = useLang();
  return (
    <footer className="footer on-color" id="credits">
      <div className="wrap">
        <div className="top">
          <a href="#" aria-label="HCSD Macao"><Logo variant="paper" /></a>
          <nav className="foot-nav" aria-label="Pages">
            {PAGES.map(([v, k]) => <a key={v} href={`#${v}`}>{tPlain(k)}</a>)}
          </nav>
        </div>
        <div className="top">
          <a className="meta" href={`mailto:${tPlain('email_ph')}`}>{tPlain('email_ph')}</a>
          <p className="meta"><Tx k="tagline" /> · <Tx k="reg" /></p>
        </div>
        <ul className="credits" aria-label="Photo credits">
          {CREDITS.map((c) => <li key={c[3]}><a href={c[3]} target="_blank" rel="noopener">{c[0]}</a> · {c[1]} · {c[2]}, via Wikimedia Commons</li>)}
        </ul>
      </div>
    </footer>
  );
}

function usePageMotion() {
  const root = useRef<HTMLDivElement>(null);
  // Arrival: each block rises a little as it enters, from fully visible content (motion only adds the travel).
  useGSAP(() => {
    if (!motionOn) return;
    gsap.utils.toArray<HTMLElement>('[data-rise]').forEach((el) => {
      gsap.from(el, { y: 32, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
    });
  }, { scope: root });
  return root;
}

export function Page({ view }: { view: View }) {
  const root = usePageMotion();
  return (
    <div ref={root} key={view}>
      {view === 'home' && <><Hero /><Statement /><Macao /><Explore /></>}
      {view === 'about' && <><PageHead field="field-night" titleKey="nav_about_us" ledeKey="about_lede" id="about-h" /><What /><Team /></>}
      {view === 'projects' && <><PageHead field="field-paper" titleKey="nav_projects" ledeKey="proj_lede" id="projects-h" /><Projects /></>}
      {view === 'history' && <><PageHead field="field-night" titleKey="brief_h" ledeKey="brief_p" id="history-h" /><History /></>}
      {view === 'join' && <><PageHead field="field-cobalt" titleKey="s10_h" ledeKey="join_lede" id="join-h" /><Join /></>}
      <Footer />
    </div>
  );
}

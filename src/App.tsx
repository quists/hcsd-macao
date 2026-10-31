import { useCallback, useEffect, useState } from 'react';
import Lenis from 'lenis';
import { LangProvider, Tx, useLang } from './i18n';
import { useAnchors } from './hooks/useRoute';
import { gsap, motionOn, refreshScroll, scroller, ScrollTrigger } from './lib/motion';
import { Loader, Menu, TopBar } from './components/Shell';
import { Page } from './components/Page';

function Site() {
  const { lang } = useLang();
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  useAnchors(!loading);

  // Smooth scrolling, on GSAP's clock so scroll-linked moments and Lenis agree.
  useEffect(() => {
    if (!motionOn) return;
    const lenis = new Lenis({ duration: 1.1, easing: (x: number) => Math.min(1, 1.001 - Math.pow(2, -10 * x)) });
    scroller.lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(tick); lenis.destroy(); scroller.lenis = null; };
  }, []);

  // Text changes length with the language; scroll-linked moments need fresh measurements.
  useEffect(() => { refreshScroll(); }, [lang]);
  useEffect(() => { document.fonts?.ready.then(refreshScroll); }, []);

  const closeMenu = useCallback((focusBack: boolean) => {
    setMenuOpen(false);
    if (focusBack) requestAnimationFrame(() => document.querySelector<HTMLElement>('.topbar .menu-btn')?.focus());
  }, []);

  return (
    <>
      <Tx k="skip_content" as="a" className="skip" href="#main" onClick={(e: React.MouseEvent) => { e.preventDefault(); document.getElementById('main')?.focus(); }} />
      {loading && <Loader onDone={() => { setLoading(false); refreshScroll(); }} />}
      <TopBar menuOpen={menuOpen} onMenu={() => setMenuOpen(true)} />
      <Menu open={menuOpen} onClose={closeMenu} />
      <main id="main" tabIndex={-1} inert={loading || menuOpen ? true : undefined}>
        <Page />
      </main>
    </>
  );
}

export default function App() {
  return <LangProvider><Site /></LangProvider>;
}

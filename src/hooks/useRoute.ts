import { useEffect, useState } from 'react';

export type View = 'home' | 'about' | 'projects' | 'history' | 'join';
export const VIEWS: View[] = ['home', 'about', 'projects', 'history', 'join'];

// Anchors inside a page, and links from earlier versions of the site, land on the right page.
const IN_VIEW: Record<string, [View, string | null]> = {
  top: ['home', null], story: ['home', null], who: ['home', null], macao: ['home', 'macao'],
  what: ['about', 'what'], record: ['about', 'what'], listen: ['about', 'what'], share: ['about', 'what'], team: ['about', 'team'], people: ['about', 'team'],
  then: ['history', 'then'], help: ['join', null], contact: ['join', 'contact'], touch: ['join', 'contact']
};

export type Route = { view: View; target: string | null; n: number };

function parse(n: number, current?: View): Route {
  const id = decodeURIComponent(window.location.hash.slice(1));
  if (!id || id === 'home') return { view: 'home', target: null, n };
  if ((VIEWS as string[]).includes(id)) return { view: id as View, target: null, n };
  if (IN_VIEW[id]) return { view: IN_VIEW[id][0], target: IN_VIEW[id][1], n };
  // The footer's credits are on every page: stay where we are.
  if (id === 'credits') return { view: current || 'home', target: 'credits', n };
  return { view: 'home', target: null, n };
}

/** One page per hash: #about, #projects, #history, #join (home has none). Clicking the link you are on goes to its top again. */
export function useRoute() {
  const [route, setRoute] = useState<Route>(() => parse(0));
  useEffect(() => {
    const onHash = () => setRoute((r) => parse(r.n + 1, r.view));
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href^="#"]');
      if (!a) return;
      const href = a.getAttribute('href') || '';
      if (href === '#' || href === '#home') { e.preventDefault(); if (window.location.hash) history.pushState(null, '', window.location.pathname + window.location.search); onHash(); return; }
      if (href.length > 1 && window.location.hash === href) { e.preventDefault(); onHash(); }
    };
    window.addEventListener('hashchange', onHash);
    window.addEventListener('popstate', onHash);
    document.addEventListener('click', onClick);
    return () => { window.removeEventListener('hashchange', onHash); window.removeEventListener('popstate', onHash); document.removeEventListener('click', onClick); };
  }, []);
  return route;
}

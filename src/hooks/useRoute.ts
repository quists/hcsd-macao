import { useEffect } from 'react';
import { scrollToEl, scrollToTop } from '@/lib/motion';

// Links from the earlier, multi-page version still land in the right place.
const ALIASES: Record<string, string> = { story: 'top', about: 'history', who: 'top', record: 'what', listen: 'what', share: 'what', people: 'team', help: 'join', touch: 'contact' };

function go(hash: string, smooth: boolean) {
  const raw = decodeURIComponent(hash.replace(/^#/, ''));
  const id = ALIASES[raw] || raw;
  if (!id || id === 'top') { scrollToTop(smooth); return; }
  const el = document.getElementById(id);
  if (el) scrollToEl(el, smooth);
}

/** One page: hash links scroll to their section, and clicking the link you just used scrolls there again. */
export function useAnchors(ready: boolean) {
  useEffect(() => {
    if (!ready) return;
    if (window.location.hash) requestAnimationFrame(() => go(window.location.hash, false));
    const onHash = () => go(window.location.hash, true);
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href^="#"]');
      if (!a) return;
      const href = a.getAttribute('href') || '';
      if (href.length > 1 && window.location.hash === href) { e.preventDefault(); go(href, true); }
    };
    window.addEventListener('hashchange', onHash);
    document.addEventListener('click', onClick);
    return () => { window.removeEventListener('hashchange', onHash); document.removeEventListener('click', onClick); };
  }, [ready]);
}

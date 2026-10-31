import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import type Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const motionOn = !reduceMotion;

/** The one smooth-scroll instance, set up in App. */
export const scroller: { lenis: Lenis | null } = { lenis: null };

export function scrollToTop(smooth = false) {
  if (scroller.lenis) scroller.lenis.scrollTo(0, { immediate: !smooth, force: true });
  else window.scrollTo({ top: 0, behavior: smooth && !reduceMotion ? 'smooth' : 'auto' });
}
export function scrollToEl(el: HTMLElement, smooth = true) {
  if (scroller.lenis) scroller.lenis.scrollTo(el, { immediate: !smooth, force: true });
  else el.scrollIntoView({ behavior: smooth && !reduceMotion ? 'smooth' : 'auto' });
}
export function refreshScroll() {
  if (motionOn) requestAnimationFrame(() => ScrollTrigger.refresh());
}

export { gsap, ScrollTrigger, useGSAP };

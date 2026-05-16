import { cubicOut, quintOut, backOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';

// ── Reduced motion check ──────────────────────────────────────────────────────
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── fadeUp — Svelte transition ────────────────────────────────────────────────
export function fadeUp(
  node: Element,
  {
    delay = 0,
    duration = 550,
    y = 28,
  }: { delay?: number; duration?: number; y?: number } = {}
): TransitionConfig {
  if (prefersReducedMotion()) return { delay: 0, duration: 0, css: () => '' };
  return {
    delay,
    duration,
    easing: quintOut,
    css: (t) => `
      opacity: ${t};
      transform: translateY(${(1 - t) * y}px);
    `,
  };
}

// ── scaleIn — Svelte transition ───────────────────────────────────────────────
export function scaleIn(
  node: Element,
  {
    delay = 0,
    duration = 450,
    start = 0.9,
  }: { delay?: number; duration?: number; start?: number } = {}
): TransitionConfig {
  if (prefersReducedMotion()) return { delay: 0, duration: 0, css: () => '' };
  return {
    delay,
    duration,
    easing: backOut,
    css: (t) => `
      opacity: ${t};
      transform: scale(${start + (1 - start) * t});
    `,
  };
}

// ── flyIn — horizontal slide ──────────────────────────────────────────────────
export function flyIn(
  node: Element,
  {
    delay = 0,
    duration = 500,
    x = -40,
  }: { delay?: number; duration?: number; x?: number } = {}
): TransitionConfig {
  if (prefersReducedMotion()) return { delay: 0, duration: 0, css: () => '' };
  return {
    delay,
    duration,
    easing: quintOut,
    css: (t) => `
      opacity: ${t};
      transform: translateX(${(1 - t) * x}px);
    `,
  };
}

// ── scrollReveal — Svelte action (IntersectionObserver) ──────────────────────
interface ScrollRevealParams {
  delay?: number;
  duration?: number;
  threshold?: number;
  y?: number;
}

export function scrollReveal(
  node: HTMLElement,
  { delay = 0, duration = 650, threshold = 0.12, y = 24 }: ScrollRevealParams = {}
) {
  if (prefersReducedMotion()) return {};

  node.style.opacity = '0';
  node.style.transform = `translateY(${y}px)`;
  node.style.transition = `opacity ${duration}ms ${delay}ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform ${duration}ms ${delay}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          node.style.opacity = '1';
          node.style.transform = 'translateY(0)';
          observer.unobserve(node);
        }
      });
    },
    { threshold }
  );

  observer.observe(node);

  return { destroy() { observer.disconnect(); } };
}

// ── typewriter ────────────────────────────────────────────────────────────────
export function typewriter(
  roles: string[],
  onUpdate: (text: string) => void,
  {
    typingSpeed = 75,
    deletingSpeed = 38,
    pauseDuration = 2200,
  } = {}
): () => void {
  if (prefersReducedMotion()) {
    onUpdate(roles[0]);
    return () => { };
  }

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let timeoutId: ReturnType<typeof setTimeout>;

  const tick = () => {
    const current = roles[roleIndex];

    if (isDeleting) {
      charIndex--;
      onUpdate(current.slice(0, charIndex));
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        timeoutId = setTimeout(tick, 450);
        return;
      }
      timeoutId = setTimeout(tick, deletingSpeed);
    } else {
      charIndex++;
      onUpdate(current.slice(0, charIndex));
      if (charIndex === current.length) {
        isDeleting = true;
        timeoutId = setTimeout(tick, pauseDuration);
        return;
      }
      timeoutId = setTimeout(tick, typingSpeed);
    }
  };

  timeoutId = setTimeout(tick, 700);
  return () => clearTimeout(timeoutId);
}

// ── staggerDelay ──────────────────────────────────────────────────────────────
export function staggerDelay(index: number, stepMs = 60): number {
  return index * stepMs;
}

// ── counter — animates a number from 0 to target ─────────────────────────────
export function animateCounter(
  node: HTMLElement,
  target: number,
  { duration = 1200, suffix = '' } = {}
) {
  if (prefersReducedMotion()) {
    node.textContent = `${target}${suffix}`;
    return {};
  }

  let start: number | null = null;
  let frame: number;

  const step = (timestamp: number) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // cubic ease-out
    node.textContent = `${Math.round(eased * target)}${suffix}`;
    if (progress < 1) frame = requestAnimationFrame(step);
  };

  frame = requestAnimationFrame(step);
  return { destroy() { cancelAnimationFrame(frame); } };
}
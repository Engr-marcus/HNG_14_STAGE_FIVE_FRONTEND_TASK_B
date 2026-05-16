import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// ── Theme ─────────────────────────────────────────────────────────────────────
export type Theme = 'dark' | 'light';

function createTheme() {
  const getInitial = (): Theme => {
    if (!browser) return 'dark';
    const stored = localStorage.getItem('theme') as Theme | null;
    if (stored === 'dark' || stored === 'light') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const initial = getInitial();
  const { subscribe, set, update } = writable<Theme>(initial);

  const apply = (t: Theme) => {
    if (!browser) return;
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('theme', t);
  };

  apply(initial);

  return {
    subscribe,
    set(t: Theme) { apply(t); set(t); },
    toggle() {
      update(c => {
        const next: Theme = c === 'dark' ? 'light' : 'dark';
        apply(next);
        return next;
      });
    },
  };
}

export const theme = createTheme();

// ── Nav ───────────────────────────────────────────────────────────────────────
export const navScrolled    = writable(false);
export const mobileMenuOpen = writable(false);

// ── Terminal ──────────────────────────────────────────────────────────────────
export const terminalOpen = writable(false);
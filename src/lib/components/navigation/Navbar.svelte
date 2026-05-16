<script lang="ts">
  import { onMount }       from 'svelte';
  import { fade }          from 'svelte/transition';
  import { theme, navScrolled, mobileMenuOpen } from '$lib/stores';
  import { navLinks }      from '$lib/data/portfolio';
  import { fadeUp }        from '$lib/animations';

  onMount(() => {
    const handleScroll = () => navScrolled.set(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  });

  function closeMobile() { mobileMenuOpen.set(false); }
</script>

<!-- Skip link -->
<a href="#main" class="skip-link">Skip to main content</a>

<nav
  class="nav"
  class:scrolled={$navScrolled}
  aria-label="Main navigation"
>
  <div class="nav-inner">
    <!-- Logo -->
    <a href="/" class="logo" aria-label="John Allison — Home">
      <span class="logo-mark" aria-hidden="true">JA</span>
      <span class="logo-name">John Allison</span>
    </a>

    <!-- Desktop links -->
    <ul class="nav-links" role="list">
      {#each navLinks as link}
        <li>
          <a href={link.href} class="nav-link">{link.label}</a>
        </li>
      {/each}
    </ul>

    <!-- Actions -->
    <div class="nav-actions">
      <!-- Theme toggle -->
      <button
        class="icon-btn"
        onclick={() => theme.toggle()}
        aria-label="Toggle {$theme === 'light' ? 'dark' : 'light'} mode"
        title="Toggle theme"
      >
        {#if $theme === 'light'}
          <!-- Moon -->
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        {:else}
          <!-- Sun -->
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1"  x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22"   x2="5.64"  y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1"  y1="12" x2="3"  y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64"  y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
        {/if}
      </button>

      <a href="/#contact" class="hire-btn">Hire Me</a>

      <!-- Hamburger -->
      <button
        class="hamburger"
        onclick={() => mobileMenuOpen.update(v => !v)}
        aria-label="Toggle menu"
        aria-expanded={$mobileMenuOpen}
        aria-controls="mobile-menu"
      >
        <span class="bar" class:open={$mobileMenuOpen}></span>
        <span class="bar" class:open={$mobileMenuOpen}></span>
        <span class="bar" class:open={$mobileMenuOpen}></span>
      </button>
    </div>
  </div>

  <!-- Mobile menu -->
  {#if $mobileMenuOpen}
    <div
      class="mobile-menu"
      id="mobile-menu"
      role="dialog"
      aria-label="Mobile navigation"
      transition:fade={{ duration: 180 }}
    >
      {#each navLinks as link, i}
        <a
          href={link.href}
          class="mobile-link"
          onclick={closeMobile}
          in:fadeUp={{ delay: i * 55, duration: 280 }}
        >
          {link.label}
        </a>
      {/each}
      <a
        href="/#contact"
        class="mobile-link mobile-cta"
        onclick={closeMobile}
        in:fadeUp={{ delay: navLinks.length * 55, duration: 280 }}
      >
        Hire Me →
      </a>
    </div>
  {/if}
</nav>

<style>
  .skip-link {
    position: absolute;
    top: -200%;
    left: 1rem;
    z-index: 9999;
    background: var(--accent);
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: var(--radius-md);
    font-weight: 500;
    font-size: 0.875rem;
    transition: top 0.2s;
  }
  .skip-link:focus { top: 1rem; }

  .nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 1000;
    padding: 1.25rem 0;
    transition: all 0.3s var(--ease-out);
  }
  .nav.scrolled {
    background: color-mix(in srgb, var(--bg) 88%, transparent);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
    padding: 0.75rem 0;
  }

  .nav-inner {
    max-width: var(--container);
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  /* Logo */
  .logo {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    flex-shrink: 0;
  }
  .logo-mark {
    width: 34px;
    height: 34px;
    background: var(--accent);
    color: #fff;
    border-radius: var(--radius-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-display);
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: -0.02em;
  }
  .logo-name {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 0.95rem;
    color: var(--text);
  }

  /* Desktop links */
  .nav-links {
    display: flex;
    gap: 0.15rem;
    margin-left: auto;
  }
  .nav-link {
    color: var(--text-muted);
    font-size: 0.875rem;
    font-weight: 500;
    padding: 0.4rem 0.85rem;
    border-radius: var(--radius-sm);
    transition: var(--transition);
  }
  .nav-link:hover { color: var(--text); background: var(--surface2); }

  /* Actions */
  .nav-actions { display: flex; align-items: center; gap: 0.6rem; }

  .icon-btn {
    width: 34px;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    color: var(--text-muted);
    transition: var(--transition);
  }
  .icon-btn:hover { color: var(--text); background: var(--surface2); border-color: var(--border-strong); }

  .hire-btn {
    background: var(--accent);
    color: #fff;
    padding: 0.5rem 1.1rem;
    border-radius: var(--radius-sm);
    font-size: 0.875rem;
    font-weight: 600;
    transition: var(--transition);
  }
  .hire-btn:hover {
    background: var(--accent-dark);
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(var(--accent-rgb), 0.35);
  }

  /* Hamburger */
  .hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    padding: 0.4rem;
  }
  .bar {
    display: block;
    width: 20px;
    height: 2px;
    background: var(--text);
    border-radius: 2px;
    transition: all 0.3s ease;
  }
  .bar.open:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
  .bar.open:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .bar.open:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

  /* Mobile menu */
  .mobile-menu {
    display: none;
    flex-direction: column;
    background: var(--surface);
    border-top: 1px solid var(--border);
    padding: 0.75rem 2rem 1.25rem;
  }
  .mobile-link {
    color: var(--text);
    font-weight: 500;
    font-size: 1rem;
    padding: 0.8rem 0;
    border-bottom: 1px solid var(--border);
    transition: color 0.2s ease;
  }
  .mobile-link:last-child { border-bottom: none; }
  .mobile-link:hover { color: var(--accent); }
  .mobile-cta { color: var(--accent); font-weight: 600; }

  @media (max-width: 768px) {
    .nav-links { display: none; }
    .hire-btn   { display: none; }
    .hamburger  { display: flex; }
    .mobile-menu { display: flex; }
    .logo-name  { display: none; }
  }
</style>
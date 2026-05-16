<script lang="ts">
  import { personal } from '$lib/data/portfolio';
  const year = new Date().getFullYear();
</script>

<footer class="footer">
  <div class="container">
    <div class="inner">
      <p class="copy">
        © {year} <span class="name">{personal.name}</span> · built with SvelteKit
      </p>

      <nav class="links" aria-label="Footer navigation">
        <a href={personal.github}   target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href={personal.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href={personal.twitter}  target="_blank" rel="noopener noreferrer">Twitter</a>
        <a href={`mailto:${personal.email}`}>Email</a>
        <a href={personal.resumeUrl} download>Résumé</a>
      </nav>

      <button
        class="top-btn"
        onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
          <path d="M12 19V5M5 12l7-7 7 7"/>
        </svg>
        Top
      </button>
    </div>
  </div>
</footer>

<style>
  .footer {
    border-top: 1px solid var(--border);
    padding: 1.75rem 0;
    background: var(--surface);
  }

  .container {
    max-width: var(--container);
    margin: 0 auto;
    padding: 0 2rem;
  }

  .inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .copy {
    font-size: 0.83rem;
    color: var(--text-faint);
    font-family: var(--font-mono);
  }
  .name { color: var(--text-muted); }

  .links {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
  }
  .links a {
    font-size: 0.83rem;
    color: var(--text-faint);
    transition: color 0.2s ease;
  }
  .links a:hover { color: var(--accent); }

  .top-btn {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.8rem;
    font-family: var(--font-mono);
    color: var(--text-faint);
    transition: color 0.2s ease;
  }
  .top-btn:hover { color: var(--accent); }

  @media (max-width: 640px) {
    .inner { flex-direction: column; align-items: center; text-align: center; }
    .links { justify-content: center; gap: 1rem; }
  }
</style>
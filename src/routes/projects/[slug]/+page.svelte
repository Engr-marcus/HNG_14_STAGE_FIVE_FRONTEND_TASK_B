<script lang="ts">
  import { fly } from 'svelte/transition';
  import { goto }      from '$app/navigation';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  const { project } = data;
</script>

<svelte:head>
  <title>{project.title} — John Allison</title>
  <meta name="description" content="{project.tagline}. {project.description}" />
</svelte:head>

<div class="page" in:fly={{ y: 40, duration: 520, delay: 100 }}>

  <!-- Hero -->
  <div class="project-hero" style="--color: {project.color}">
    <div class="hero-bg" aria-hidden="true"></div>
    <div class="hero-grid" aria-hidden="true"></div>

    <div class="container">
      <button
        class="back-btn"
        onclick={() => goto('/#projects')}
        aria-label="Back to projects"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
          <path d="M19 12H5M12 5l-7 7 7 7"/>
        </svg>
        Back to projects
      </button>

      <div class="hero-meta">
        <span class="hero-year">{project.year}</span>
        <span class="hero-status">{project.status}</span>
        <span class="hero-cat">{project.category}</span>
      </div>

      <h1 class="hero-title">{project.title}</h1>
      <p  class="hero-tagline">{project.tagline}</p>

      <div class="hero-ctas">
        {#if project.demo !== '#'}
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary"
          >
            View Live
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        {/if}
        {#if project.github !== '#'}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            class="btn-outline"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            View Code
          </a>
        {/if}
      </div>
    </div>
  </div>

  <!-- Body -->
  <div class="body">
    <div class="container">

      <div class="body-grid">
        <!-- Main -->
        <div class="main-col">
          <h2 class="section-label">Overview</h2>
          <p class="description">{project.description}</p>
        </div>

        <!-- Sidebar -->
        <aside class="sidebar">
          <div class="sidebar-card glass">
            <div class="sidebar-section">
              <h3 class="sidebar-label">Tech Stack</h3>
              <div class="tech-list">
                {#each project.tech as t}
                  <span class="tech-pill">{t}</span>
                {/each}
              </div>
            </div>

            <div class="sidebar-section">
              <h3 class="sidebar-label">Details</h3>
              <div class="detail-rows">
                <div class="detail-row">
                  <span class="detail-key">Year</span>
                  <span class="detail-val">{project.year}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-key">Status</span>
                  <span class="detail-val status-val" style="color: {project.color}">{project.status}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-key">Category</span>
                  <span class="detail-val">{project.category}</span>
                </div>
              </div>
            </div>

            {#if project.demo !== '#'}
              <a href={project.demo} target="_blank" rel="noopener noreferrer" class="sidebar-link">
                Visit Live Site ↗
              </a>
            {/if}
          </div>
        </aside>
      </div>

    </div>
  </div>

</div>

<style>
  .page { min-height: 100vh; }
  .container { max-width: var(--container); margin: 0 auto; padding: 0 2rem; }

  /* Hero */
  .project-hero {
    padding: 9rem 0 5rem;
    position: relative;
    overflow: hidden;
    background: var(--surface);
    border-bottom: 1px solid var(--border);
  }
  .hero-bg {
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse 60% 80% at 20% 50%,
      color-mix(in srgb, var(--color) 10%, transparent),
      transparent 60%
    );
    pointer-events: none;
  }
  .hero-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(var(--border) 1px, transparent 1px),
      linear-gradient(90deg, var(--border) 1px, transparent 1px);
    background-size: 48px 48px;
    opacity: 0.3;
    pointer-events: none;
  }

  .back-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: var(--text-muted);
    margin-bottom: 2.5rem;
    transition: var(--transition);
    position: relative;
    z-index: 1;
  }
  .back-btn:hover { color: var(--text); gap: 0.75rem; }

  .hero-meta {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.25rem;
    position: relative;
    z-index: 1;
    flex-wrap: wrap;
  }
  .hero-year {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    color: var(--text-faint);
  }
  .hero-status, .hero-cat {
    font-size: 0.7rem;
    font-weight: 600;
    padding: 0.2rem 0.7rem;
    border-radius: var(--radius-full);
  }
  .hero-status {
    color: var(--color);
    background: color-mix(in srgb, var(--color) 12%, transparent);
    border: 1px solid color-mix(in srgb, var(--color) 25%, transparent);
  }
  .hero-cat {
    color: var(--text-muted);
    background: var(--surface2);
    border: 1px solid var(--border);
  }

  .hero-title {
    font-family: var(--font-display);
    font-size: clamp(2.5rem, 7vw, 5rem);
    font-weight: 800;
    color: var(--text);
    letter-spacing: -0.04em;
    line-height: 1.0;
    margin-bottom: 1rem;
    position: relative;
    z-index: 1;
  }
  .hero-tagline {
    font-size: clamp(1rem, 2vw, 1.25rem);
    color: var(--color);
    font-weight: 500;
    margin-bottom: 2.5rem;
    position: relative;
    z-index: 1;
  }

  .hero-ctas {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    position: relative;
    z-index: 1;
  }
  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--accent);
    color: #fff;
    padding: 0.8rem 1.6rem;
    border-radius: var(--radius-md);
    font-weight: 600;
    font-size: 0.95rem;
    transition: var(--transition);
  }
  .btn-primary:hover { background: var(--accent-dark); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(var(--accent-rgb), 0.35); }
  .btn-outline {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    border: 1px solid var(--border);
    color: var(--text);
    padding: 0.8rem 1.6rem;
    border-radius: var(--radius-md);
    font-weight: 500;
    font-size: 0.95rem;
    transition: var(--transition);
  }
  .btn-outline:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-light); }

  /* Body */
  .body { padding: 5rem 0; background: var(--bg); }
  .body-grid {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 4rem;
    align-items: flex-start;
  }

  .section-label {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--accent);
    margin-bottom: 1rem;
  }
  .description {
    font-size: 1.05rem;
    color: var(--text-muted);
    line-height: 1.8;
  }

  /* Sidebar */
  .sidebar-card {
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    position: sticky;
    top: 6rem;
  }
  .sidebar-section { display: flex; flex-direction: column; gap: 0.75rem; }
  .sidebar-label {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--text-faint);
  }

  .tech-list { display: flex; flex-wrap: wrap; gap: 0.4rem; }
  .tech-pill {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    padding: 0.25rem 0.7rem;
    border-radius: var(--radius-full);
    background: var(--surface2);
    border: 1px solid var(--border);
    color: var(--text-muted);
  }

  .detail-rows { display: flex; flex-direction: column; gap: 0.6rem; }
  .detail-row { display: flex; justify-content: space-between; align-items: center; }
  .detail-key { font-size: 0.8rem; color: var(--text-faint); }
  .detail-val { font-size: 0.85rem; font-weight: 500; color: var(--text); }

  .sidebar-link {
    display: block;
    text-align: center;
    padding: 0.75rem;
    border-radius: var(--radius-md);
    background: var(--accent);
    color: #fff;
    font-size: 0.875rem;
    font-weight: 600;
    transition: var(--transition);
  }
  .sidebar-link:hover { background: var(--accent-dark); transform: translateY(-1px); }

  @media (max-width: 900px) {
    .body-grid { grid-template-columns: 1fr; }
    .sidebar-card { position: static; }
  }
  @media (max-width: 640px) {
    .project-hero { padding: 7rem 0 3.5rem; }
  }
</style>
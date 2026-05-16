<script lang="ts">
  import { scaleIn }   from '$lib/animations';
  import type { projects } from '$lib/data/portfolio';
  import { goto }      from '$app/navigation';

  let {
    project,
    index = 0,
  }: {
    project: (typeof projects)[number];
    index?: number;
  } = $props();

  let cardEl: HTMLElement;
  let hovered   = $state(false);
  let mouseX    = $state(0);
  let mouseY    = $state(0);
  let rotateX   = $state(0);
  let rotateY   = $state(0);

  function onMouseMove(e: MouseEvent) {
    if (!cardEl) return;
    const rect   = cardEl.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    // 3-D tilt
    rotateX = -((mouseY / rect.height) - 0.5) * 8;
    rotateY =  ((mouseX / rect.width)  - 0.5) * 8;
  }

  function onMouseLeave() {
    hovered  = false;
    rotateX  = 0;
    rotateY  = 0;
  }
</script>

<article
  bind:this={cardEl}
  class="card glass"
  class:hovered
  onmouseenter={() => hovered = true}
  onmouseleave={onMouseLeave}
  onmousemove={onMouseMove}
  in:scaleIn={{ delay: index * 90, duration: 480 }}
  style="
    --color: {project.color};
    --mx: {mouseX}px;
    --my: {mouseY}px;
    --rx: {rotateX}deg;
    --ry: {rotateY}deg;
  "
  aria-label="Project: {project.title}"
>
  <!-- Radial glow follows cursor -->
  <div class="glow"        aria-hidden="true"></div>
  <div class="border-glow" aria-hidden="true"></div>

  <div class="card-inner">
    <!-- Header -->
    <div class="card-head">
      <div class="card-meta">
        <span class="year">{project.year}</span>
        <span class="status">{project.status}</span>
      </div>
      <div class="card-links">
        {#if project.github !== '#'}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            class="icon-link"
            aria-label="View {project.title} on GitHub"
            onclick={(e) => e.stopPropagation()}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>
        {/if}
        {#if project.demo !== '#'}
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            class="icon-link"
            aria-label="View {project.title} live demo"
            onclick={(e) => e.stopPropagation()}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        {/if}
      </div>
    </div>

    <!-- Body -->
    <div class="card-body">
      <h3 class="card-title">{project.title}</h3>
      <p class="card-tagline">{project.tagline}</p>
      <p class="card-desc">{project.description}</p>
    </div>

    <!-- Footer -->
    <div class="card-foot">
      <div class="tech-pills">
        {#each project.tech as t}
          <span class="tech">{t}</span>
        {/each}
      </div>
      <button
        class="cta-link"
        onclick={() => goto(`/projects/${project.id}`)}
        aria-label="Explore {project.title} project"
      >
        Explore
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  </div>
</article>

<style>
  .card {
    position: relative;
    border-radius: var(--radius-lg);
    overflow: hidden;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.2s ease, border-color 0.2s ease;
    cursor: pointer;
  }

  .card.hovered {
    transform: perspective(900px) rotateX(var(--rx)) rotateY(var(--ry)) translateY(-6px);
    border-color: rgba(255,255,255,0.12);
  }

  /* Radial cursor glow */
  .glow {
    position: absolute;
    inset: 0;
    background: radial-gradient(
      600px circle at var(--mx) var(--my),
      color-mix(in srgb, var(--color) 12%, transparent),
      transparent 40%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    z-index: 0;
  }

  /* Border glow */
  .border-glow {
    position: absolute;
    inset: 0;
    border-radius: var(--radius-lg);
    background: radial-gradient(
      400px circle at var(--mx) var(--my),
      color-mix(in srgb, var(--color) 45%, transparent),
      transparent 40%
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    padding: 1px;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  .card.hovered .glow,
  .card.hovered .border-glow { opacity: 1; }

  .card-inner {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 1.5rem;
    gap: 1rem;
  }

  /* Header */
  .card-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .card-meta { display: flex; align-items: center; gap: 0.6rem; }
  .year {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--text-faint);
  }
  .status {
    font-size: 0.68rem;
    font-weight: 600;
    color: var(--color);
    background: color-mix(in srgb, var(--color) 12%, transparent);
    border: 1px solid color-mix(in srgb, var(--color) 25%, transparent);
    padding: 0.2rem 0.6rem;
    border-radius: var(--radius-full);
  }
  .card-links { display: flex; gap: 0.4rem; }
  .icon-link {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    color: var(--text-muted);
    transition: var(--transition);
  }
  .icon-link:hover {
    color: var(--color);
    border-color: var(--color);
    background: color-mix(in srgb, var(--color) 8%, transparent);
    transform: translateY(-2px);
  }

  /* Body */
  .card-body { flex: 1; }
  .card-title {
    font-family: var(--font-display);
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 0.25rem;
  }
  .card-tagline {
    font-size: 0.85rem;
    color: var(--color);
    font-weight: 500;
    margin-bottom: 0.65rem;
  }
  .card-desc {
    font-size: 0.9rem;
    color: var(--text-muted);
    line-height: 1.65;
  }

  /* Footer */
  .card-foot {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-top: 0.5rem;
    border-top: 1px solid var(--border);
  }
  .tech-pills { display: flex; flex-wrap: wrap; gap: 0.4rem; }
  .tech {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    padding: 0.2rem 0.65rem;
    border-radius: var(--radius-full);
    background: var(--surface2);
    border: 1px solid var(--border);
    color: var(--text-faint);
  }
  .cta-link {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text);
    align-self: flex-start;
    transition: var(--transition);
  }
  .cta-link:hover {
    color: var(--color);
    gap: 0.65rem;
  }
</style>
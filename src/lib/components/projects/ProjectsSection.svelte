<script lang="ts">
  import { flip }          from 'svelte/animate';
  import { fade }          from 'svelte/transition';
  import { scrollReveal }  from '$lib/animations';
  import { projects }      from '$lib/data/portfolio';
  import ProjectCard       from './ProjectCard.svelte';

  type Category = 'All' | 'Open Source' | 'Product' | 'Tool';
  const categories: Category[] = ['All', 'Open Source', 'Product', 'Tool'];

  let active = $state<Category>('All');

  let filtered = $derived(
    active === 'All' ? projects : projects.filter(p => p.category === active)
  );
</script>

<section class="section" id="projects" aria-labelledby="projects-heading">
  <div class="container">

    <div class="section-head" use:scrollReveal>
      <span class="eyebrow">01 / Selected Work</span>
      <h2 id="projects-heading" class="title">Things I've Built</h2>
      <p class="subtitle">
        A selection of projects I'm proud of — from open-source tools to shipped products.
      </p>
    </div>

    <!-- Filter tabs -->
    <div
      class="filters"
      role="tablist"
      aria-label="Filter projects by category"
      use:scrollReveal={{ delay: 80 }}
    >
      {#each categories as cat}
        <button
          role="tab"
          aria-selected={active === cat}
          class="filter"
          class:active={active === cat}
          onclick={() => active = cat}
        >
          {cat}
          {#if cat !== 'All'}
            <span class="filter-count">
              {projects.filter(p => p.category === cat).length}
            </span>
          {/if}
        </button>
      {/each}
    </div>

    <!-- Grid -->
    <div class="grid" role="tabpanel" aria-label="{active} projects">
      {#each filtered as project, i (project.id)}
        <div animate:flip={{ duration: 380 }} transition:fade={{ duration: 200 }}>
          <ProjectCard {project} index={i} />
        </div>
      {/each}
    </div>

  </div>
</section>

<style>
  .section {
    padding: var(--section-padding) 0;
    background: var(--surface);
  }

  .container {
    max-width: var(--container);
    margin: 0 auto;
    padding: 0 2rem;
  }

  /* Head */
  .section-head { text-align: center; margin-bottom: 3rem; }
  .eyebrow {
    display: block;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--accent);
    letter-spacing: 0.12em;
    margin-bottom: 0.75rem;
  }
  .title {
    font-family: var(--font-display);
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    color: var(--text);
    margin-bottom: 0.875rem;
    letter-spacing: -0.03em;
  }
  .subtitle {
    color: var(--text-muted);
    max-width: 480px;
    margin: 0 auto;
    line-height: 1.7;
    font-size: 1rem;
  }

  /* Filters */
  .filters {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 3rem;
  }

  .filter {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.45rem 1.1rem;
    border-radius: var(--radius-full);
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--text-muted);
    border: 1px solid var(--border);
    background: var(--bg);
    transition: var(--transition);
  }
  .filter:hover { color: var(--text); border-color: var(--accent); }
  .filter.active {
    background: var(--accent);
    color: #fff;
    border-color: var(--accent);
  }
  .filter-count {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    padding: 0.1rem 0.4rem;
    border-radius: var(--radius-full);
    background: rgba(255,255,255,0.2);
    line-height: 1.4;
  }
  .filter.active .filter-count { background: rgba(255,255,255,0.25); }

  /* Grid */
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  @media (max-width: 640px) {
    .section { padding: calc(var(--section-padding) * 0.7) 0; }
    .grid { grid-template-columns: 1fr; }
  }
</style>
<script lang="ts">
  import { scrollReveal, staggerDelay } from '$lib/animations';
  import { skills } from '$lib/data/portfolio';

  const categories = ['Frontend', 'Backend', 'Tools'] as const;

  function byCategory(cat: string) {
    return skills.filter(s => s.category === cat);
  }
</script>

<section class="section" id="skills" aria-labelledby="skills-heading">
  <div class="container">

    <div class="section-head" use:scrollReveal>
      <span class="eyebrow">02 / Expertise</span>
      <h2 id="skills-heading" class="title">Skills & Technologies</h2>
      <p class="subtitle">
        My core toolkit — the technologies I reach for every day to build
        robust, scalable applications.
      </p>
    </div>

    <!-- Skill groups -->
    <div class="groups">
      {#each categories as cat, ci}
        <div class="group glass" use:scrollReveal={{ delay: ci * 100 }}>
          <div class="group-head">
            <h3 class="group-title">{cat}</h3>
            <span class="group-count">{byCategory(cat).length} skills</span>
          </div>

          <ul class="skill-list" role="list">
            {#each byCategory(cat) as skill, i}
              <li
                class="skill"
                style="--delay: {staggerDelay(i, 70)}ms"
                use:scrollReveal={{ delay: ci * 100 + i * 60 }}
              >
                <div class="skill-top">
                  <span class="skill-icon" aria-hidden="true">{skill.icon}</span>
                  <span class="skill-name">{skill.name}</span>
                  <span class="skill-pct" aria-hidden="true">{skill.level}%</span>
                </div>
                <div
                  class="bar-track"
                  role="progressbar"
                  aria-valuenow={skill.level}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="{skill.name}: {skill.level}% proficiency"
                >
                  <div class="bar-fill" style="width: {skill.level}%"></div>
                </div>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>

    <!-- All-skills chip cloud -->
    <div
      class="chip-cloud"
      use:scrollReveal={{ delay: 200 }}
      aria-label="All technologies"
    >
      {#each skills as s, i}
        <span
          class="chip"
          style="animation-delay: {i * 35}ms"
        >
          <span aria-hidden="true">{s.icon}</span>
          {s.name}
        </span>
      {/each}
    </div>

  </div>
</section>

<style>
  .section {
    padding: var(--section-padding) 0;
    background: var(--bg);
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
  }

  /* Groups */
  .groups {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    margin-bottom: 2.5rem;
  }

  .group {
    border-radius: var(--radius-lg);
    padding: 1.75rem;
  }

  .group-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--border);
  }
  .group-title {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--accent);
  }
  .group-count {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    color: var(--text-faint);
  }

  /* Skills */
  .skill-list { display: flex; flex-direction: column; gap: 1.1rem; }
  .skill-top {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.45rem;
  }
  .skill-icon { font-size: 0.9rem; flex-shrink: 0; }
  .skill-name {
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--text);
    flex: 1;
  }
  .skill-pct {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--text-faint);
  }

  .bar-track {
    height: 4px;
    background: var(--surface3);
    border-radius: 99px;
    overflow: hidden;
  }
  .bar-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--accent) 0%, #a78bfa 100%);
    border-radius: 99px;
    transform-origin: left;
    animation: bar-grow 1.2s cubic-bezier(0.4, 0, 0.2, 1) var(--delay, 0ms) both;
  }
  @keyframes bar-grow {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }

  /* Chip cloud */
  .chip-cloud {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    justify-content: center;
    padding: 1.75rem;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
  }

  .chip {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.35rem 0.9rem;
    border-radius: var(--radius-full);
    background: var(--bg);
    border: 1px solid var(--border);
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--text-muted);
    transition: var(--transition);
    animation: chip-in 0.4s var(--ease-out) both;
  }
  @keyframes chip-in {
    from { opacity: 0; transform: scale(0.88); }
    to   { opacity: 1; transform: scale(1); }
  }
  .chip:hover {
    color: var(--accent);
    border-color: var(--accent);
    background: var(--accent-light);
    transform: translateY(-2px);
  }

  @media (max-width: 1024px) { .groups { grid-template-columns: 1fr 1fr; } }
  @media (max-width: 640px) {
    .section { padding: calc(var(--section-padding) * 0.7) 0; }
    .groups { grid-template-columns: 1fr; }
    .chip-cloud { padding: 1.25rem; }
  }
</style>
<script lang="ts">
  import { scrollReveal } from '$lib/animations';
  import { personal, experience } from '$lib/data/portfolio';
</script>

<section class="section" id="about" aria-labelledby="about-heading">
  <div class="container">

    <div class="grid">

      <!-- Left: text -->
      <div class="text-col">
        <span class="eyebrow" use:scrollReveal>03 / About</span>
        <h2 id="about-heading" class="title" use:scrollReveal={{ delay: 80 }}>
          Crafting digital<br/>experiences with<br/>precision & purpose
        </h2>

        <p class="para" use:scrollReveal={{ delay: 140 }}>
          I'm <strong>{personal.name}</strong>, a full-stack engineer passionate about the intersection of
          thoughtful design and solid engineering. I build applications that are fast,
          accessible, and a genuine pleasure to use.
        </p>
        <p class="para" use:scrollReveal={{ delay: 180 }}>
          Whether architecting a backend API, building reactive UIs in Svelte, or
          crafting a pixel-perfect layout — I bring intentionality and craft to every
          layer of the stack.
        </p>

        <!-- Stats -->
        <div class="stats glass" use:scrollReveal={{ delay: 240 }}>
          <div class="stat">
            <span class="stat-n">{personal.yearsExp}+</span>
            <span class="stat-l">Years Experience</span>
          </div>
          <div class="stat-sep" aria-hidden="true"></div>
          <div class="stat">
            <span class="stat-n">{personal.projectsShipped}+</span>
            <span class="stat-l">Projects Shipped</span>
          </div>
          <div class="stat-sep" aria-hidden="true"></div>
          <div class="stat">
            <span class="stat-n">99</span>
            <span class="stat-l">Lighthouse Score</span>
          </div>
        </div>

        <!-- Experience timeline -->
        <div class="timeline" use:scrollReveal={{ delay: 300 }} aria-label="Work experience">
          {#each experience as exp, i}
            <div class="tl-item">
              <div class="tl-dot-col" aria-hidden="true">
                <div class="tl-dot" class:current={exp.current}></div>
                {#if i < experience.length - 1}
                  <div class="tl-line"></div>
                {/if}
              </div>
              <div class="tl-content">
                <span class="tl-year">{exp.year}</span>
                <p class="tl-role">{exp.role}</p>
                <p class="tl-org">{exp.org}</p>
                <p class="tl-desc">{exp.desc}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- Right: profile card -->
      <div class="card-col" use:scrollReveal={{ delay: 160 }}>
        <div class="profile-card glass">

          <!-- Avatar -->
          <div class="avatar" aria-label="{personal.name} avatar">
            <span class="initials" aria-hidden="true">JA</span>
            <div class="avatar-ring" aria-hidden="true"></div>
          </div>

          <div class="profile-info">
            <p class="profile-name">{personal.name}</p>
            <p class="profile-role">{personal.title}</p>
            <p class="profile-loc">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              {personal.location}
            </p>
          </div>

          <!-- Tech tags -->
          <div class="profile-tags" aria-label="Core technologies">
            {#each ['Svelte', 'TypeScript', 'Node.js', 'PostgreSQL', 'Figma'] as tag}
              <span class="tag">{tag}</span>
            {/each}
          </div>

          <!-- Quote -->
          <blockquote class="profile-quote">
            "Code is like prose — clarity and elegance matter as much as correctness."
          </blockquote>

          <!-- Availability -->
          <div class="profile-avail">
            <span class="avail-dot" aria-hidden="true"></span>
            <span>Open to new opportunities</span>
          </div>

          <!-- Links -->
          <div class="profile-links">
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              class="profile-link"
              aria-label="GitHub"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              class="profile-link"
              aria-label="LinkedIn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href={`mailto:${personal.email}`}
              class="profile-link"
              aria-label="Email"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

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

  .grid {
    display: grid;
    grid-template-columns: 1fr 400px;
    gap: 5rem;
    align-items: flex-start;
  }

  /* Left */
  .eyebrow {
    display: block;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--accent);
    letter-spacing: 0.12em;
    margin-bottom: 1rem;
  }
  .title {
    font-family: var(--font-display);
    font-size: clamp(2rem, 3.5vw, 2.75rem);
    font-weight: 800;
    color: var(--text);
    line-height: 1.15;
    margin-bottom: 1.75rem;
    letter-spacing: -0.03em;
  }
  .para {
    color: var(--text-muted);
    line-height: 1.8;
    margin-bottom: 1rem;
    font-size: 1rem;
  }
  .para strong { color: var(--text); font-weight: 600; }

  /* Stats */
  .stats {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 1.25rem 1.75rem;
    border-radius: var(--radius-lg);
    margin: 1.75rem 0;
    flex-wrap: wrap;
  }
  .stat { display: flex; flex-direction: column; gap: 0.15rem; }
  .stat-n {
    font-family: var(--font-display);
    font-size: 1.75rem;
    font-weight: 800;
    color: var(--accent);
    line-height: 1;
  }
  .stat-l {
    font-size: 0.7rem;
    color: var(--text-faint);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 500;
  }
  .stat-sep {
    width: 1px;
    height: 36px;
    background: var(--border);
  }

  /* Timeline */
  .timeline { display: flex; flex-direction: column; }
  .tl-item { display: flex; gap: 1rem; }
  .tl-dot-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
    padding-top: 4px;
  }
  .tl-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--surface3);
    border: 2px solid var(--border-strong);
    flex-shrink: 0;
    transition: var(--transition);
  }
  .tl-dot.current {
    background: var(--accent);
    border-color: var(--accent);
    box-shadow: 0 0 0 4px var(--accent-light);
  }
  .tl-line {
    flex: 1;
    width: 1px;
    background: var(--border);
    min-height: 20px;
    margin: 6px 0;
  }
  .tl-content { padding-bottom: 1.5rem; }
  .tl-year {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--text-faint);
    letter-spacing: 0.06em;
    display: block;
    margin-bottom: 0.25rem;
  }
  .tl-role {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 0.15rem;
  }
  .tl-org {
    font-size: 0.85rem;
    color: var(--accent);
    font-weight: 500;
    margin-bottom: 0.35rem;
  }
  .tl-desc { font-size: 0.85rem; color: var(--text-muted); line-height: 1.55; }

  /* Profile card */
  .profile-card {
    border-radius: var(--radius-xl);
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    position: sticky;
    top: 6rem;
    transition: var(--transition);
  }
  .profile-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }

  /* Avatar */
  .avatar { position: relative; width: 88px; height: 88px; }
  .initials {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--accent) 0%, #7c3aed 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-display);
    font-size: 1.75rem;
    font-weight: 800;
    color: #fff;
    position: relative;
    z-index: 1;
  }
  .avatar-ring {
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    background: conic-gradient(var(--accent), #7c3aed, #ec4899, var(--accent));
    animation: spin 8s linear infinite;
    z-index: 0;
  }
  .avatar-ring::before {
    content: '';
    position: absolute;
    inset: 3px;
    border-radius: 50%;
    background: var(--surface);
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .profile-info { text-align: center; }
  .profile-name { font-family: var(--font-display); font-size: 1.1rem; font-weight: 700; color: var(--text); }
  .profile-role { font-size: 0.875rem; color: var(--accent); font-weight: 500; margin-top: 0.2rem; }
  .profile-loc {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
    font-size: 0.775rem;
    color: var(--text-faint);
    margin-top: 0.4rem;
  }

  .profile-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    justify-content: center;
  }
  .tag {
    font-size: 0.75rem;
    padding: 0.2rem 0.7rem;
    border-radius: var(--radius-full);
    background: var(--accent-light);
    color: var(--accent);
    border: 1px solid color-mix(in srgb, var(--accent) 20%, transparent);
    font-weight: 500;
  }

  .profile-quote {
    font-style: italic;
    font-size: 0.82rem;
    color: var(--text-muted);
    line-height: 1.65;
    text-align: center;
    padding: 1rem 0;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    width: 100%;
    margin: 0;
  }

  .profile-avail {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--text-muted);
  }
  .avail-dot {
    width: 8px;
    height: 8px;
    background: #22c55e;
    border-radius: 50%;
    flex-shrink: 0;
    animation: avail-pulse 2.5s ease-in-out infinite;
  }
  @keyframes avail-pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.3); }
    50%       { box-shadow: 0 0 0 5px rgba(34,197,94,0); }
  }

  .profile-links { display: flex; gap: 0.75rem; }
  .profile-link {
    width: 36px;
    height: 36px;
    border-radius: var(--radius-sm);
    border: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-muted);
    transition: var(--transition);
  }
  .profile-link:hover {
    color: var(--accent);
    border-color: var(--accent);
    background: var(--accent-light);
    transform: translateY(-2px);
  }

  @media (max-width: 1024px) {
    .grid { grid-template-columns: 1fr; gap: 3rem; }
    .profile-card { position: static; }
  }
  @media (max-width: 640px) {
    .section { padding: calc(var(--section-padding) * 0.7) 0; }
    .stats { gap: 1rem; }
    .stat-sep { display: none; }
  }
</style>
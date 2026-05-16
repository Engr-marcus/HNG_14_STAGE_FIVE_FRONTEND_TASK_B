<script lang="ts">
  import { onMount }   from 'svelte';
  import { fadeUp, typewriter, prefersReducedMotion } from '$lib/animations';
  import { personal }  from '$lib/data/portfolio';
  import { terminalOpen } from '$lib/stores';

  let visible   = $state(false);
  let typedText = $state('');
  let canvas: HTMLCanvasElement;

  const roles = [
    'Frontend Engineer',
    'Svelte Enthusiast',
    'Creative Developer',
    'UI/UX Engineer',
    'Open Source Builder',
  ];

  onMount(() => {
    requestAnimationFrame(() => { visible = true; });

    const stopTyping = typewriter(roles, (t) => { typedText = t; });

    // ── Particle canvas ────────────────────────────────────────────────────
    if (prefersReducedMotion()) return stopTyping;

    const ctx = canvas?.getContext('2d');
    if (!ctx) return stopTyping;

    let width  = canvas.width  = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;
    let animId: number;
    let mouse  = { x: -9999, y: -9999 };

    class Particle {
      x: number; y: number;
      size: number;
      vx: number; vy: number;
      alpha: number;
      color: string;

      constructor() {
        this.x     = Math.random() * width;
        this.y     = Math.random() * height;
        this.size  = Math.random() * 1.8 + 0.4;
        this.vx    = (Math.random() - 0.5) * 0.6;
        this.vy    = (Math.random() - 0.5) * 0.6;
        this.alpha = Math.random() * 0.4 + 0.1;
        // Dark purples / blues / indigos
        const hues = [240, 250, 260, 280, 290];
        const h    = hues[Math.floor(Math.random() * hues.length)];
        this.color = `hsla(${h}, 70%, 65%, ${this.alpha})`;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Mouse repulsion
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          const force = (130 - dist) / 130;
          this.x -= (dx / dist) * force * 2.5;
          this.y -= (dy / dist) * force * 2.5;
        }
      }

      draw() {
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fillStyle = this.color;
        ctx!.fill();
      }
    }

    const count     = Math.min(Math.floor((width * height) / 10000), 110);
    const particles = Array.from({ length: count }, () => new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x;
          const dy   = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.12 * (1 - dist / 90)})`;
            ctx.lineWidth   = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animate();

    const onResize = () => {
      width = canvas.width  = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    const onMove  = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onLeave = ()               => { mouse.x = -9999; mouse.y = -9999; };

    window.addEventListener('resize',    onResize);
    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);

    return () => {
      stopTyping();
      cancelAnimationFrame(animId);
      window.removeEventListener('resize',    onResize);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  });
</script>

<section class="hero" id="hero" aria-label="Hero — {personal.name}, {personal.title}">
  <!-- Particle background -->
  <canvas bind:this={canvas} class="hero-canvas" aria-hidden="true"></canvas>

  <!-- Radial fade overlay -->
  <div class="hero-vignette" aria-hidden="true"></div>

  <!-- Grid lines decoration -->
  <div class="hero-grid" aria-hidden="true"></div>

  <div class="hero-content" class:visible>

    <!-- Availability badge -->
    {#if visible}
      <div class="badge glass" in:fadeUp={{ delay: 80, duration: 600 }}>
        <span class="badge-pulse" aria-hidden="true"></span>
        <span>Available for new opportunities</span>
      </div>
    {/if}

    <!-- Name -->
    {#if visible}
      <h1 class="hero-name" in:fadeUp={{ delay: 200, duration: 700 }}>
        <span class="name-line dim">hello, I'm</span>
        <span class="name-line accent">{personal.name}</span>
      </h1>
    {/if}

    <!-- Typewriter role -->
    {#if visible}
      <div class="hero-role" in:fadeUp={{ delay: 320, duration: 600 }} aria-live="polite">
        <span class="role-prefix" aria-hidden="true">~/</span>
        <span class="typed">{typedText}</span>
        <span class="cursor" aria-hidden="true">▋</span>
      </div>
    {/if}

    <!-- Bio -->
    {#if visible}
      <p class="hero-bio" in:fadeUp={{ delay: 420, duration: 600 }}>{personal.bio}</p>
    {/if}

    <!-- CTAs -->
    {#if visible}
      <div class="hero-ctas" in:fadeUp={{ delay: 520, duration: 600 }}>
        <a href="/#projects" class="btn-primary">
          View My Work
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
        <a href="/#contact" class="btn-outline glass">
          Get In Touch
        </a>
        <a href={personal.resumeUrl} class="btn-ghost" download aria-label="Download resume PDF">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Résumé
        </a>
        <button
          class="btn-terminal glass"
          aria-label="Open interactive terminal (Ctrl+K)"
          onclick={() => terminalOpen.set(true)}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
          cmd
        </button>
      </div>
    {/if}

    <!-- Stats -->
    {#if visible}
      <div class="hero-stats glass" in:fadeUp={{ delay: 640, duration: 600 }}>
        <div class="stat">
          <span class="stat-n">{personal.yearsExp}+</span>
          <span class="stat-l">Years Exp.</span>
        </div>
        <div class="stat-sep" aria-hidden="true"></div>
        <div class="stat">
          <span class="stat-n">{personal.projectsShipped}+</span>
          <span class="stat-l">Projects</span>
        </div>
        <div class="stat-sep" aria-hidden="true"></div>
        <div class="stat">
          <span class="stat-n">100%</span>
          <span class="stat-l">Committed</span>
        </div>
      </div>
    {/if}

    <!-- Socials -->
    {#if visible}
      <div class="hero-social" in:fadeUp={{ delay: 720, duration: 600 }}>
        <a href={personal.github}   target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
        </a>
        <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        </a>
        <a href={personal.twitter}  target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
        <a href={`mailto:${personal.email}`} aria-label="Email">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
        </a>
      </div>
    {/if}

  </div>

  <!-- Scroll hint -->
  <div class="scroll-hint" aria-hidden="true">
    <div class="scroll-line"></div>
    <span>scroll</span>
  </div>
</section>

<style>
  .hero {
    min-height: 100svh;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    position: relative;
    overflow: hidden;
    padding: 8rem 2rem 6rem;
    max-width: var(--container);
    margin: 0 auto;
  }

  .hero-canvas {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
  }

  .hero-vignette {
    position: fixed;
    inset: 0;
    background: radial-gradient(ellipse 80% 80% at 50% 50%,
      transparent 0%,
      color-mix(in srgb, var(--bg) 20%, transparent) 50%,
      var(--bg) 100%
    );
    z-index: 0;
    pointer-events: none;
  }

  .hero-grid {
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(var(--border) 1px, transparent 1px),
      linear-gradient(90deg, var(--border) 1px, transparent 1px);
    background-size: 60px 60px;
    opacity: 0.4;
    pointer-events: none;
    z-index: 0;
  }

  .hero-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
    max-width: 720px;
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  .hero-content.visible { opacity: 1; }

  /* Badge */
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.5rem 1rem;
    border-radius: var(--radius-full);
    font-family: var(--font-mono);
    font-size: 0.78rem;
    color: var(--text-muted);
    width: fit-content;
  }
  .badge-pulse {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #10b981;
    box-shadow: 0 0 0 0 rgba(16,185,129,0.4);
    animation: pulse-ring 2.5s ease-in-out infinite;
  }
  @keyframes pulse-ring {
    0%, 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.4); }
    50%       { box-shadow: 0 0 0 6px rgba(16,185,129,0); }
  }

  /* Name */
  .hero-name {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    font-family: var(--font-display);
    line-height: 1.0;
  }
  .name-line {
    display: block;
    letter-spacing: -0.03em;
  }
  .name-line.dim {
    font-size: clamp(1.6rem, 3.5vw, 2.4rem);
    color: var(--text-muted);
    font-weight: 400;
  }
  .name-line.accent {
    font-size: clamp(3.5rem, 9vw, 6.5rem);
    color: var(--text);
    font-weight: 800;
  }

  /* Role typewriter */
  .hero-role {
    font-family: var(--font-mono);
    font-size: clamp(1rem, 2.2vw, 1.35rem);
    color: var(--accent);
    display: flex;
    align-items: center;
    gap: 0.25rem;
    min-height: 2rem;
  }
  .role-prefix { color: var(--text-faint); }
  .cursor {
    animation: blink 1.1s step-end infinite;
    color: var(--accent);
    font-weight: 400;
  }
  @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }

  /* Bio */
  .hero-bio {
    font-size: clamp(1rem, 1.8vw, 1.1rem);
    color: var(--text-muted);
    line-height: 1.75;
    max-width: 560px;
    font-weight: 300;
  }

  /* CTAs */
  .hero-ctas {
    display: flex;
    gap: 0.875rem;
    flex-wrap: wrap;
    align-items: center;
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
    border: 1px solid transparent;
  }
  .btn-primary:hover {
    background: var(--accent-dark);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(var(--accent-rgb), 0.35);
  }

  .btn-outline {
    display: inline-flex;
    align-items: center;
    padding: 0.8rem 1.6rem;
    border-radius: var(--radius-md);
    font-weight: 500;
    font-size: 0.95rem;
    color: var(--text);
    transition: var(--transition);
  }
  .btn-outline:hover {
    border-color: var(--accent);
    color: var(--accent);
    background: var(--accent-light);
  }

  .btn-ghost {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    color: var(--text-muted);
    padding: 0.8rem 1.1rem;
    border-radius: var(--radius-md);
    font-size: 0.9rem;
    transition: var(--transition);
  }
  .btn-ghost:hover { color: var(--text); background: var(--surface2); }

  .btn-terminal {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    color: var(--text-muted);
    padding: 0.8rem 1.1rem;
    border-radius: var(--radius-md);
    font-family: var(--font-mono);
    font-size: 0.85rem;
    transition: var(--transition);
  }
  .btn-terminal:hover { color: var(--accent); border-color: var(--accent); }

  /* Stats */
  .hero-stats {
    display: flex;
    align-items: center;
    gap: 2rem;
    padding: 1.25rem 2rem;
    border-radius: var(--radius-lg);
    width: fit-content;
  }
  .stat { display: flex; flex-direction: column; gap: 0.15rem; }
  .stat-n {
    font-family: var(--font-display);
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--text);
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

  /* Social */
  .hero-social {
    display: flex;
    gap: 1.25rem;
    align-items: center;
  }
  .hero-social a {
    color: var(--text-faint);
    transition: color 0.2s ease, transform 0.2s ease;
  }
  .hero-social a:hover { color: var(--text); transform: translateY(-2px); }

  /* Scroll hint */
  .scroll-hint {
    position: absolute;
    bottom: 2.5rem;
    left: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    z-index: 1;
  }
  .scroll-hint span {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--text-faint);
    letter-spacing: 0.12em;
    writing-mode: vertical-rl;
  }
  .scroll-line {
    width: 1px;
    height: 48px;
    background: linear-gradient(to bottom, var(--accent), transparent);
    animation: scroll-pulse 2s ease-in-out infinite;
  }
  @keyframes scroll-pulse {
    0%, 100% { opacity: 0.3; transform: scaleY(1); }
    50%       { opacity: 1;   transform: scaleY(1.1); }
  }

  @media (max-width: 768px) {
    .hero { padding: 7rem 1.5rem 5rem; }
    .hero-stats { flex-wrap: wrap; gap: 1.25rem; padding: 1rem 1.25rem; }
    .stat-sep { display: none; }
    .hero-ctas { gap: 0.6rem; }
    .scroll-hint { display: none; }
  }
</style>
<script lang="ts">
  import { scrollReveal } from '$lib/animations';
  import { personal }     from '$lib/data/portfolio';
  import { sanitize, isValidEmail } from '$lib/utils';

  let name    = $state('');
  let email   = $state('');
  let message = $state('');
  let status  = $state<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Field-level errors
  let errors = $state({ name: '', email: '', message: '' });

  function validate(): boolean {
    const e = { name: '', email: '', message: '' };
    if (!name.trim())           e.name    = 'Name is required.';
    if (!email.trim())          e.email   = 'Email is required.';
    else if (!isValidEmail(email)) e.email = 'Enter a valid email address.';
    if (!message.trim())        e.message = 'Message is required.';
    errors = e;
    return !e.name && !e.email && !e.message;
  }

  async function handleSubmit(ev: Event) {
    ev.preventDefault();
    if (!validate()) return;

    status = 'submitting';
    // Simulate network call
    await new Promise(r => setTimeout(r, 1600));
    status = 'success';
    name = email = message = '';
    setTimeout(() => { status = 'idle'; }, 4000);
  }
</script>

<section class="section" id="contact" aria-labelledby="contact-heading">
  <div class="container">

    <div class="section-head" use:scrollReveal>
      <span class="eyebrow">04 / Contact</span>
      <h2 id="contact-heading" class="title">
        Let's build something<br/><em>great</em> together.
      </h2>
      <p class="subtitle">
        Open to freelance, full-time roles, and interesting collaborations.
        I reply within 24 hours.
      </p>
    </div>

    <div class="grid">

      <!-- Left: info -->
      <div class="info-col" use:scrollReveal={{ delay: 80 }}>
        <div class="info-items">
          <a href="mailto:{personal.email}" class="info-item glass">
            <div class="info-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </div>
            <div>
              <span class="info-label">Email</span>
              <span class="info-value">{personal.email}</span>
            </div>
          </a>

          <div class="info-item glass">
            <div class="info-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div>
              <span class="info-label">Location</span>
              <span class="info-value">{personal.location}</span>
            </div>
          </div>

          <a href={personal.resumeUrl} download class="info-item glass">
            <div class="info-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            </div>
            <div>
              <span class="info-label">Download</span>
              <span class="info-value">Résumé / CV</span>
            </div>
          </a>
        </div>

        <!-- Social links -->
        <div class="socials">
          <a href={personal.github}   target="_blank" rel="noopener noreferrer" class="social-btn glass" aria-label="GitHub">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </a>
          <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" class="social-btn glass" aria-label="LinkedIn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </a>
          <a href={personal.twitter} target="_blank" rel="noopener noreferrer" class="social-btn glass" aria-label="Twitter">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            Twitter
          </a>
        </div>
      </div>

      <!-- Right: form -->
      <div class="form-col" use:scrollReveal={{ delay: 160 }}>
        <div class="form-card glass">

          {#if status === 'success'}
            <div class="success-state" role="alert">
              <div class="success-icon" aria-hidden="true">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h3>Message sent!</h3>
              <p>Thanks for reaching out. I'll get back to you within 24 hours.</p>
            </div>

          {:else}
            <form onsubmit={handleSubmit} novalidate>
              <div class="form-group">
                <label for="contact-name">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  bind:value={name}
                  placeholder="Your name"
                  autocomplete="name"
                  class:invalid={!!errors.name}
                  disabled={status === 'submitting'}
                  aria-describedby={errors.name ? 'name-err' : undefined}
                />
                {#if errors.name}
                  <span class="field-error" id="name-err" role="alert">{errors.name}</span>
                {/if}
              </div>

              <div class="form-group">
                <label for="contact-email">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  bind:value={email}
                  placeholder="you@example.com"
                  autocomplete="email"
                  class:invalid={!!errors.email}
                  disabled={status === 'submitting'}
                  aria-describedby={errors.email ? 'email-err' : undefined}
                />
                {#if errors.email}
                  <span class="field-error" id="email-err" role="alert">{errors.email}</span>
                {/if}
              </div>

              <div class="form-group">
                <label for="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  bind:value={message}
                  placeholder="Tell me about your project..."
                  rows={5}
                  class:invalid={!!errors.message}
                  disabled={status === 'submitting'}
                  aria-describedby={errors.message ? 'msg-err' : undefined}
                ></textarea>
                {#if errors.message}
                  <span class="field-error" id="msg-err" role="alert">{errors.message}</span>
                {/if}
              </div>

              <button
                type="submit"
                class="submit-btn"
                disabled={status === 'submitting'}
              >
                {#if status === 'submitting'}
                  <span class="spinner" aria-hidden="true"></span>
                  Sending…
                {:else}
                  Send Message
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                {/if}
              </button>
            </form>
          {/if}

        </div>
      </div>

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
  .section-head { text-align: center; margin-bottom: 4rem; }
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
    line-height: 1.15;
  }
  .title em {
    font-style: italic;
    color: var(--accent);
  }
  .subtitle {
    color: var(--text-muted);
    max-width: 420px;
    margin: 0 auto;
    line-height: 1.7;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 4rem;
    align-items: flex-start;
  }

  /* Info */
  .info-items { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem; }
  .info-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.1rem 1.25rem;
    border-radius: var(--radius-md);
    transition: var(--transition);
    text-decoration: none;
    color: inherit;
  }
  .info-item:hover { transform: translateX(4px); border-color: var(--accent); }
  .info-icon {
    width: 42px;
    height: 42px;
    border-radius: var(--radius-sm);
    background: var(--accent-light);
    color: var(--accent);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .info-label {
    display: block;
    font-size: 0.7rem;
    color: var(--text-faint);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 600;
    margin-bottom: 0.15rem;
  }
  .info-value { font-size: 0.95rem; font-weight: 500; color: var(--text); }

  .socials { display: flex; gap: 0.75rem; flex-wrap: wrap; }
  .social-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1rem;
    border-radius: var(--radius-sm);
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--text-muted);
    transition: var(--transition);
  }
  .social-btn:hover {
    color: var(--accent);
    border-color: var(--accent);
    transform: translateY(-2px);
  }

  /* Form card */
  .form-card {
    border-radius: var(--radius-xl);
    padding: 2.25rem;
  }

  form { display: flex; flex-direction: column; gap: 1.25rem; }

  .form-group { display: flex; flex-direction: column; gap: 0.45rem; }
  .form-group label {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text);
  }

  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 0.85rem 1rem;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    color: var(--text);
    font-size: 0.95rem;
    transition: var(--transition);
    resize: none;
  }
  .form-group input::placeholder,
  .form-group textarea::placeholder { color: var(--text-faint); }
  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: var(--accent);
    background: var(--surface);
    box-shadow: 0 0 0 3px var(--accent-light);
  }
  .form-group input.invalid,
  .form-group textarea.invalid {
    border-color: var(--error);
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
  }
  .form-group input:disabled,
  .form-group textarea:disabled { opacity: 0.6; cursor: not-allowed; }

  .field-error {
    font-size: 0.78rem;
    color: var(--error);
    font-weight: 500;
  }

  .submit-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    width: 100%;
    padding: 0.95rem;
    background: var(--accent);
    color: #fff;
    border-radius: var(--radius-md);
    font-size: 0.95rem;
    font-weight: 600;
    transition: var(--transition);
    margin-top: 0.25rem;
  }
  .submit-btn:not(:disabled):hover {
    background: var(--accent-dark);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(var(--accent-rgb), 0.35);
  }
  .submit-btn:disabled { opacity: 0.65; cursor: not-allowed; }

  .spinner {
    width: 17px;
    height: 17px;
    border: 2px solid rgba(255,255,255,0.3);
    border-radius: 50%;
    border-top-color: #fff;
    animation: spin 0.8s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* Success state */
  .success-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 2rem;
    gap: 1rem;
  }
  .success-icon {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: rgba(16,185,129,0.12);
    color: #10b981;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .success-state h3 {
    font-family: var(--font-display);
    font-size: 1.4rem;
    font-weight: 700;
  }
  .success-state p { color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; }

  @media (max-width: 1024px) {
    .grid { grid-template-columns: 1fr; gap: 3rem; }
  }
  @media (max-width: 640px) {
    .section { padding: calc(var(--section-padding) * 0.7) 0; }
    .form-card { padding: 1.5rem; }
  }
</style>
<svelte:options runes={true} />

<script lang="ts">
  import { onMount }      from 'svelte';
  import { fade, fly }    from 'svelte/transition';
  import { terminalOpen } from '$lib/stores';
  import { projects, personal, skills } from '$lib/data/portfolio';
  import { sanitize }     from '$lib/utils';

  let isMaximized = $state(false);
  let input       = $state('');
 let terminalEl = $state<HTMLElement | null>(null);
let inputRef = $state<HTMLInputElement | null>(null);
  let cmdHistory: string[] = [];
  let historyIndex = -1;

  type LineType = 'command' | 'text' | 'success' | 'error' | 'info' | 'link' | 'spacer';
  type Line = { type: LineType; content: string; href?: string };

  let lines = $state<Line[]>([
    { type: 'info',    content: '╔════════════════════════════════╗' },
    { type: 'info',    content: '║  Portfolio OS  v2.0.0          ║' },
    { type: 'info',    content: '╚════════════════════════════════╝' },
    { type: 'spacer',  content: '' },
    { type: 'text',    content: `Welcome, guest. Type 'help' for commands.` },
    { type: 'spacer',  content: '' },
  ]);

  onMount(() => {
    const onKeydown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        terminalOpen.update(v => !v);
      }
      if (e.key === 'Escape' && $terminalOpen) terminalOpen.set(false);
    };
    window.addEventListener('keydown', onKeydown);
    return () => window.removeEventListener('keydown', onKeydown);
  });

  // Focus input when terminal opens
  $effect(() => {
    if ($terminalOpen) setTimeout(() => inputRef?.focus(), 80);
  });

  function scrollBottom() {
    setTimeout(() => {
      if (terminalEl) terminalEl.scrollTop = terminalEl.scrollHeight;
    }, 16);
  }

  function push(...newLines: Line[]) {
    lines = [...lines, ...newLines];
    scrollBottom();
  }

  function handleSubmit(e: Event) {
    e.preventDefault();
    const raw = input.trim();
    if (!raw) return;

    const safe = sanitize(raw);
    cmdHistory = [raw, ...cmdHistory.slice(0, 49)];
    historyIndex = -1;

    push({ type: 'command', content: `guest@portfolio:~$ ${safe}` });
    processCommand(raw.toLowerCase());
    input = '';
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      historyIndex = Math.min(historyIndex + 1, cmdHistory.length - 1);
      input = cmdHistory[historyIndex] ?? '';
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      historyIndex = Math.max(historyIndex - 1, -1);
      input = historyIndex === -1 ? '' : (cmdHistory[historyIndex] ?? '');
    }
  }

  function processCommand(cmd: string) {
    const [command, ...args] = cmd.split(' ');

    switch (command) {
      case 'help':
        push(
          { type: 'spacer', content: '' },
          { type: 'success', content: 'Available commands:' },
          { type: 'text',    content: '  help         — Show this help message' },
          { type: 'text',    content: '  about        — About me' },
          { type: 'text',    content: '  projects      — List projects' },
          { type: 'text',    content: '  project <id>  — Project detail' },
          { type: 'text',    content: '  skills        — Technical skills' },
          { type: 'text',    content: '  contact       — Contact info' },
          { type: 'text',    content: '  theme         — Toggle dark/light mode' },
          { type: 'text',    content: '  clear         — Clear terminal' },
          { type: 'text',    content: '  echo <text>   — Echo text' },
          { type: 'text',    content: '  sudo          — Try it 😈' },
          { type: 'spacer',  content: '' },
          { type: 'info',    content: 'Keyboard: ↑↓ history · Ctrl+K toggle · Esc close' },
          { type: 'spacer',  content: '' },
        );
        break;

      case 'about':
        push(
          { type: 'spacer',  content: '' },
          { type: 'success', content: personal.name },
          { type: 'text',    content: `Role:     ${personal.title}` },
          { type: 'text',    content: `Location: ${personal.location}` },
          { type: 'text',    content: `Email:    ${personal.email}` },
          { type: 'spacer',  content: '' },
          { type: 'text',    content: personal.bio },
          { type: 'spacer',  content: '' },
          { type: 'info',    content: `Experience: ${personal.yearsExp}+ years · ${personal.projectsShipped}+ projects` },
          { type: 'spacer',  content: '' },
        );
        break;

      case 'projects':
        push({ type: 'spacer', content: '' });
        projects.forEach((p, i) => {
          push(
            { type: 'success', content: `[${String(i + 1).padStart(2, '0')}] ${p.title} (${p.year}) · ${p.status}` },
            { type: 'text',    content: `     ${p.tagline}` },
            { type: 'text',    content: `     Stack: ${p.tech.join(', ')}` },
            ...(p.demo !== '#'   ? [{ type: 'link' as LineType, content: `     Demo:  ${p.demo}`,   href: p.demo }]   : []),
            ...(p.github !== '#' ? [{ type: 'link' as LineType, content: `     Code:  ${p.github}`, href: p.github }] : []),
            { type: 'spacer', content: '' },
          );
        });
        push({ type: 'info', content: `Type 'project <id>' for more details (e.g. project motionkit)` }, { type: 'spacer', content: '' });
        break;

      case 'project': {
        const id = args[0];
        if (!id) { push({ type: 'error', content: 'Usage: project <id>  (e.g. project motionkit)' }); break; }
        const p = projects.find(p => p.id === id);
        if (!p) { push({ type: 'error', content: `Project '${id}' not found. Type 'projects' to list all.` }); break; }
        push(
          { type: 'spacer',  content: '' },
          { type: 'success', content: `── ${p.title} ──` },
          { type: 'text',    content: p.description },
          { type: 'spacer',  content: '' },
          { type: 'info',    content: `Year:   ${p.year}` },
          { type: 'info',    content: `Status: ${p.status}` },
          { type: 'info',    content: `Stack:  ${p.tech.join(', ')}` },
          ...(p.demo   !== '#' ? [{ type: 'link' as LineType, content: `Demo:   ${p.demo}`,   href: p.demo }]   : []),
          ...(p.github !== '#' ? [{ type: 'link' as LineType, content: `Code:   ${p.github}`, href: p.github }] : []),
          { type: 'spacer', content: '' },
        );
        break;
      }

      case 'skills': {
        const categories = [...new Set(skills.map(s => s.category))];
        push({ type: 'spacer', content: '' });
        categories.forEach(cat => {
          const catSkills = skills.filter(s => s.category === cat);
          push({ type: 'success', content: `── ${cat} ──` });
          catSkills.forEach(s => {
            const bar = '█'.repeat(Math.round(s.level / 10)) + '░'.repeat(10 - Math.round(s.level / 10));
            push({ type: 'text', content: `  ${s.icon} ${s.name.padEnd(22)} ${bar} ${s.level}%` });
          });
          push({ type: 'spacer', content: '' });
        });
        break;
      }

      case 'contact':
        push(
          { type: 'spacer',  content: '' },
          { type: 'success', content: 'Get in touch:' },
          { type: 'link',    content: `Email:    ${personal.email}`,    href: `mailto:${personal.email}` },
          { type: 'link',    content: `GitHub:   ${personal.github}`,   href: personal.github },
          { type: 'link',    content: `LinkedIn: ${personal.linkedin}`, href: personal.linkedin },
          { type: 'text',    content: `Location: ${personal.location}` },
          { type: 'spacer',  content: '' },
        );
        break;

      case 'theme':
        import('$lib/stores').then(({ theme }) => {
          theme.toggle();
          push({ type: 'success', content: 'Theme toggled.' }, { type: 'spacer', content: '' });
        });
        break;

      case 'clear':
        lines = [];
        break;

      case 'echo':
        push({ type: 'text', content: args.join(' ') || '' }, { type: 'spacer', content: '' });
        break;

      case 'sudo':
        push(
          { type: 'error',  content: `[sudo] password for guest:` },
          { type: 'error',  content: `guest is not in the sudoers file.` },
          { type: 'error',  content: `This incident will be reported. 👀` },
          { type: 'spacer', content: '' },
        );
        break;

      case '':
        break;

      default:
        push(
          { type: 'error',  content: `Command not found: '${sanitize(command)}'. Type 'help' for available commands.` },
          { type: 'spacer', content: '' },
        );
    }
  }
</script>

<!-- FAB -->
{#if !$terminalOpen}
  <button
    class="fab"
    onclick={() => terminalOpen.set(true)}
    aria-label="Open terminal (Ctrl+K)"
    title="Open terminal (Ctrl+K)"
    transition:fade={{ duration: 200 }}
  >
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <polyline points="4 17 10 11 4 5"/>
      <line x1="12" y1="19" x2="20" y2="19"/>
    </svg>
  </button>
{/if}

<!-- Backdrop -->
{#if $terminalOpen}
  <div
    class="backdrop"
    onclick={() => terminalOpen.set(false)}
    aria-hidden="true"
    transition:fade={{ duration: 180 }}
  ></div>

  <!-- Window -->
  <div
    class="terminal"
    class:maximized={isMaximized}
    role="dialog"
    aria-modal="true"
    aria-label="Interactive Terminal"
    transition:fly={{ y: 40, duration: 300 }}
  >
    <!-- Title bar -->
    <div class="titlebar">
      <div class="traffic">
        <button class="tl close"    aria-label="Close"    onclick={() => terminalOpen.set(false)}></button>
        <button class="tl minimize" aria-label="Minimize" onclick={() => terminalOpen.set(false)}></button>
        <button class="tl maximize" aria-label="Maximize" onclick={() => isMaximized = !isMaximized}></button>
      </div>
      <span class="titlebar-text">guest@portfolio:~</span>
      <div class="titlebar-actions">
        <span class="kbd">Ctrl+K</span>
        <button class="icon-close" onclick={() => terminalOpen.set(false)} aria-label="Close terminal">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6"  y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Output -->
    <div
      class="output"
      bind:this={terminalEl}
      onclick={() => inputRef?.focus()}
      aria-live="polite"
      aria-relevant="additions"
    >
      {#each lines as line}
        <div class="line line-{line.type}">
          {#if line.type === 'link'}
            <a href={line.href} target="_blank" rel="noopener noreferrer" class="term-link">{line.content}</a>
          {:else if line.type === 'spacer'}
            &nbsp;
          {:else}
            {line.content}
          {/if}
        </div>
      {/each}

      <!-- Input row -->
      <form class="input-row" onsubmit={handleSubmit}>
        <span class="prompt" aria-hidden="true">guest@portfolio:~$</span>
        <input
          bind:this={inputRef}
          bind:value={input}
          type="text"
          class="term-input"
          spellcheck="false"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          aria-label="Terminal input"
          onkeydown={handleKeydown}
        />
      </form>
    </div>
  </div>
{/if}

<style>
  /* FAB */
  .fab {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: var(--accent);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 900;
    box-shadow: 0 4px 20px rgba(var(--accent-rgb), 0.4);
    transition: transform 0.2s var(--ease-spring), background 0.2s;
  }
  .fab:hover { transform: scale(1.08); background: var(--accent-dark); }

  /* Backdrop */
  .backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.45);
    backdrop-filter: blur(4px);
    z-index: 1000;
  }

  /* Terminal window */
  .terminal {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: min(680px, calc(100vw - 2rem));
    height: 460px;
    display: flex;
    flex-direction: column;
    background: #0a0a12;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: var(--radius-lg);
    overflow: hidden;
    z-index: 1001;
    box-shadow: 0 32px 80px rgba(0,0,0,0.6);
    font-family: var(--font-mono);
    transition: all 0.3s var(--ease-out);
  }
  .terminal.maximized {
    inset: 0;
    width: 100vw;
    height: 100vh;
    border-radius: 0;
    bottom: 0; right: 0;
  }

  /* Title bar */
  .titlebar {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.65rem 1rem;
    background: rgba(255,255,255,0.03);
    border-bottom: 1px solid rgba(255,255,255,0.06);
    flex-shrink: 0;
  }
  .traffic { display: flex; gap: 6px; }
  .tl {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    transition: opacity 0.15s;
  }
  .tl:hover { opacity: 0.8; }
  .tl.close    { background: #ff5f57; }
  .tl.minimize { background: #febc2e; }
  .tl.maximize { background: #28c840; }

  .titlebar-text {
    flex: 1;
    text-align: center;
    font-size: 0.8rem;
    color: #6b7280;
    letter-spacing: 0.03em;
  }
  .titlebar-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .kbd {
    font-size: 0.65rem;
    padding: 2px 6px;
    border-radius: 3px;
    background: rgba(255,255,255,0.06);
    color: #6b7280;
    border: 1px solid rgba(255,255,255,0.08);
  }
  .icon-close {
    color: #6b7280;
    display: flex;
    align-items: center;
    transition: color 0.15s;
  }
  .icon-close:hover { color: #e5e7eb; }

  /* Output */
  .output {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0;
    cursor: text;
  }
  .output::-webkit-scrollbar { width: 4px; }
  .output::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }

  .line {
    font-size: 0.85rem;
    line-height: 1.65;
    white-space: pre-wrap;
    word-break: break-all;
  }
  .line-command { color: #f9fafb; font-weight: 500; margin-top: 0.35rem; }
  .line-text    { color: #9ca3af; }
  .line-success { color: #34d399; }
  .line-error   { color: #f87171; }
  .line-info    { color: #818cf8; }
  .line-spacer  { height: 0.4rem; }

  .term-link {
    color: #60a5fa;
    text-decoration: underline;
    text-underline-offset: 2px;
    cursor: pointer;
  }
  .term-link:hover { color: #93c5fd; }

  /* Input */
  .input-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.25rem;
  }
  .prompt {
    color: #34d399;
    font-size: 0.85rem;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .term-input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: #f9fafb;
    font-family: inherit;
    font-size: 0.85rem;
    caret-color: #6366f1;
  }

  @media (max-width: 640px) {
    .terminal { right: 0; bottom: 0; width: 100vw; border-radius: var(--radius-lg) var(--radius-lg) 0 0; }
    .fab { bottom: 1.5rem; right: 1.5rem; }
  }
</style>
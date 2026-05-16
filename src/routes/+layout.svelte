<script lang="ts">
  import { onMount }    from 'svelte';
  import { page }       from '$app/stores';
  import { fly, fade }  from 'svelte/transition';
  import { theme }      from '$lib/stores';
  import Navbar         from '$lib/components/navigation/Navbar.svelte';
  import Footer         from '$lib/components/ui/Footer.svelte';
  import AIAssistance   from '$lib/components/terminal/AIAssistance.svelte';
  import '../app.css';

  let { children } = $props();

  onMount(() => {
    // Ensure theme attribute is set after hydration
    document.documentElement.setAttribute('data-theme', $theme);
  });
</script>

<Navbar />

<main id="main">
  {#key $page.url.pathname}
    <div
      in:fly={{ y: 18, duration: 350, delay: 120 }}
      out:fade={{ duration: 150 }}
    >
      {@render children()}
    </div>
  {/key}  
</main>

<Footer />

<!-- Global terminal — rendered on every route -->
<AIAssistance />
<script lang="ts">
  import Hero            from '$lib/components/hero/Hero.svelte';
  import ProjectsSection from '$lib/components/projects/ProjectsSection.svelte';
  import SkillsSection   from '$lib/components/ui/SkillsSection.svelte';
  import AboutSection    from '$lib/components/ui/AboutSection.svelte';
  import ContactSection  from '$lib/components/ui/ContactSection.svelte';
</script>

<svelte:head>
  <title>John Allison — Full-Stack Engineer</title>
  <meta name="description" content="Full-stack engineer specialising in Svelte, TypeScript, and performant web experiences. Available for freelance and full-time work." />
</svelte:head>

<Hero />
<ProjectsSection />
<SkillsSection />
<AboutSection />
<ContactSection />
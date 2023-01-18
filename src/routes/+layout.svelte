<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import '@picocss/pico';
  import '$lib/styles/style.css';
  import Footer from '$lib/components/Footer.svelte';
  import PageTransitions from '$lib/components/PageTransitions.svelte';
  import { page } from '$app/stores';
</script>

<div class="layout">
  <Header />
  <slot />
  <Footer />
</div>

<style>
  .layout {
    padding: 0 1rem;
  }
</style>

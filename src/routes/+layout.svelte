<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Search from '$lib/components/Search.svelte';
  import '@picocss/pico';
  import '$lib/styles/style.css';
  import Footer from '$lib/components/Footer.svelte';
</script>

<div class="layout">
  <Header />
  <Search />
  <slot />
  <Footer />
</div>

<style>
  .layout {
    padding: 0 1rem;
  }
</style>

<script lang="ts">
  import { fly } from 'svelte/transition';
  import Header from '$lib/components/Header.svelte';
  import Search from '$lib/components/Search.svelte';
  import '@picocss/pico';
  import '$lib/styles/style.css';
  import Footer from '$lib/components/Footer.svelte';
  
</script>

<div class="layout">
  <div class="Header">
    <Header />
  </div>
  <div class="Search">
    <Search />
  </div>
  <div class="slot">
    <slot />
  </div>
  <div class="Footer">
    <Footer />
  </div>
</div>

<style>
  .Header {
    padding: 0 0rem;
  }
  .Search {
    padding: 0 1rem;
  }
  .Footer {
    padding: 0 1rem;
  }
  .slot {
    padding: 0 0.5rem;
  }
</style>

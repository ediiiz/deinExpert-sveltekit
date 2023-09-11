<script lang="ts">
  import { fly } from 'svelte/transition';
  import Header from '$lib/components/Header.svelte';
  import Search from '$lib/components/Search.svelte';
  import '$lib/styles/style.css';
  import Footer from '$lib/components/Footer.svelte';
  import '../app.postcss'
</script>

<div class="container mx-auto">
  <div class="">
    <Header />
  </div>
  <div class="py-4">
    <Search />
  </div>
  <div class="slot">
    <slot />
  </div>
</div>

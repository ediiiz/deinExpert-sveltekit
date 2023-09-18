<script lang="ts">
  import type { PageData } from './$types';
  import Product from '$lib/components/Product.svelte';
  import AppDownload from '$lib/components/AppDownload.svelte';
  export let data: PageData;
</script>

<main class="grid grid-rows-1">
  <div class="grid grid-rows-2 justify-center justify-items-center">
    <h1 class="text-3xl font-bold">Top 10</h1>
    <h2 class="text-xl">Die beliebtesten Produkte</h2>
  </div>

  <div class="grid grid-rows-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {#each data.products as products}
      <Product {products} />
    {/each}
  </div>
  <AppDownload />
</main>

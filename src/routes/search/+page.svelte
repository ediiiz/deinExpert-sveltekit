<script lang="ts">
  import AppDownload from '$lib/components/AppDownload.svelte';
  import Product from '$lib/components/Product.svelte';
  import type { PageData } from './$types';
  import Time from 'svelte-time';
  export let data: PageData;
</script>

<main class="grid grid-rows-1">
  <div class="grid grid-rows-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {#each data.products as products}
      <Product {products} />
    {/each}
  </div>
  <AppDownload />
</main>

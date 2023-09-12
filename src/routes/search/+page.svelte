<script lang="ts">
  import Product from '$lib/components/Product.svelte';
  import type { PageData } from './$types';
  import Time from 'svelte-time';
  export let data: PageData;
  import { fly } from 'svelte/transition';
</script>

<main
  in:fly|global={{ x: -100, duration: 250, delay: 300 }}
  out:fly|global={{ x: -100, duration: 250 }}
  class="grid grid-rows-1"
>
  <div
    in:fly|global={{ x: -100, duration: 250, delay: 300 }}
    class="grid grid-rows-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
  >
    {#each data.products as products}
      <Product {products} />
    {/each}
  </div>
</main>

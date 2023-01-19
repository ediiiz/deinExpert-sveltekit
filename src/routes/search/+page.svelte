<script lang="ts">
  import Product from '$lib/components/Product.svelte';
  import type { PageData } from './$types';
  import Time from 'svelte-time';
  export let data: PageData;
  import { fly } from 'svelte/transition';
</script>

<main
  in:fly={{ x: -100, duration: 250, delay: 300 }}
  out:fly={{ x: -100, duration: 250 }}
>
  <div in:fly={{ x: -100, duration: 250, delay: 300 }}>
    {#each data.products as products}
      <Product {products} />
    {/each}
  </div>
</main>

<script lang="ts">
  import { fly } from 'svelte/transition';
  import type { PageData } from './$types';
  import Product from '$lib/components/Product.svelte';
  export let data: PageData;
</script>

<main
  class="grid grid-rows-1"
  in:fly|global={{ x: -100, duration: 250, delay: 300 }}
  out:fly|global={{ x: -100, duration: 250 }}
>
  <div class="grid grid-rows-2 justify-center justify-items-center">
    <h1 class="text-3xl font-bold">Top 10</h1>
    <h2 class="text-xl">Die beliebtesten Produkte</h2>
  </div>

  <div class="grid grid-rows-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {#each data.products as products}
      <Product {products} />
    {/each}
  </div>
  <div>
    <article>
      <header>Vermisst du ein Produkt?</header>
      <p>
        Lade unser <a href="https://addons.mozilla.org/en-US/firefox/addon/preisdetektiv/">Firefox Addon</a> herunter um
        deine Lieblingsprodukte hinzuzufuegen.
      </p>
    </article>
  </div>
</main>

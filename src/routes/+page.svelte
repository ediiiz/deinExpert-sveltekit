<script lang="ts">
  import { fly } from 'svelte/transition';
  import type { PageData } from './$types';
  import Product from '$lib/components/Product.svelte';

  // data returned from +page.server.js
  export let data: PageData;
</script>

<main
  in:fly={{ x: -100, duration: 250, delay: 300 }}
  out:fly={{ x: -100, duration: 250 }}
>
  <div>
    {#each data.products as products}
      <Product {products} />
    {/each}
  </div>
  <div>
    <article>
      <header>Vermisst du ein Produkt?</header>
      <p>
        Lade unser <a
          href="https://addons.mozilla.org/en-US/firefox/addon/preisdetektiv/"
          >Firefox Addon</a
        > herunter um deine Lieblingsprodukte hinzuzufuegen.
      </p>
    </article>
  </div>
</main>

<style>
</style>

<script lang="ts">
  import type { PageData } from './$types'
  import Product from '$lib/components/Product.svelte';

  // data returned from +page.server.js
  export let data: PageData
</script>

<div>
  <main>
    <div>
      {#each data.products as products}
        <Product {products} />
      {/each}
    </div>
    <div>
      <article>
        <header>Vermisst du ein Produkt?</header>
        <p>
          Lade unser <a href="https://addons.mozilla.org/en-US/firefox/addon/preisdetektiv/">Firefox Addon</a> herunter um deine Lieblingsprodukte hinzuzufuegen.
        </p>
      </article>
    </div>
  </main>
</div>


<style>
  thead > tr > th {
    text-align: justify;
  }
  tbody > tr > td {
    text-align: justify;
  }
</style>


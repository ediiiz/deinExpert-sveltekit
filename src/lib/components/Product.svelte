<script lang="ts">
  import type { Product, PriceHistory, Price } from '@prisma/client';
  import Time from "svelte-time";
  export let products: (Product & {
        priceHistory: (PriceHistory & {
            price: Price[];
        })[];
    });
</script>

<article>
  <header>
    {products.productName}
  </header>
  <a href="/product/{products.webcode}" role="button">Ab {products.priceHistory[0].price[0].price}€</a>
  <footer>
    Updated: <Time relative timestamp={products.priceHistory[0].date} />
  </footer>
</article>

<style>
    article > a {
    display: flex;
    justify-content: space-evenly;

  }
</style>

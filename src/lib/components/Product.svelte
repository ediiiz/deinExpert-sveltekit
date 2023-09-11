<script lang="ts">
  import type { Product, PriceHistory, Price } from '@prisma/client';
  import Time from 'svelte-time';
  export let products: Product & {
    priceHistory: (PriceHistory & {
      price: Price[];
    })[];
  };
  import { Button } from "$lib/components/ui/button";
</script>

<article class=" bg-gray-300 rounded-lg my-4 grid grid-cols-1 h-36 mx-2 sm:mx-24 opacity-90 shadow-black gap-2 p-4">
  <header class="text-xl">
    {products.productName}
  </header>
  <Button href="/product/{products.webcode}" class=" h-auto mx-10 text-xl"
    >Ab {products?.priceHistory[0]?.price.sort((a, b) => a.price - b.price)[0]
      ?.price || '...'}€</Button>
  <div class=" justify-items-center items-center place-content-center place-items-center">
    Updated: <Time relative timestamp={products.priceHistory[0].date} />
  </div>
</article>


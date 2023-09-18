<script lang="ts">
  import type { Product, PriceHistory, Price } from '@prisma/client';
  import Time from 'svelte-time';
  export let products: Product & {
    priceHistory: (PriceHistory & {
      price: Price[];
    })[];
  };
  import { Button } from '$lib/components/ui/button';
</script>

<article class="bg-gray-100 rounded-md flex flex-col p-2 shadow-2xl pb-4">
  <header class="flex items-center justify-center align-middle text-center">
    <div class="flex py-4 h-20 items-center justify-center text-lg">{products.productName}</div>
  </header>
  <Button href="/product/{products.webcode}" class="text-lg text-center"
    >Ab {products?.priceHistory[0]?.price.sort((a, b) => a.price - b.price)[0]?.price || '...'}€</Button
  >
</article>

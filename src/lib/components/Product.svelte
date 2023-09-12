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

<article class="bg-gray-300 rounded-lg flex flex-col p-2">
  <header class="flex items-center justify-center text-center py-4">
    {products.productName}
  </header>
  <Button href="/product/{products.webcode}" class=""
    >Ab {products?.priceHistory[0]?.price.sort((a, b) => a.price - b.price)[0]?.price || '...'}€</Button
  >
  <div class="text-sm text-center py-2">
    <Time relative timestamp={products.priceHistory[0].date} />
  </div>
</article>

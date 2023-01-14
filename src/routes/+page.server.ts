import type { Product } from '@prisma/client';
import type { PriceHistory } from '@prisma/client';
import type { Price } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
  const response = await fetch('/api/product');

  return {
    product: (await response.json()) as (Product & {
      priceHistory: (PriceHistory & {
        price: Price[];
      })[];
    })[],
  };
};

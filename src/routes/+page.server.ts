import type { PageServerLoad } from './$types';
import prisma from '$lib/prisma';

export const load: PageServerLoad = async () => {
  const products = await prisma.product.findMany({
    include: {
      priceHistory: {
        include: {
          price: true,
        },
      },
    },
  });

  return { products };
};

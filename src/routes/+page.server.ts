import type { Actions, PageServerLoad } from './$types';
import prisma from '$lib/prisma';

export const load: PageServerLoad = async () => {
  const products = await prisma.product.findMany({
    include: {
      priceHistory: {
        orderBy: { date: 'desc' },
        include: {
          price: true,
        },
        take: 1,
      },
    },
    take: 10,
    orderBy: { views: 'desc' },
  });

  return { products };
};

const actions: Actions = {};

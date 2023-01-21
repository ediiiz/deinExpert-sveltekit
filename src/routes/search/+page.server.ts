import prisma from '$lib/prisma';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  let searchString = url.searchParams.get('p') ?? undefined;
  searchString = !searchString ? undefined : searchString;
  const products = await prisma.product.findMany({
    where: {
      OR: [
        {
          productName: { contains: searchString },
        },
        {
          webcode: { contains: searchString },
        },
      ],
    },
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
  });

  if (products.length === 0) {
    throw error(404, {
      message:
        'Kein Produkt gefunden, versuch es mit einem anderen Suchbegriff!',
    });
  }

  return { products };
};

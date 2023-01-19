import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import prisma from '$lib/prisma';

export const load: PageServerLoad = async ({ params: { webcode } }) => {
  const product = await prisma.product.findUnique({
    where: { webcode: webcode },
    include: {
      priceHistory: {
        orderBy: { date: 'desc' },
        include: {
          price: true,
        },
      },
    },
  });

  if (product) {
    await prisma.product.update({
      where: { webcode: webcode },
      data: {
        views: product.views + 1,
      },
    });
  }

  if (!product) {
    throw error(404, {
      message:
        'Dieses Produkt haben wir leider noch nicht, aber du kannst es gerne mit dem Addon scannen!',
    });
  }

  return { product };
};

import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import prisma from '$lib/prisma';

export const load: PageServerLoad = async ({ params: { webcode }, url }) => {
  const branch = url.searchParams.get('branch');
  if (branch) {
    const product = await prisma.product.findUnique({
      where: { webcode: webcode },
      select: { productUrl: true },
    });
    if (product?.productUrl) {
      throw redirect(302, `${product.productUrl}?branchid=${branch}`);
    }
  }

  const product = await prisma.product.findUnique({
    where: { webcode: webcode },
    include: {
      priceHistory: {
        orderBy: { date: 'desc' },
        include: {
          price: true,
        },
        take: 5,
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

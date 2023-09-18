import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import prisma from '$lib/prisma';

type BranchAffiliate = {
  branchId: number;
  affiliate: string;
};

export const load: PageServerLoad = async ({ params: { webcode }, url }) => {
  const data = url.searchParams.get('data');
  if (data) {
    const branchAffiliate = JSON.parse(atob(data)) as BranchAffiliate;
    const product = await prisma.product.findUnique({
      where: { webcode: webcode },
      select: { productUrl: true },
    });
    if (product?.productUrl) {
      throw redirect(
        302,
        `${branchAffiliate.affiliate}&p=${product.productUrl}?branch_id=${branchAffiliate.branchId}&gclid=0`
      );
    }
  }

  const product = await prisma.product.findUnique({
    where: { webcode: webcode },
    include: {
      priceHistory: {
        orderBy: { date: 'desc' },
        include: {
          price: { orderBy: { price: 'asc' }, take: 100 },
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

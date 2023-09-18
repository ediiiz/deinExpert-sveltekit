import { json } from '@sveltejs/kit';
import prisma from '$lib/prisma';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params: { webcode } }) => {
  const product = await prisma.product.findUnique({
    where: { webcode: webcode },
    include: {
      priceHistory: {
        take: 1,
        // Take the newsest price history
        orderBy: { date: 'desc' },
      },
    },
  });

  if (!product) {
    return json({
      success: false,
      error: 'Product not found',
    });
  }

  return json({ success: true, product });
};

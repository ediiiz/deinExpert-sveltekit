import { json } from '@sveltejs/kit';
import prisma from '$lib/prisma';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params: { webcode } }) => {
  const product = await prisma.product.findUnique({
    where: { webcode: webcode },
    include: {
      priceHistory: {
        include: {
          price: true,
        },
        take: 1,
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

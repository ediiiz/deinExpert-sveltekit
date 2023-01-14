import { json } from '@sveltejs/kit';
import prisma from '$lib/prisma';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params: { webcode } }) => {
  const post = await prisma.product.findUnique({
    where: { webcode: webcode },
    include: {
      priceHistory: {
        include: {
          price: true,
        },
      },
    },
  });

  return json(post);
};

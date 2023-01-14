import prisma from '$lib/prisma';
import { json } from '@sveltejs/kit';

export async function GET() {
  const products = await prisma.product.findMany({
    include: {
      priceHistory: {
        include: {
          price: true,
        },
      },
    },
  });
  return json(products);
}

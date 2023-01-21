import prisma from '$lib/prisma';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { product } from '$lib/types/types';
import validateWebcode from '$lib/validateWebcode';
import { z } from 'zod';

const productSchema = z.object({
  webcode: z.string(),
  price: z.array(
    z.object({
      price: z.number(),
      branchName: z.string(),
      branchId: z.number(),
    })
  ),
});

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

export const POST: RequestHandler = async ({ request }) => {
  const product = (await request.json()) as product;
  const productValidation = productSchema.safeParse(product);

  if (!productValidation.success) {
    throw error(500, {
      message: 'Ungültige Daten - versuchst du zu falsche Daten hochzuladen?😔',
    });
  }

  const findUnique = await prisma.product.findUnique({
    where: { webcode: product.webcode },
  });
  if (findUnique) {
    const productUpdate = await prisma.product.update({
      where: { webcode: product.webcode },
      data: {
        priceHistory: {
          create: {
            price: {
              create: product.price,
            },
          },
        },
      },
    });
    return json(productUpdate);
  } else {
    const webcodeValidation = await validateWebcode(product.webcode);
    if (webcodeValidation === false) {
      throw error(500, {
        message:
          'Webcode ungültig - versuchst du zu falsche Daten hochzuladen?😔',
      });
    }
    const productCreate = await prisma.product.create({
      data: {
        webcode: product.webcode,
        productName: webcodeValidation.items[0].pagemap.listitem[4].name,
        image: webcodeValidation.items[0].pagemap.cse_thumbnail[0].src,
        priceHistory: {
          create: {
            price: {
              create: product.price,
            },
          },
        },
      },
    });
    return json(productCreate);
  }
};

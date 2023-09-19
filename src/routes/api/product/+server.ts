import prisma from '$lib/prisma';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { product } from '$lib/types/types';
import { z } from 'zod';
import validateWebcode from '$lib/validateWebcode';
import validateRecaptcha from '$lib/validateRecaptcha';

const productSchema = z.object({
  webcode: z.string(),
  price: z.array(
    z.object({
      price: z.number(),
      branchName: z.string(),
      branchId: z.number(),
      aussteller: z.boolean(),
    })
  ),
});

export const POST: RequestHandler = async ({ request }) => {
  const product = (await request.json()) as product;

  const productValidation = productSchema.safeParse(product);
  if (!productValidation.success) {
    throw error(500, {
      message: 'Ungültige Daten - versuchst du zu falsche Daten hochzuladen?😔',
    });
  }

  /*const recaptchaValidation = await validateRecaptcha(product.verify);
  if (!recaptchaValidation.success) {
    throw error(500, {
      message:
        'Recaptcha ungültig - versuchst du zu falsche Daten hochzuladen?😔',
    });
  }*/

  if (product.price.length === 0) {
    throw error(500, {
      message:
        'Preis ungültig - versuchst du zu falsche Daten hochzuladen?😔',
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

    // make this more error safe ""
    if (!webcodeValidation?.items?.length) {
      throw new Error("webcodeValidation.items is undefined or empty.");
    }

    const firstItem = webcodeValidation.items[0];
    const productName = firstItem.title?.split(" -")[0] ?? firstItem.title;
    const image = firstItem.pagemap?.cse_thumbnail?.[0]?.src ?? "";
    const productUrl = firstItem.link?.split("?")[0] ?? firstItem.link;


    const productCreate = await prisma.product.create({
      data: {
        webcode: product.webcode,
        productName: productName,
        image: image,
        productUrl: productUrl,
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

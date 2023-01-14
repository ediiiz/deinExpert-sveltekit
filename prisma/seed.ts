import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const productData: Prisma.ProductCreateInput[] = [
  {
    articleId: '1',
    product_name: 'Product 1',
    webcode: "100021",
    priceHistory: {
      create: [
        {
          price: {
            create: [
              {
                price: 100,
                branchId: 1,
                branchName: 'Branch 1',
              },
              {
                price: 100,
                branchId: 1,
                branchName: 'Branch 1',
              },
              {
                price: 100,
                branchId: 1,
                branchName: 'Branch 1',
              },
              {
                price: 100,
                branchId: 1,
                branchName: 'Branch 1',
              },
              {
                price: 100,
                branchId: 1,
                branchName: 'Branch 1',
              },
              {
                price: 100,
                branchId: 1,
                branchName: 'Branch 1',
              },
              {
                price: 100,
                branchId: 1,
                branchName: 'Branch 1',
              },
              {
                price: 100,
                branchId: 1,
                branchName: 'Branch 1',
              },
              {
                price: 100,
                branchId: 1,
                branchName: 'Branch 1',
              },
              {
                price: 100,
                branchId: 1,
                branchName: 'Branch 1',
              },
            ],
          },
        },
      ],
    },
  },
  {
    articleId: '2',
    product_name: 'Product 2',
    webcode: "100022",
    priceHistory: {
      create: [
        {
          price: {
            create: [
              {
                price: 102,
                branchId: 1,
                branchName: 'Branch 1',
              },
            ],
          },
        },
      ],
    },
  },
  {
    articleId: '3',
    product_name: 'Product 3',
    webcode: "100023",
    priceHistory: {
      create: [
        {
          price: {
            create: [
              {
                price: 103,
                branchId: 1,
                branchName: 'Branch 1',
              },
            ],
          },
        },
      ],
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of productData) {
    const product = await prisma.product.create({
      data: u,
    });
    console.log(`Created user with id: ${product.product_name}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const productData: Prisma.ProductCreateInput[] = [
  {
    productName:
      'ASUS Vivobook 15 F515EA-EJ2150W slate grey, Intel i5-1135G7, 12GB, 512GB SSD Notebook',
    webcode: '17044211125',
    image:
      'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQvTiMEVFLxll9zgTId1oqfqxbHzYWoke4CWa4NvZDG8fgTtlvmjZ9MrjA',
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
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of productData) {
    const product = await prisma.product.create({
      data: u,
    });
    console.log(`Created user with id: ${product.productName}`);
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

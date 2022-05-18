import { PrismaClient } from "@prisma/client";
import { mockData } from "../assets/data";
const prisma = new PrismaClient();

async function main() {
  const prismaCalls = mockData.map(async (obj) => {
    const user = await prisma.user.create({
      data: { ...obj.user },
    });
    await prisma.location.create({
      data: { ...obj.location, userId: user.identifier },
    });
    const category = await prisma.category.create({
      data: {
        ...obj.category,
        Items: {
          create: obj.items.map((item) => {
            return { ...item, userId: user.identifier };
          }),
        },
      },
    });
  });

  await Promise.all(prismaCalls);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

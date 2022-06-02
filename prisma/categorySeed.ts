import { PrismaClient } from "@prisma/client";
import { categorySeed } from "../assets/categories";
import { mockData } from "../assets/data";
const prisma = new PrismaClient();

async function main() {
  await prisma.subcategory.deleteMany();

  const prismaCalls = categorySeed.KitchenCategories.Appliances.map(
    async (obj) => {
      const subcategory = await prisma.subcategory.create({
        data: {
          obj,
        },
      });
    }
  );

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

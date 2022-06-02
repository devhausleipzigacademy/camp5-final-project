import { PrismaClient } from "@prisma/client";
import { categorySeed } from "../assets/categories";
import { mockData } from "../assets/data";
const prisma = new PrismaClient();

async function main() {
  await prisma.subcategory.deleteMany();

  const prismaCallCat = Object.keys(categorySeed.KitchenCategories).map(
  async function (key, index) {
      const categories = await prisma.category.create({
      data: {
          title: key[index],
          subcategories: categorySeed.KitchenCategories.Appliances
      }
  } 
      
})
const prismaCallSubcat = categorySeed.KitchenCategories.Appliances.map(
    async (obj) => {
      const subcategory = await prisma.subcategory.create({
        data: {
          name: obj,
          category: categorySeed.KitchenCategories
        },
      });
    }
  );

  await Promise.all(prismaCallSubcat);
  await Promise.all(prismaCallCat);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

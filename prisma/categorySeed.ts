import { PrismaClient } from "@prisma/client";
import { DiagnosticCategory } from "typescript";
import { mockData, mockKitchenCategories } from "../assets/data";

const prisma = new PrismaClient();

async function main() {
  await prisma.subcategory.deleteMany();
  await prisma.category.deleteMany();

  const prismaCallCat = mockKitchenCategories.kitchen.map(async (cat) => {
    const categories = await prisma.category.create({
      data: {
        title: cat.title,
        description: cat.description,
      },
    });
    const prismaCallData = mockData.map(async (data) => {
        const user = await prisma.user.create({
            data: { ...data.user },
        });
        await prisma.location.create({
            data: {
                ...data.location,
                userId: user.identifier,
            },
        });
        await prisma.conversation.create({
            data: {
                ...data.conversations,
                userId: user.identifier,
            },
        });
    });

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

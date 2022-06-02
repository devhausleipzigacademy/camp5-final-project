import { Category, PrismaClient } from ".prisma/client";
import { SellType } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const categoryTitle = req.body.title as string;
      let categories: Category[] = await prisma.category.findMany({
        where: {
          title: categoryTitle,
        },
      });
      res.status(200).json(categories);
    } catch (err) {
      console.log(err);
    }
  }
}

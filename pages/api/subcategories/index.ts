import { Category, PrismaClient, Subcategory } from ".prisma/client";
import { SellType } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const subcategoryTitle = req.body.title as string;

      let subcategories: Subcategory[] = await prisma.subcategory.findMany({
        where: {
          name: subcategoryTitle,
        },
      });
      res.status(200).json(subcategories);
    } catch (err) {
      console.log(err);
    }
  }
}

import { Item, PrismaClient } from ".prisma/client";
import { SellType } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const itemtype = req.query.sellType as SellType | undefined;
    try {
      let items: Item[] = [];
      if (itemtype) {
        items = await prisma.item.findMany({
          where: {
            sellType: itemtype,
          },
        });
      } else {
        items = await prisma.item.findMany();
      }
      res.status(200).json(items);
    } catch (err) {
      console.log(err);
    }
  }
}

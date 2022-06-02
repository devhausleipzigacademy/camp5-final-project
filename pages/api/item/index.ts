import { Item, PrismaClient } from ".prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { CoffeeMachineItem } from "../../../prisma/models";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const itemBody: typeof CoffeeMachineItem = req.body;
      let item: Item = await prisma.item.create({
        //@ts-ignore
        data: itemBody,
      });
      res.status(200).json(item);
    } catch (err) {
      console.log(err);
    }
  }
}

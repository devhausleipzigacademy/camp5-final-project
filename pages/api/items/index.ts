import { Item, Location, PrismaClient } from ".prisma/client";
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
      let locations: Location[] = []
      if (itemtype) {
        items = await prisma.item.findMany({
          where: {
            sellType: itemtype,
          },
        });
        locations = await prisma.location.findMany() 
      } else {
        items = await prisma.item.findMany();
        locations = await prisma.location.findMany()
      }
      items.forEach(
        if(items[i].userId === ){
          
        }
      )
      // for (let i = 0; i <= items.length; i++) {
        
      //   if (items[i].userId === locations[i].userId)
        
      // }
      res.status(200).json(items);
    } catch (err) {
      console.log(err);
    }
  }
}

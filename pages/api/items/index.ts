import { Item, PrismaClient } from ".prisma/client";
import { SellType } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { MockKitchenCategories } from "../../../utils/types";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        const itemtype = req.query.sellType as SellType | undefined;
        const domainTitle = req.query.domainTitle as string;
        const categoryTitle = req.query.categoryTitle as string;
        try {
            let items: Item[] = [];
            if (itemtype) {
                items = await prisma.item.findMany({
                    where: {
                        sellType: itemtype,
                    },
                });
            }
            if (categoryTitle) {
                items = await prisma.item.findMany({
                    where: {
                        categoryTitle: categoryTitle,
                    },
                });
                // }
                // if (domainTitle) {
                //     items = await prisma.item.findMany({
                //         where: {},
                //     });
            } else {
                items = await prisma.item.findMany();
            }
            res.status(200).json(items);
        } catch (err) {
            console.log(err);
        }
    }
}

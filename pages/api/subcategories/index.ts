import { PrismaClient } from ".prisma/client";
import { SellType } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        try {
            const { subcategoryTitle } = req.query;

            let subcategories = await prisma.item.findMany({
                where: {
                    subcategory: subcategoryTitle as string,
                },
            });
            res.status(200).json(subcategories);
        } catch (err) {
            console.log(err);
        }
    }
}

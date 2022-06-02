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
                data: {
                    ...itemBody,
                    user: {
                        connect: {
                            userId: "b7d7b045-e207-48e7-84d4-4aa48995452b",
                        },
                    },
                },
            });
            res.status(200).json(item);
            res.end();
        } catch (err) {
            console.log(err);
            res.status(500).end();
        }
    }
}

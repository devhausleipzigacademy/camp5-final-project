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
            let item: Item = await prisma.item.create({
                data: {
                    ...req.body,
                },
            });
            res.status(200).json(item);
            res.end();
        } catch (err) {
            console.log(err);
            res.status(500).end();
        }
    }
    if (req.method === "GET") {
        const id = req.query.identifier as string;
        try {
            let item: Item | null;
            if (id) {
                item = await prisma.item.findUnique({
                    where: {
                        identifier: id,
                    },
                });
            } else {
                throw new Error("item not found");
            }
            const data = res.status(200).json(item);
            return data;
        } catch (err) {
            console.log(err);
        }
    }
}

import { Item, PrismaClient } from ".prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { ZodError, z } from "zod";
import { modelDict } from "../../../assets/categories";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        // look up zod doc how to validate data with zod models

        // look up http response code for incorrectly formatted data
        // --> 422

        // endpoint for quering items on domain and nested query to category
        try {
            await saveData(req.body);
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
    if (req.method === "DELETE") {
        const id = req.query.identifier as string;
        try {
            let item: Item | null;
            if (id) {
                item = await prisma.item.delete({
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
async function saveData(
    rawData: any
): Promise<{ success: boolean; errors: any }> {
    //@ts-ignore
    const requestedSubcat = modelDict[rawData.subcategory];
    try {
        if (requestedSubcat === undefined) {
            return { success: false, errors: "subcategory not found" };
        } else {
            //@ts-ignore
            const { data } = requestedSubcat.parse(rawData);
            console.log(data);
        }
    } catch (e) {
        if (e instanceof ZodError) {
            return { success: false, errors: e.flatten() };
        } else {
            throw e;
        }
    }
    return { success: true, errors: null };
}

// endpoints for posting and updating an item
import { Item, PrismaClient } from ".prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { ZodError, z } from "zod";
import {
    modelDict,
    leafPathMap,
    leaves,
} from "../../../assets/class-models-paths";
import { SellType } from "../../../prisma/enums/global";
import { recursiveConnectOrCreate } from "../../../utils/recursiveConnectOrCreate";

const prisma = new PrismaClient();

// VALIDATION INCOMPLETE: request gets denied, when item without subcategoryTitle is posted (category "Other Kitchen Category")

function itemModel(detailsModel: any) {
    return z
        .object({
            details: detailsModel,
            title: z.string(),
            images: z.array(z.string()),
            description: z.string(),

            sellType: SellType,
            class: z.enum(leaves as [string, ...string[]]),
        })
        .strict();
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        //////////////
        /// fix this endpoint
        /// add query param that takes path
        /// and uses it together with 'recursiveConnectOrCreate' function
        /// to properly insert items into 'Item' table
        /////////////

        const queryPath = req.query.path as string;
        // console.log("queryPath: ", queryPath);
        const path = queryPath.split(",");
        const userId = req.query.user as string;

        try {
            const itemData = await saveData(req.body);
            recursiveConnectOrCreate(path, itemData);
            // console.log(itemData);
            let item = await prisma.item.create({
                data: {
                    ...itemData,
                    user: { connect: { identifier: userId } },
                },
            });

            res.status(200).json(item);
        } catch (err) {
            if (err instanceof ZodError) {
                console.log("error: ", err);

                res.status(422).send(err.message);
            } else {
                console.log(err);
                res.status(500).end();
            }
        }
    }
    if (req.method === "PUT") {
        const id = req.query.updateitem as string;
        const recId = req.query.recipient as string;
        const reqArray = req.body as string[];
        try {
            let item: Item | null;
            if (id && !recId) {
                item = await prisma.item.update({
                    where: {
                        identifier: id,
                    },
                    data: {
                        requests: reqArray,
                    },
                });
            } else if (id && recId) {
                item = await prisma.item.update({
                    where: {
                        identifier: id,
                    },
                    data: {
                        gone: true,
                        recipientId: recId,
                    },
                });
            } else {
                res.status(500).send("item not found");
            }
            res.status(200).json(item);
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
                if (item) {
                    res.status(200).json(item);
                } else {
                    res.status(500).send("item not found");
                }
            }
        } catch (err) {
            console.log(err);
            res.status(500).end();
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
                res.status(500).send("item not found");
            }
            res.status(204).end();
        } catch (err) {
            console.log(err);
            res.status(500).end();
        }
    }
}
async function saveData(rawData: any) {
    //@ts-ignore
    const requestedSubcat = modelDict[rawData.class];
    // console.log("Requested Subcategory value: ", requestedSubcat);

    if (requestedSubcat === undefined) {
        // console.log(modelDict);
        // console.log("Requested Subcategory key: ", rawData.subcategory);
        throw new Error("subcategory not found");
    }

    // console.log("raw data: ", rawData);
    const data = itemModel(requestedSubcat).parse(rawData);
    return data;
    // console.log("parse: ", data);
}

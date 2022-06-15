import { Item, PrismaClient } from ".prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

import { ZodError, z } from "zod";
import { modelDict, leafPathMap, allLeafs } from "../../../assets/categories";
import { SellType } from "../../../prisma/enums/global";

const prisma = new PrismaClient();

// VALIDATION INCOMPLETE: request gets denied, when item without subcategoryTitle is posted (category "Other Kitchen Category")

function itemModel(detailsModel: any) {
  return z
    .object({
      details: detailsModel,
      title: z.string(),
      images: z.array(z.string()),
      description: z.string(),
      userId: z.string(),
      sellType: SellType,
      subcategory: z.enum(allLeafs).optional(),
      categoryTitle: z.string().optional(),
    })
    .strict();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // look up http response code for incorrectly formatted data
    // --> 422
    // ERROR HANDLING:

    try {
      let item: Item | undefined = undefined;
      const { success, errors } = await saveData(req.body);
      let subcategory = req.body.subcategory;
      let categoryTitle = req.body.categoryTitle;

      if (categoryTitle && success === false) {
        item = await prisma.item.create({
          data: {
            ...req.body,
            categoryTitle: categoryTitle,
          },
        });
        res.status(200).json(item);
        res.end();
      }
      if (subcategory) {
        item = await prisma.item.create({
          data: {
            ...req.body,
            categoryTitle: leafPathMap[subcategory][1], //assuming that the path only has maximum 2 steps, has to be amended when new domains are added
          },
        });
        res.status(200).json({ item, success, errors });
        res.end();
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log("error: ", err);

        res.status(422).send(JSON.parse(err.message));
      }
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
async function saveData(rawData: any) {
  //@ts-ignore
  const requestedSubcat = modelDict[rawData.subcategory];
  console.log("Requested Subcategory value: ", requestedSubcat);
  try {
    if (requestedSubcat === undefined) {
      // console.log(modelDict);
      // console.log("Requested Subcategory key: ", rawData.subcategory);
      throw new Error(
        JSON.stringify({
          success: false,
          errors: "subcategory not found",
        })
      );
    } else {
      console.log("raw data: ", rawData);
      const data = itemModel(requestedSubcat).parse(rawData);

      console.log("parse: ", data);
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

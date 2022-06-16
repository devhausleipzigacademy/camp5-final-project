import { Item, PrismaClient } from ".prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

import { ZodError, z } from "zod";
import {
  modelDict,
  leafPathMap,
  leaves,
} from "../../../assets/class-models-paths";
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
      class: z.enum(leaves as [string, ...string[]]).optional(),
    })
    .strict();
}

function recursiveConnectOrCreate(path: Array<string>, query = {}, depth = 1) {
  const createObj = { title: path.at(-depth) };
  //@ts-ignore
  query.parent = {
    connectOrCreate: {
      where: { title: path.at(-depth) },
      create: createObj,
    },
  };

  if (depth < path.length) {
    recursiveConnectOrCreate(path, createObj, depth + 1);
  }

  return query;
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

    const queryPath = req.query.param as string;
    console.log("queryPath: ", queryPath);
    const path = queryPath.split("/");

    try {
      let item: Item | undefined = undefined;
      const { success, errors } = await saveData(req.body);
      let itemClass = req.body.class;

      recursiveConnectOrCreate(path, req.body);

      res.status(200).json(item);
      res.end();
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

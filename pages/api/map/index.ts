import { Item, Location, PrismaClient, User } from ".prisma/client";
import { SellType } from "@prisma/client";
import { el } from "date-fns/locale";
import type { NextApiRequest, NextApiResponse } from "next";
import { Feature, MapData } from "../../../utils/types";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const itemtype = req.query.sellType as SellType | undefined;
    try {
      let items: Item[] = [];
      let locations: Location[] = [];
      let users: User[] = [];

      if (itemtype) {
        items = await prisma.item.findMany({
          where: {
            sellType: itemtype,
          },
        });
        locations = await prisma.location.findMany();
        users = await prisma.user.findMany();
      } else {
        items = await prisma.item.findMany();
        locations = await prisma.location.findMany();
        users = await prisma.user.findMany();
      }
      //define a response object
      const data: MapData = {
        type: "FeatureCollection",
        features: [],
      };
      //"fill" response object
      items.forEach((item) => {
        locations.forEach((location) => {
          users.forEach((user) => {
            if (item.userId === location.userId) {
              const featureObject: Feature = {
                type: item.sellType,
                geometry: {
                  type: "Point",
                  coordinates: [location.lon, location.lat],
                },
                properties: {
                  title: item.title,
                  id: item.identifier,
                  owner: user.firstname,
                },
              };
              data.features.push(featureObject);
            }
          });
        });
      });
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
    }
  }
}

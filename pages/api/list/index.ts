import { Item, Location, PrismaClient, User } from ".prisma/client";
import { SellType } from "@prisma/client";
import { el } from "date-fns/locale";
import type { NextApiRequest, NextApiResponse } from "next";
import { imageOptimizer } from "next/dist/server/image-optimizer";
import { Feature, ListData } from "../../../utils/types";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      let items: Item[] = [];
      let locations: Location[] = [];
      let users: User[] = [];

      items = await prisma.item.findMany();
      locations = await prisma.location.findMany();
      users = await prisma.user.findMany();

      //define a response object
      const data: ListData[] = [
        {
          image: "",
          title: "",
          profilePicture: "",
          coordinates: [0, 0],
          sellType: "FREE",
        },
      ];

      //"fill" response object
      items.forEach((item) => {
        locations.forEach((location) => {
          users.forEach((user) => {
            if (
              item.userId === location.userId &&
              item.userId === user.identifier
            ) {
              const listObject: ListData = {
                image: `${
                  item.images ? JSON.parse(item.images as string)[0] : ""
                }`,
                title: item.title,
                profilePicture: `${
                  user.profilePicture ? user.profilePicture : ""
                }`,
                coordinates: [location.lon, location.lat],
                sellType: item.sellType,
              };
              data.push(listObject);
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

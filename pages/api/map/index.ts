// data fetch to populate the map
// excludes immage data
// at some point consolidating list and map data fetches should be considered

import { Item, Location, PrismaClient, User } from ".prisma/client";
import { SellType } from "@prisma/client";

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
                        gone: false,
                    },
                });
                locations = await prisma.location.findMany();
                users = await prisma.user.findMany();
            } else {
                items = await prisma.item.findMany({
                    where: {
                        gone: false,
                    },
                });
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
                        if (
                            item.userId === location.userId &&
                            item.userId === user.identifier
                        ) {
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
                                    class: item.class,
                                    profilePicture: `${
                                        user.profilePicture
                                            ? user.profilePicture
                                            : ""
                                    }`,
                                    image: JSON.parse(
                                        JSON.stringify(item.images)
                                    ),
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

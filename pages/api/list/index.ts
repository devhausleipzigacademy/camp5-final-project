import { Item, Location, PrismaClient, User } from ".prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { Geometry } from "ol/geom";
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
            const data: Feature[] = [];

            //"fill" response object
            items.forEach((item) => {
                locations.forEach((location) => {
                    users.forEach((user) => {
                        if (
                            item.userId === location.userId &&
                            item.userId === user.identifier
                        ) {
                            const listObject: Feature = {
                                type: item.sellType,
                                geometry: {
                                    type: "Point",
                                    coordinates: [location.lon, location.lat],
                                },
                                properties: {
                                    image: JSON.parse(
                                        JSON.stringify(item.images)
                                    ),
                                    title: item.title,
                                    profilePicture: `${
                                        user.profilePicture
                                            ? user.profilePicture
                                            : ""
                                    }`,
                                    owner: user.firstname,
                                    id: item.identifier,
                                    class: item.class,
                                },
                                // image: (item.images as string[])[0],
                                // title: item.title,
                                // profilePicture: `${
                                //   user.profilePicture ? user.profilePicture : ""
                                // }`,
                                // coordinates: [location.lon, location.lat],
                                // sellType: item.sellType,
                                // id: item.identifier,
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

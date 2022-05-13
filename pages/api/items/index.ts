import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json(items);
  }
}

export const items = [
  {
    name: "John",
    age: "21",
  },
  {
    name: "Elton",
    age: "22",
  },
  {
    name: "Elvis",
    age: "21",
  },
  {
    name: "Roger",
    age: "21",
  },
  {
    name: "Simon",
    age: "21",
  },
  {
    name: "Dean",
    age: "21",
  },
];

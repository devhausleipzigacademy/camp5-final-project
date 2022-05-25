import { Category, Item, Location, User, SellType } from "@prisma/client";
import { partialUtil } from "zod/lib/helpers/partialUtil";

type MockData = {
  user: Partial<User>;
  items: Partial<Item>[];
  location: Partial<Location>;
  category: Partial<Category>;
};
export const mockData = [
  {
    user: {
      firstname: "Johannes",
      lastname: "Smith",
      email: "johannes.smith@email.de",
      passwordHash: "effegysdgerzerz",
      passwordSalt: "bnfhjfdjdfjgfj",
      profilePicture:
        "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687",
      rating: 5,
      favorite: ["0"],
    },

    items: [
      {
        title: "Shoe",
        images: [
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170",
        ],
        description: "mint condition, unused",
        sellType: SellType.FREE,
      },
    ],
    category: {
      title: "Shoes",
      description: "Shoes are great for walking",
    },
    location: {
      lat: 51.33573247467917,
      lon: 12.408345798001886,
      address: "Beuchaer Str. 2, 04318 Leipzig",
    },
  },
  {
    user: {
      firstname: "Rolf",
      lastname: "Müller",
      email: "rolf.müller@email.de",
      passwordHash: "asfhdfghfd",
      passwordSalt: "bnfhjfgdfgfddjdfjgfj",
      profilePicture:
        "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170",
      rating: 2,
      favorite: ["2"],
    },
    items: [
      {
        title: "Hat",
        images: [
          "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687",
        ],
        description: "Classic, blue hat",
        sellType: SellType.SWAP,
      },
    ],
    category: {
      title: "Hats",
      description: "Hats are supernice!",
    },
    location: {
      lat: 51.337493607362845,
      lon: 12.40253711886957,
      address: "Anna-Kuhnow-Straße 16, 04317 Leipzig",
    },
  },

  {
    user: {
      firstname: "Peter",
      lastname: "Winston",
      email: "peter.winston@email.de",
      passwordHash: "kuziktz",
      passwordSalt: "aewrsrse",
      profilePicture:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687",
      rating: 1,
      favorite: ["0"],
    },
    items: [
      {
        title: "Boot",
        images: [
          "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687",
        ],
        description: "Bad condition, strongly used",
        sellType: SellType.SWAP,
      },
    ],
    category: {
      title: "Boots",
      description: "Shoes.. but way cooler",
    },
    location: {
      lat: 51.336718632668116,
      lon: 12.406256671762284,
      address: "Kippenbergstraße 28, 04317 Leipzig",
    },
  },
];

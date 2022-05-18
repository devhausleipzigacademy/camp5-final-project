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
      profilePicture: "https://unsplash.com/photos/OhKElOkQ3RE",
      rating: 5,
      favorite: ["0"],
    },

    items: [
      {
        title: "Shoe",
        images: ["https://unsplash.com/photos/164_6wVEHfI"],
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
      profilePicture: "https://unsplash.com/photos/YUu9UAcOKZ4",
      rating: 2,
      favorite: ["2"],
    },
    items: [
      {
        title: "Hat",
        images: ["https://unsplash.com/photos/rr4bawLxOjc"],
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
      profilePicture: "https://unsplash.com/photos/iFgRcqHznqg",
      rating: 1,
      favorite: ["0"],
    },
    items: [
      {
        title: "Boot",
        images: ["https://unsplash.com/photos/esxf7PJmExQ"],
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

  {
    user: {
      firstname: "Petra",
      lastname: "Hurz",
      email: "petra.hurz@email.de",
      passwordHash: "ögfkgf",
      passwordSalt: "asfhfd",
      profilePicture: "https://unsplash.com/photos/mEZ3PoFGs_k",
      rating: 2,
      favorite: ["5"],
    },
    items: [
      {
        title: "Glasses",
        images: ["https://unsplash.com/photos/WeCoLo0Rxp4"],
        description: "One glass is broken, but otherwise good",
        sellType: SellType.SWAP,
      },
    ],
    category: {
      title: "Glasses",
      description: "Have you seen my glasses?",
    },
    location: {
      lat: 51.3357937256552,
      lon: 12.406558419972988,
      address: "Täubchenweg 86, 04317 Leipzig",
    },
  },

  {
    user: {
      firstname: "Simone",
      lastname: "Malz",
      email: "simone.malz@email.de",
      passwordHash: "kogspdfosd",
      passwordSalt: "öojgpodsjgsd",
      profilePicture: "https://unsplash.com/photos/AJIqZDAUD7A",
      rating: 4,
      favorite: ["2"],
    },
    items: [
      {
        title: "Tie",
        images: ["https://unsplash.com/photos/oZFqTBuQw_k"],
        description: "nice animals, only used at wedding",
        sellType: SellType.SWAP,
      },
    ],
    category: {
      title: "Ties",
      description: "For the serious days",
    },
    location: {
      lat: 51.33959900523878,
      lon: 12.40713727722273,
      address: "Lilienstraße 39a, 04315 Leipzig",
    },
  },

  {
    user: {
      firstname: "Ines",
      lastname: "Schwarz",
      email: "ines.schwarz@email.de",
      passwordHash: "gsdgds",
      passwordSalt: "AFHFD",
      profilePicture: "https://unsplash.com/photos/rDEOVtE7vOs",
      rating: 5,
      favorite: ["1"],
    },
    items: [
      {
        title: "Blouse",
        images: ["https://unsplash.com/photos/LLHs1CN-5UU"],
        description: "white, classic",
        sellType: SellType.FREE,
      },
    ],
    category: {
      title: "Blouse",
      description: "We don't know anything about Blouses",
    },
    location: {
      lat: 51.33799145756473,
      lon: 12.401286770922855,
      address: "Heinrichstraße 16, 04317 Leipzig",
    },
  },

  {
    user: {
      firstname: "Aylin",
      lastname: "Yilmaz",
      email: "aylin.yilmaz@email.de",
      passwordHash: "khggb",
      passwordSalt: "sgjzrj",
      profilePicture: "https://unsplash.com/photos/W7b3eDUb_2I",
      rating: 2,
      favorite: ["1"],
    },
    items: [
      {
        title: "Sweatshirt",
        images: ["https://unsplash.com/photos/3G1TJktMQJw"],
        description: "not in a really good condition, black",
        sellType: SellType.FREE,
      },
    ],
    category: {
      title: "Sweatshirt",
      description: "Let's sweat!",
    },
    location: {
      lat: 51.3413036318854,
      lon: 12.406251931287448,
      address: "Hermann-Liebmann-Straße 27, 04315 Leipzig",
    },
  },

  {
    user: {
      firstname: "Alistair",
      lastname: "Fisher",
      email: "alistair.fisher@email.de",
      passwordHash: "gdfgdf",
      passwordSalt: "gdgdf",
      profilePicture: "https://unsplash.com/photos/7YVZYZeITc8",
      rating: 2,
      favorite: ["4"],
    },
    items: [
      {
        title: "Suit",
        images: ["https://unsplash.com/photos/ECJWF1NxSpM"],
        description: "suit including shirt, vest, jacket, trousers and tie",
        sellType: SellType.FREE,
      },
    ],
    category: {
      title: "Suits",
      description: "For the serious days",
    },
    location: {
      lat: 51.339674129638844,
      lon: 12.410080043100086,
      address: "Bernhardstraße 27, 04315 Leipzig",
    },
  },
];

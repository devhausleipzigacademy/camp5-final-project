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

export const stores = {
  type: "FeatureCollection",
  features: [
    {
      type: "Something",
      geometry: {
        type: "Point",
        coordinates: [-77.034084142948, 38.909671288923],
      },
      properties: {
        title: "Old Piano",
        address: "1471 P St NW",
        city: "Washington DC",
        country: "United States",
        crossStreet: "at 15th St NW",
        postalCode: "20005",
        state: "D.C.",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-77.049766, 38.900772],
      },
      properties: {
        title: "Cool Bike",
        address: "2221 I St NW",
        city: "Washington DC",
        country: "United States",
        crossStreet: "at 22nd St NW",
        postalCode: "20037",
        state: "D.C.",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-77.043929, 38.910525],
      },
      properties: {
        title: "Stroller (good as new)",
        address: "1512 Connecticut Ave NW",
        city: "Washington DC",
        country: "United States",
        crossStreet: "at Dupont Circle",
        postalCode: "20036",
        state: "D.C.",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-77.0672, 38.90516896],
      },
      properties: {
        title: "Antique Vase",
        address: "3333 M St NW",
        city: "Washington DC",
        country: "United States",
        crossStreet: "at 34th St NW",
        postalCode: "20007",
        state: "D.C.",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-77.002583742142, 38.887041080933],
      },
      properties: {
        title: "Used Laptop",
        address: "221 Pennsylvania Ave SE",
        city: "Washington DC",
        country: "United States",
        crossStreet: "btwn 2nd & 3rd Sts. SE",
        postalCode: "20003",
        state: "D.C.",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-76.933492720127, 38.99225245786],
      },
      properties: {
        title: "Smartphone",
        address: "8204 Baltimore Ave",
        city: "College Park",
        country: "United States",
        postalCode: "20740",
        state: "MD",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        // coordinates: [-77.097083330154, 38.980979],
        coordinates: [12.407932, 51.330398],
      },
      properties: {
        title: "Box of child clothes",
        address: "4831 Bethesda Ave",
        cc: "US",
        city: "Bethesda",
        country: "United States",
        postalCode: "20814",
        state: "MD",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-77.359425054188, 38.958058116661],
      },
      properties: {
        title: "Set of Winter Tires",
        address: "11935 Democracy Dr",
        city: "Reston",
        country: "United States",
        crossStreet: "btw Explorer & Library",
        postalCode: "20190",
        state: "VA",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-77.10853099823, 38.880100922392],
      },
      properties: {
        title: "Electric Guitar",
        address: "4075 Wilson Blvd",
        city: "Arlington",
        country: "United States",
        crossStreet: "at N Randolph St.",
        postalCode: "22203",
        state: "VA",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-75.28784, 40.008008],
      },
      properties: {
        title: "Powerdrill",
        address: "68 Coulter Ave",
        city: "Ardmore",
        country: "United States",
        postalCode: "19003",
        state: "PA",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-75.20121216774, 39.954030175164],
      },
      properties: {
        title: "A lot of old wooden furniture",
        address: "3925 Walnut St",
        city: "Philadelphia",
        country: "United States",
        postalCode: "19104",
        state: "PA",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-77.043959498405, 38.903883387232],
      },
      properties: {
        title: "A camping wagon",
        address: "1901 L St. NW",
        city: "Washington DC",
        country: "United States",
        crossStreet: "at 19th St",
        postalCode: "20036",
        state: "D.C.",
      },
    },
  ],
};
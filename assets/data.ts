import {
	Category,
	Item,
	User,
	Location,
	SellType,
	Conversation,
} from "@prisma/client";

// these are unused, should be updated or removed
import { MockData, MockKitchenCategories } from "../utils/types";

// export const mockData: MockData[] = [
//     {
//         user: {
//             firstname: "Johannes",
//             lastname: "Smith",
//             email: "johannes.smith@email.de",
//             passwordHash: "effegysdgerzerz",
//             passwordSalt: "bnfhjfdjdfjgfj",
//             profilePicture:
//                 "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687",
//             rating: 2.1,
//             favorite: [],
//         },
//         location: {
//             lat: 51.33573247467917,
//             lon: 12.408345798001886,
//             address: "Beuchaer Str. 2, 04318 Leipzig",
//         },
//         conversations: [],
//         items: [
//             {
//                 title: "Coffee Machine",
//                 images: [
//                     "https://images.unsplash.com/photo-1565452344518-47faca79dc69?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
//                 ],
//                 description:
//                     "My old Coffee Machine. Still working. I have another one now, so if you have something to swap, just let me know!",
//                 details: [],
//                 sellType: SellType.SWAP,
//                 categoryTitle: "Appliances",
//                 subcategory: "Coffee Machines",
//             },
//         ],
//     },
//     {
//         user: {
//             firstname: "Rolf",
//             lastname: "Müller",
//             email: "rolf.mueller@email.de",
//             passwordHash: "rolf.müller@email.de",
//             passwordSalt: "asfhdfghfd",
//             profilePicture:
//                 "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170",
//             rating: 4.5,
//             favorite: [],
//         },
//         location: {
//             lat: 51.337493607362845,
//             lon: 12.40253711886957,
//             address: "Anna-Kuhnow-Straße 16, 04317 Leipzig",
//         },
//         conversations: [],
//         items: [
//             {
//                 title: "Colorful Bowls",
//                 images: [
//                     "https://images.unsplash.com/photo-1567763745030-bfe9c51bec27?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
//                 ],
//                 description:
//                     "I have to many bowls, so I am giving away these three colorful bowls for free. They are nice and big and will be an eyecatcher in every kitchen.",
//                 details: [],
//                 sellType: SellType.FREE,
//                 categoryTitle: "Dishes",
//                 subcategory: "Bowls",
//             },
//         ],
//     },
//     {
//         user: {
//             firstname: "Peter",
//             lastname: "Winston",
//             email: "peter.winston@email.de",
//             passwordHash: "kuziktz",
//             passwordSalt: "aewrsrse",
//             profilePicture:
//                 "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687",
//             rating: 4.9,
//             favorite: [],
//         },
//         location: {
//             lat: 51.324596,
//             lon: 12.377161,
//             address: "Körnerstraße 48, 04107 Leipzig",
//         },
//         conversations: [],
//         items: [
//             {
//                 title: "Toaster",
//                 images: [
//                     "https://images.unsplash.com/photo-1624209190904-aca680ededc1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=793&q=80",
//                 ],
//                 description:
//                     "This toaster is like new. I got this for free, don't need it and so I am giving it away for free, too.",
//                 details: [],
//                 sellType: SellType.FREE,
//                 categoryTitle: "Appliances",
//                 subcategory: "Toasters",
//             },
//         ],
//     },
//     {
//         user: {
//             firstname: "Petra",
//             lastname: "Hurz",
//             email: "petra.hurz@email.de",
//             passwordHash: "ögfkgf",
//             passwordSalt: "asfhfd",
//             profilePicture:
//                 "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687",
//             rating: 5,
//             favorite: [],
//         },
//         location: {
//             lat: 51.321001,
//             lon: 12.345208,
//             address: "Rochlitzstraße 58, 04229 Leipzig",
//         },
//         conversations: [],
//         items: [
//             {
//                 title: "Pots",
//                 images: [
//                     "https://images.unsplash.com/photo-1604414499020-f9ac575bc5ec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
//                 ],
//                 description:
//                     "I need a really good pan, so I am willing to swap my good old pots for that. Feel free to contact me!",
//                 details: [],
//                 sellType: SellType.FREE,
//                 categoryTitle: "Cookware",
//                 subcategory: "Pots",
//             },
//         ],
//     },
//     {
//         user: {
//             firstname: "Simone",
//             lastname: "Malz",
//             email: "simone.malz@email.de",
//             passwordHash: "kogspdfosd",
//             passwordSalt: "öojgpodsjgsd",
//             profilePicture:
//                 "https://images.unsplash.com/photo-1619895862022-09114b41f16f?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170",
//             rating: 2.1,
//             favorite: [],
//         },
//         location: {
//             lat: 51.356643,
//             lon: 12.371356,
//             address: "Ehrensteinstraße 21, 04105 Leipzig",
//         },
//         conversations: [],
//         items: [
//             {
//                 title: "Cup Buddies",
//                 images: [
//                     "https://images.unsplash.com/photo-1611274757139-03ff1736701d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
//                 ],
//                 description:
//                     "I am giving away these two buddies! Got them as a present but they don't really fit into my kitchen. I really need some spoons, so if you have too much spoons at home, I would be happy to swap",
//                 details: [],
//                 sellType: SellType.SWAP,
//                 categoryTitle: "Dishes",
//                 subcategory: "Cups",
//             },
//         ],
//     },
// ];

// export const mockKitchenCategories = {
// 	kitchen: [
// 		{
// 			title: "Appliances",
// 			description: "",
// 			subcategories: [
// 				"Toasters",
// 				"Blenders",
// 				"Coffee Machines",
// 				"Juicers",
// 				"Popcorn Makers",
// 				"Tea Kattles",
// 				"Water Heaters",
// 				"Waffle Makers",
// 				"Other Appliances",
// 			],
// 		},

// 		{
// 			title: "Cookware",
// 			description: "",
// 			subcategories: ["Pots", "Pans", "Forms", "Other Cookware"],
// 		},

// 		{
// 			title: "Cutlery",
// 			description: "",
// 			subcategories: [
// 				"Knives",
// 				"Forks",
// 				"Tea Spoons",
// 				"Soup Spoons",
// 				"Chop Sticks",
// 				"Other Cutlery",
// 			],
// 		},

// 		{
// 			title: "Dishes",
// 			description: "",
// 			subcategories: [
// 				"Plates",
// 				"Mugs",
// 				"Bowls",
// 				"Cups",
// 				"Platters",
// 				"Trays",
// 				"Tea Pots",
// 				"Other Dishes",
// 			],
// 		},
// 		{
// 			title: "Other Kitchen Categories",
// 			description: "",
// 			subcategories: [],
// 		},
// 	],
// };

// export const mockSubCategories = [
// 	"Toasters",
// 	"Blenders",
// 	"Coffee Machines",
// 	"Juicers",
// 	"Popcorn Makers",
// 	"Tea Kattles",
// 	"Water Heaters",
// 	"Waffle Makers",
// 	"Other Appliances",
// ];

export const oldData = [
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

	{
		user: {
			firstname: "Petra",
			lastname: "Hurz",
			email: "petra.hurz@email.de",
			passwordHash: "ögfkgf",
			passwordSalt: "asfhfd",
			profilePicture:
				"https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687",
			rating: 2,
			favorite: ["5"],
		},
		items: [
			{
				title: "Glasses",
				images: [
					"https://images.unsplash.com/photo-1534844978-b859e5a09ad6?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074",
				],
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
			profilePicture:
				"https://images.unsplash.com/photo-1619895862022-09114b41f16f?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170",
			rating: 4,
			favorite: ["2"],
		},
		items: [
			{
				title: "Tie",
				images: [
					"https://images.unsplash.com/photo-1589756823695-278bc923f962?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687",
				],
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
			profilePicture:
				"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170",
			rating: 5,
			favorite: ["1"],
		},
		items: [
			{
				title: "Blouse",
				images: [
					"https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=691",
				],
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
			profilePicture:
				"https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687",
			rating: 2,
			favorite: ["1"],
		},
		items: [
			{
				title: "Sweatshirt",
				images: [
					"https://images.unsplash.com/photo-1572495673508-62a6b369c380?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687",
				],
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
			profilePicture:
				"https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170",
			rating: 2,
			favorite: ["4"],
		},
		items: [
			{
				title: "Suit",
				images: [
					"https://images.unsplash.com/photo-1594938298603-c8148c4dae35?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880",
				],
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

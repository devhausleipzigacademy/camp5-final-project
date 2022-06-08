import {
    Item,
    User,
    Location,
    Category,
    Conversation,
    Subcategory,
} from "@prisma/client";

export type Feature = {
    type: string;
    geometry: Geometry;
    properties: ListData;
};

export type Geometry = {
    type: string;
    coordinates: [number, number];
};

export type Properties = {
    title: string;
    address: string;
    city: string;
    country: string;
    crossStreet: string;
    postalCode: string;
    state: string;
    owner: string;
    productImage: string;
    ownerImage: string;
};

export type MapData = {
    type: string;
    features: Feature[];
};

export type ListData = {
    image?: string;
    title: string;
    profilePicture?: string;
    owner?: string;
    id: string;
};
export type MockData = {
    user: User;
    items: Item[];
    location: Location;
    category: Category;
    conversations: Conversation[];
    domain: string;
};

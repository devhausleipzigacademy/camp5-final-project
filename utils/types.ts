import { User, Location, Category, Conversation } from "@prisma/client";

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
  image: Object;
  title: string;
  profilePicture?: string;
  owner?: string;
  id: string;
};
export type MockData = {
  user: Partial<User>;
  items: Partial<Item[]>;
  location: Partial<Location>;
  conversations: Partial<Conversation[]>;
};

export type Item = {
  identifier: string;
  title: string;
  images: Object;
  description: string;
  user?: string;
  userId?: string;
  sellType: string;
  createdAt: string;
  categoryTitle: string;
  subcategory: string;
  gone: boolean;
  requests: number;
  recipientId?: string | undefined;
};

export type MockKitchenCategories = {
  kitchen: CatObject[];
};

export type CatObject = {
  title: string;
  description: string;
  subcategories: string[];
};

export type User = {
  identifier: string;
  firstname: string;
  lastname: string;
};

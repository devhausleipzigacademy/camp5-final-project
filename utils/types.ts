export type Feature = {
  type: string;
  geometry: Geometry;
  properties: Properties;
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
  coordinates: [number, number];
  sellType: "FREE" | "SWAP";
  owner?: string;
};

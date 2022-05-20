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
};

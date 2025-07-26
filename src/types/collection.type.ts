export interface CollectionType {
  symbol: string;
  name: string;
  image: string;
  description: string;
}

export interface CollectionDetail {
  expiry: number;
  token: {
    tokenAddress: string;
    price: number;
    owner: string;
    name: string;
    image: string;
  };
}

export interface CollectionDetailListConfig {
  offset: number | string;
  limit: number | string;
  max_price?: number | string;
  min_price?: number | string;
  sort_direction?: "asc" | "desc";
}

export interface favoriteNftType {
  tokenAddress?: string;
  price?: number;
  owner?: string;
  name?: string;
  image?: string;
  description?: string;
  collectionName?: string;
}

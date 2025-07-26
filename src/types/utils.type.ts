import { CollectionDetailListConfig } from "./collection.type";

export type QueryConfig = {
  [key in keyof CollectionDetailListConfig]: string;
};

import omitBy from "lodash/omitBy";
import isUndefined from "lodash/isUndefined";
import useQueryParams from "./useQueryParams";
import { CollectionDetailListConfig } from "@/types/collection.type";

export type QueryConfig = {
  [key in keyof CollectionDetailListConfig]: string;
};
const useQueryConfig = () => {
  const queryParams: QueryConfig = useQueryParams();
  const queryConfig: QueryConfig = omitBy(
    {
      offset: queryParams?.offset || "0",
      limit: queryParams?.limit || "20",
      name: queryParams?.name,
      price_max: queryParams?.price_max,
      price_min: queryParams?.price_min,
      type: queryParams?.type,
    },
    isUndefined
  );
  return queryConfig;
};

export default useQueryConfig;

import omitBy from "lodash/omitBy";
import isUndefined from "lodash/isUndefined";
import { QueryConfig } from "@/types/utils.type";

export const handleQueryConfig = (queryParams: QueryConfig) => {
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

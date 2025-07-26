import collectionsApi from "@/apis/collections.api";
import { QueryConfig } from "@/types/utils.type";
import { useQuery } from "@tanstack/react-query";

export const useCollectionsDetailQuery = (
  symbol: string,
  params: QueryConfig
) => {
  return useQuery({
    queryKey: ["collections", params],
    queryFn: () => collectionsApi.getCollectionDetail(symbol, params),
  });
};

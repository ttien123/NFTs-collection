import { CollectionDetail, CollectionType } from "@/types/collection.type";
import { QueryConfig } from "@/types/utils.type";
import http from "@/utils/http";

const URL = "/collections";

const collectionsApi = {
  getCollections() {
    return http.get<CollectionType[]>(`${URL}?limit=20&offset=0`);
  },
  getCollectionDetail(symbol: string, queryConfig: QueryConfig) {
    return http.get<CollectionDetail[]>(`${URL}/${symbol}/listings`, {
      params: queryConfig,
    });
  },
};

export default collectionsApi;

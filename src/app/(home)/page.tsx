import collectionsApi from "@/apis/collections.api";
import { CollectionType } from "@/types/collection.type";
import ListCollections from "./ListCollectons/ListCollections";

const page = async () => {
  let collectionsData: CollectionType[] = [];

  try {
    const collectionList = await collectionsApi.getCollections();
    collectionsData = collectionList.data;
    console.log("Collections fetched successfully:", collectionList);
  } catch (error) {
    console.log("Error fetching collections:", error);
    return <div>Something went wrong</div>;
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-400">
          NFT Collections
        </h1>

        <div>
          <ListCollections collectionsData={collectionsData} />
        </div>
      </div>
    </div>
  );
};

export default page;

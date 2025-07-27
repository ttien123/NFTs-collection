"use client";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useParams } from "next/navigation";
import SearchBar from "../SearchBar/SearchBar";
import Filter from "../Filter/Filter";
import { useCollectionsDetailQuery } from "@/queries/useCollections";
import Loading from "@/components/Loading/Loading";
import Nodata from "@/components/Nodata";
import { useMemo, useState } from "react";
import { TypePriceSchema } from "@/utils/rules";
import { QueryConfig } from "@/types/utils.type";
import useCollectionStore from "@/stores/collection.store";
import defaultImage from "@/assets/images/default-image.webp";

export default function CollectionPage() {
  const params = useParams<{ symbol?: string }>();
  const [searchParams, setSearchParams] = useState<QueryConfig>({
    offset: "0",
    limit: "20",
  });
  const [valueSearch, setValueSearch] = useState<string>("");
  const { setNftSelected } = useCollectionStore();

  const {
    data: collectionDetailData,
    isLoading,
    isFetching,
  } = useCollectionsDetailQuery(params.symbol || "", searchParams);

  const listCollectionFilter = useMemo(() => {
    if (!collectionDetailData) return [];
    if (valueSearch.trim() === "") {
      return collectionDetailData.data;
    }
    return collectionDetailData.data.filter((item) =>
      item.token.name.toLowerCase().includes(valueSearch.toLowerCase())
    );
  }, [collectionDetailData, valueSearch]);

  const handleFilterPrice = (data: TypePriceSchema) => {
    setSearchParams((prev) => {
      let newParams = { ...prev };
      delete newParams.min_price;
      delete newParams.max_price;
      if (data.min_price) {
        newParams = { ...newParams, min_price: data.min_price };
      }
      if (data.max_price) {
        newParams = { ...newParams, max_price: data.max_price };
      }
      return newParams;
    });
  };

  const handleSortDirection = (direction: "asc" | "desc") => {
    setSearchParams((prev) => ({ ...prev, sort_direction: direction }));
  };

  return (
    <main className="max-w-7xl mx-auto">
      {/* Search and Filters */}
      <Card className="mb-8">
        <CardHeader>
          <h2 className="text-2xl font-bold">NFT Marketplace</h2>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search Bar */}
          <SearchBar setValueSearch={setValueSearch} />
          <Separator />
          {/* Filters */}
          <Filter
            handleFilterPrice={handleFilterPrice}
            handleSortDirection={handleSortDirection}
          />
        </CardContent>
      </Card>

      {/* NFT Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {listCollectionFilter.length > 0 &&
          listCollectionFilter.map((nft) => (
            <Link
              href={`/collection/${params.symbol}/address/${nft.token.tokenAddress}`}
              key={nft.token.tokenAddress}
              onClick={() => setNftSelected(nft)}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-square">
                  <Image
                    src={nft.token.image || defaultImage.src}
                    alt={nft.token.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold line-clamp-1 truncate">{nft.token.name}</h3>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      {nft.token.price} ETH
                    </span>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        nft.expiry === -1
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                      }`}
                    >
                      {nft.expiry === -1 ? "Available" : "Expired"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        {listCollectionFilter.length === 0 && (
          <Nodata
            title="No NFTs Found"
            description="This collection has no NFTs."
            extendedClassName="col-span-4 border rounded-lg"
          />
        )}
      </div>
      <Loading isLoading={isLoading || isFetching} />
    </main>
  );
}

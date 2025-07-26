"use client";
import Nodata from "@/components/Nodata";
import { Card, CardContent } from "@/components/ui/card";
import useCollectionStore from "@/stores/collection.store";
import { CollectionType } from "@/types/collection.type";
import defaultImage from "@/assets/images/default-image.webp";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

const ListCollections: FC<{
  collectionsData?: CollectionType[];
}> = ({ collectionsData }) => {
  const { setCollectionSelected } = useCollectionStore();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {collectionsData &&
        collectionsData.map((collection) => (
          <Link
            href={`/collection/${collection.symbol}`}
            key={collection.symbol}
            onClick={() => setCollectionSelected(collection)}
          >
            <Card className="group min-h-[405px] overflow-hidden border-0 bg-gradient-to-br from-gray-800/50 via-gray-800/50 to-gray-900/50 backdrop-blur-sm hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_0_30px_-5px] hover:shadow-indigo-500/30">
              <div className="relative aspect-[4/3] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <Image
                  src={collection.image || defaultImage.src}
                  alt={collection.name}
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute bottom-4 left-4 z-20">
                  <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-indigo-300 transition-colors">
                    {collection.name}
                  </h3>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-sm text-gray-300/80 line-clamp-3 leading-relaxed">
                  {collection.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      {!collectionsData ||
        (collectionsData.length === 0 && (
          <Nodata
            title="No NFTs Found"
            description="This collection has no NFTs."
            extendedClassName="col-span-4 border rounded-lg"
          />
        ))}
    </div>
  );
};

export default ListCollections;

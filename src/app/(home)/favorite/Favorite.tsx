"use client";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import useGetFavoriteList from "@/stores/favorite.store";
import { Heart } from "lucide-react";
import Nodata from "@/components/Nodata";
import defaultImage from "@/assets/images/default-image.webp";

const Favorite = () => {
  const { favoriteList, setFavoriteList } = useGetFavoriteList();

  const handleRemoveFavorite = (tokenAddress: string | undefined) => {
    const newList = favoriteList.filter(
      (item) => item.tokenAddress !== tokenAddress
    );
    setFavoriteList(newList);
  };

  console.log("Favorite List:", favoriteList);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-white">My Favorite NFTs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favoriteList.map((nft, index) => (
          <Card
            key={index}
            className="group relative min-h-[405px] overflow-hidden border-0 bg-gradient-to-br from-gray-800/50 via-gray-800/50 to-gray-900/50 backdrop-blur-sm hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_0_30px_-5px] hover:shadow-indigo-500/30"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <Image
                src={nft?.image || defaultImage.src}
                alt={nft?.description || ""}
                fill
                className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute bottom-4 left-4 z-20">
                <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-indigo-300 transition-colors">
                  {nft?.name || "NFT Name"}
                </h3>
              </div>
            </div>

            {/* Add NFT details section */}
            <div className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Collection</p>
                  <p className="text-white font-medium">
                    {nft?.collectionName || "Unknown Collection"}
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveFavorite(nft.tokenAddress)}
                  className="rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-colors"
                >
                  <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                </button>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-gray-400">Description</p>
                <p className="text-white text-sm line-clamp-2 min-h-[40px]">
                  {nft?.description || "No description available"}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  <p className="text-sm text-gray-400">Price</p>
                  <p className="text-white font-semibold">
                    {nft?.price ? `${nft.price} ETH` : "Not for sale"}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
        {!favoriteList ||
          (favoriteList.length === 0 && (
            <Nodata
              title="No NFTs Found"
              description="You have no favorite NFTs yet."
              extendedClassName="col-span-4 border rounded-lg"
            />
          ))}
      </div>
    </div>
  );
};

export default Favorite;

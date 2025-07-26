"use client";
import { ethers } from "ethers";
import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import ImageProduct from "../../../components/ImageProduct/ImageProduct";
import HistoryTransaction from "../../../components/HistoryTransaction/HistoryTransaction";
import useCollectionStore from "@/stores/collection.store";
import { truncateAddress } from "@/lib/utils";
import useGetFavoriteList from "@/stores/favorite.store";
import { useAccount } from "wagmi";
import ConnectButtonCustom from "@/components/ConnectButtonCustom/ConnectButtonCustom";
import { sellerAddress } from "@/constants/preSellerAddress";
import ModalStep, { MODAL_STEP } from "@/components/ModalStep/ModalStep";
import useTransactionHistoryStore from "@/stores/transactionHistory.store";
import defaultImage from "@/assets/images/default-image.webp";

const NFTDetail = () => {
  const { nftSelected, collectionSelected } = useCollectionStore();
  const { favoriteList, setFavoriteList } = useGetFavoriteList();
  const { transactionInfo, setTransactionInfo } = useTransactionHistoryStore();
  const [stepModal, setStepModal] = useState<MODAL_STEP>(MODAL_STEP.READY);
  const [messageSignContract, setMessageSignContract] = useState<string>("");
  const [txHash, setTxHash] = useState<string>("");

  const { isConnected, address } = useAccount();

  const handleClickFavorite = () => {
    const favoriteNft = {
      ...nftSelected?.token,
      description: collectionSelected?.description || "",
      collectionName: collectionSelected?.name || "",
    };
    setFavoriteList([...favoriteList, favoriteNft]);
  };

  const isFavorite = useMemo(() => {
    return favoriteList.some(
      (item) => item.tokenAddress === nftSelected?.token.tokenAddress
    );
  }, [favoriteList, nftSelected]);

  const handleConfirmPurchase = async () => {
    try {
      setStepModal(MODAL_STEP.PROCESSING);
      setMessageSignContract("Transaction processing...");
      if (!window.ethereum) throw new Error("Some error occurred");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const tx = await signer.sendTransaction({
        to: sellerAddress,
        value: ethers.parseEther(nftSelected?.token.price?.toString() || "0"),
      });
      await tx.wait();
      setStepModal(MODAL_STEP.SUCCESS);
      setTxHash(tx.hash);
      setMessageSignContract("Transaction successful!");
      setTransactionInfo([
        ...transactionInfo,
        {
          hash: tx.hash,
          from: tx.from,
          to: tx.to || "",
          value: ethers.formatEther(tx.value),
          addressNft: nftSelected?.token.tokenAddress || "",
        },
      ]);
    } catch (error) {
      console.log("Error confirming purchase:", error);
      setMessageSignContract("Transaction failed. Please try again.");
      setStepModal(MODAL_STEP.FAILED);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* NFT Image */}
        <Card>
          <CardContent className="p-2">
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <ImageProduct
                src={nftSelected?.token.image || defaultImage.src}
              />
            </div>
          </CardContent>
        </Card>

        {/* NFT Details */}
        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-3xl">
                  {nftSelected?.token.name}
                </CardTitle>
                <CardDescription>
                  From {collectionSelected?.name}
                </CardDescription>
              </div>
              <div className="flex gap-2 items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full p-2"
                  onClick={handleClickFavorite}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={isFavorite ? "#ff69b4" : "none"}
                    stroke={isFavorite ? "#ff69b4" : "currentColor"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-7 h-7"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                  <span className="sr-only">Add to favorites</span>
                </Button>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    nftSelected?.expiry === -1
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                  }`}
                >
                  {nftSelected?.expiry === -1 ? "Available" : "Expired"}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {collectionSelected?.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">Current Owner</h3>
                <p className="text-sm text-muted-foreground">
                  {truncateAddress(nftSelected?.token.owner || "")}
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Price</h3>
                <p className="text-xl font-bold">
                  {nftSelected?.token.price} ETH
                </p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium mb-3">Properties</h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="border col-span-3 md:col-span-1 rounded-lg p-3 text-center">
                  <p className="text-xs text-muted-foreground">Token ID</p>
                  <p className="font-medium">
                    {truncateAddress(
                      nftSelected?.token.tokenAddress || "",
                      4
                    ) || "N/A"}
                  </p>
                </div>
                <div className="border col-span-3 md:col-span-1 rounded-lg p-3 text-center">
                  <p className="text-xs text-muted-foreground">Chain</p>
                  <p className="font-medium">Ethereum</p>
                </div>
                <div className="border col-span-3 md:col-span-1 rounded-lg p-3 text-center">
                  <p className="text-xs text-muted-foreground">
                    Token Standard
                  </p>
                  <p className="font-medium">ERC-721</p>
                </div>
              </div>
            </div>

            <div className="hidden xl:block border-t pt-4">
              <h3 className="font-medium mb-3">Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Views</p>
                  <p className="text-lg font-semibold">1.2K</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Favorites</p>
                  <p className="text-lg font-semibold">45</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="mt-auto">
            <Dialog>
              <DialogTrigger asChild>
                {!isConnected ? (
                  <ConnectButtonCustom extendClassName="w-full" />
                ) : (
                  <Button
                    disabled={stepModal === MODAL_STEP.PROCESSING}
                    className="w-full"
                  >
                    Buy Now
                  </Button>
                )}
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Buy NFT</DialogTitle>
                  <DialogDescription>
                    You are about to purchase {nftSelected?.token.name} for{" "}
                    {nftSelected?.token.price} ETH
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-2 py-4">
                  <div className="flex items-center gap-2">
                    <Label className="w-24">Seller:</Label>
                    <span>{truncateAddress(sellerAddress, 6)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label className="w-24">Buyer:</Label>
                    <span>{truncateAddress(address || "", 6)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label className="w-24">Amount:</Label>
                    <span>{nftSelected?.token.price} ETH</span>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose className="px-4 bg-slate-300 rounded-lg">
                    Cancel
                  </DialogClose>
                  <DialogClose>
                    <Button onClick={handleConfirmPurchase}>
                      Confirm Purchase
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      </div>

      {/* Transaction History */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <HistoryTransaction />
        </CardContent>
      </Card>

      <ModalStep
        open={stepModal !== MODAL_STEP.READY}
        setOpen={setStepModal}
        contentStep={messageSignContract}
        statusStep={stepModal}
        txHash={txHash}
      />
    </div>
  );
};

export default NFTDetail;

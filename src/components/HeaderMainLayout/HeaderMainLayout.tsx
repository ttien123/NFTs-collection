"use client";
import { useEffect } from "react";
import ConnectButtonCustom from "../ConnectButtonCustom/ConnectButtonCustom";
import LogoLink from "./LogoLink";
import Link from "next/link";
import { AiOutlineHeart } from "react-icons/ai";
import { useAccount, useBalance } from "wagmi";
import useWalletInfoStore from "@/stores/walletInfo.store";

const HeaderMainLayout = () => {
  const { address, isConnected, chainId } = useAccount();
  const { data: balance } = useBalance({
    address,
    chainId,
  });
  const { setWalletInfo } = useWalletInfoStore();
  useEffect(() => {
    if (isConnected && address && chainId)
      setWalletInfo({
        address,
        balance: balance?.value.toString() || "0",
        chainId,
      });
  }, [address, isConnected, chainId, balance, setWalletInfo]);
  return (
    <div className="h-[60px] md:h-[80px] border-b mb-8 text-white px-5 shadow-headerMain backdrop-blur-[3px] flex items-center justify-between">
      <div>
        <LogoLink />
      </div>
      <div className="flex items-center justify-end gap-4">
        <Link href="/favorite">
          <div className="flex items-center border border-white gap-2 px-4 py-2 rounded-lg hover:bg-gray-700 duration-300 transition-colors">
            <AiOutlineHeart size={20} />
            <span className="hidden md:inline">Favorites</span>
          </div>
        </Link>
        <ConnectButtonCustom />
      </div>
    </div>
  );
};

export default HeaderMainLayout;

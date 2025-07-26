import { baseOpenGraph } from "@/shared-metadata";
import NFTDetail from "./NFTDetail/NFTDetail";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    openGraph: {
      ...baseOpenGraph,
    },
    alternates: {
      canonical: "/collection/address",
    },
  };
}

export default function page() {
  return (
    <div className="min-h-screen p-8">
      <NFTDetail />
    </div>
  );
}

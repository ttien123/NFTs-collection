import React from "react";
import Favorite from "./Favorite";
import { Metadata } from "next";
import { baseOpenGraph } from "@/shared-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return {
    openGraph: {
      ...baseOpenGraph,
    },
    alternates: {
      canonical: "/favorite",
    },
  };
}

const page = () => {
  return (
    <div>
      <Favorite />
    </div>
  );
};

export default page;

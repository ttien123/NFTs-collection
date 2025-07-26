import { baseOpenGraph } from "@/shared-metadata";
import CollectionPage from "./components/CollectionPage/CollectionPage";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    openGraph: {
      ...baseOpenGraph,
    },
    alternates: {
      canonical: "/collection",
    },
  };
}

const page = () => {
  return (
    <div className="min-h-screen p-8">
      <CollectionPage />
    </div>
  );
};

export default page;

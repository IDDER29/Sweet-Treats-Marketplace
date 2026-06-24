import type { Metadata } from "next";
import StoresDirectory from "./StoresDirectory";

export const metadata: Metadata = {
  title: "Browse Stores",
  description:
    "Discover local bakeries and dessert shops on Sweet Treats Marketplace.",
};

export default function StoresPage() {
  return <StoresDirectory />;
}

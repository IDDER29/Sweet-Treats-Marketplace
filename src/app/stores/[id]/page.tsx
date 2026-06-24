import type { Metadata } from "next";
import StoreDetail from "./StoreDetail";

export const metadata: Metadata = {
  title: "Store",
  description: "Browse products from this store on Sweet Treats Marketplace.",
};

export default function Page({ params }: { params: { id: string } }) {
  return <StoreDetail id={params.id} />;
}

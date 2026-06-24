import type { Metadata } from "next";
import { Suspense } from "react";
import ProductDetailsPage from "@/components/ProductDetailsPage3";
import { LoadingState } from "@/components/feedback/LoadingState";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
  try {
    const res = await fetch(`${apiUrl}/products/${params.id}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error("Not found");
    const product = await res.json();
    const name = product?.name ?? "Product";
    const description = product?.description ?? "Order from Sweet Treats Marketplace";
    const image = product?.images?.[0]?.url;
    return {
      title: name,
      description,
      openGraph: {
        title: name,
        description,
        images: image ? [{ url: image }] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: name,
        description,
        images: image ? [image] : [],
      },
    };
  } catch {
    return { title: "Product" };
  }
}

export default function Page({ params }: { params: { id: string } }) {
  return (
    <Suspense
      fallback={<LoadingState className="container mx-auto px-4 py-8" />}
    >
      <ProductDetailsPage id={params.id} />
    </Suspense>
  );
}

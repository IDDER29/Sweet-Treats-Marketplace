import { Suspense } from "react";
import ProductDetailsPage from "@/components/ProductDetailsPage3";
import { LoadingState } from "@/components/feedback/LoadingState";

// Dynamic product route: /product/<id>. The legacy /product?id=<id> route
// still works; product links now use this cleaner path.
export default function Page({ params }: { params: { id: string } }) {
  return (
    <Suspense
      fallback={<LoadingState className="container mx-auto px-4 py-8" />}
    >
      <ProductDetailsPage id={params.id} />
    </Suspense>
  );
}

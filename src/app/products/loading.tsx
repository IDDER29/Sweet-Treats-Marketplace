import { LoadingState } from "@/components/feedback/LoadingState";

export default function ProductsLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-6" />
      <div className="flex gap-8">
        <div className="hidden sm:block w-56 shrink-0">
          <div className="rounded-xl border p-5 space-y-4">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="h-6 bg-gray-100 rounded animate-pulse" />
            ))}
          </div>
        </div>
        <div className="flex-1">
          <LoadingState rows={6} />
        </div>
      </div>
    </div>
  );
}

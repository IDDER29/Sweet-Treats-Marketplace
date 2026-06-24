import { LoadingState } from "@/components/feedback/LoadingState";

export default function StoresLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="h-8 w-56 bg-gray-200 rounded animate-pulse mb-6" />
      <LoadingState rows={6} />
    </div>
  );
}

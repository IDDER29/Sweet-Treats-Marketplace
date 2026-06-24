import { LoadingState } from "@/components/feedback/LoadingState";
export default function Loading() {
  return <div className="container mx-auto px-4 py-8"><LoadingState rows={4} /></div>;
}

import Link from "next/link";
import { CakeSlice } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-amber-50/30 flex flex-col items-center justify-center px-4 py-20">
      {/* Decorative dashed ring */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border-2 border-dashed border-amber-200/60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-dotted border-orange-100/50" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
        {/* Animated icon */}
        <div className="mb-4 w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center shadow-md animate-bounce">
          <CakeSlice className="w-10 h-10 text-amber-600" strokeWidth={1.5} />
        </div>

        {/* Giant 404 */}
        <p className="text-8xl font-black bg-gradient-to-br from-amber-400 to-orange-600 bg-clip-text text-transparent leading-none mb-6 select-none">
          404
        </p>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">
          This page got eaten!
        </h1>

        <p className="text-muted-foreground text-base leading-relaxed mb-10">
          Looks like this sweet treat doesn&apos;t exist. It may have been moved, renamed, or
          enjoyed by someone else.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          <Button
            size="lg"
            asChild
            className="bg-amber-500 hover:bg-amber-600 text-white px-8 rounded-full font-semibold shadow-md"
          >
            <Link href="/">Go home</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="border-amber-300 text-amber-700 hover:bg-amber-100 px-8 rounded-full font-semibold"
          >
            <Link href="/products">Browse treats</Link>
          </Button>
        </div>

        {/* Small links row */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/products" className="hover:text-amber-600 transition-colors">
            Products
          </Link>
          <span className="text-amber-300">&middot;</span>
          <Link href="/stores" className="hover:text-amber-600 transition-colors">
            Stores
          </Link>
          <span className="text-amber-300">&middot;</span>
          <Link href="/contact" className="hover:text-amber-600 transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}

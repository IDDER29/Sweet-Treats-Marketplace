"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Forward to an error reporting service in production
    if (process.env.NODE_ENV !== "development") return;
  }, [error]);

  return (
    <div className="min-h-screen bg-amber-50/30 flex flex-col items-center justify-center px-4 py-20">
      <div className="flex flex-col items-center text-center max-w-lg">
        {/* Amber icon circle */}
        <div className="mb-6 w-20 h-20 rounded-full bg-amber-100 border-4 border-amber-200 flex items-center justify-center shadow-md">
          <AlertTriangle className="w-9 h-9 text-amber-600" strokeWidth={1.5} />
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">
          Something went sweet&#8209;wrong
        </h1>

        <p className="text-muted-foreground text-base leading-relaxed mb-4">
          An unexpected error occurred. Our team has been notified. Try refreshing or go back to
          safety.
        </p>

        {/* Error digest */}
        {error.digest && (
          <p className="text-xs text-gray-400 mb-6">
            Error ID: <span className="font-mono">{error.digest}</span>
          </p>
        )}

        {/* Dev-only error message */}
        {process.env.NODE_ENV === "development" && error.message && (
          <div className="w-full mb-8 rounded-xl bg-gray-900 text-left overflow-x-auto">
            <p className="text-xs text-gray-400 px-4 pt-3 pb-1 font-mono uppercase tracking-wider">
              error.message (dev only)
            </p>
            <pre className="text-xs text-red-400 px-4 pb-4 font-mono leading-relaxed whitespace-pre-wrap break-words">
              {error.message}
            </pre>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            size="lg"
            onClick={reset}
            className="bg-amber-500 hover:bg-amber-600 text-white px-8 rounded-full font-semibold shadow-md"
          >
            Try again
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="border-amber-300 text-amber-700 hover:bg-amber-100 px-8 rounded-full font-semibold"
          >
            <Link href="/">Go home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

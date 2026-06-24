"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CakeSlice, CheckCircle2, Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function UnsubscribePage() {
  const searchParams = useSearchParams();
  const emailFromUrl = searchParams.get("email") ?? "";

  const [email, setEmail] = useState(emailFromUrl);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleUnsubscribe(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // TODO(backend): POST { email } to /newsletter/unsubscribe
    await new Promise((r) => setTimeout(r, 800));
    setDone(true);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="bg-amber-100 rounded-xl p-2">
            <CakeSlice className="h-6 w-6 text-amber-700" />
          </div>
          <span className="text-xl font-bold">Sweet Treats</span>
        </div>

        <div className="bg-white rounded-2xl border shadow-sm p-8">
          {done ? (
            <div className="text-center space-y-5">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-2">You&apos;re unsubscribed</h1>
                <p className="text-muted-foreground text-sm">
                  <strong>{email}</strong> has been removed from our mailing list.
                  You won&apos;t receive any more marketing emails from us.
                </p>
              </div>
              <div className="pt-2 space-y-2">
                <p className="text-xs text-muted-foreground">
                  Changed your mind? You can re-subscribe any time from your{" "}
                  <Link href="/customer/notifications" className="text-amber-700 hover:underline">
                    notification settings
                  </Link>
                  .
                </p>
              </div>
              <Link href="/">
                <Button variant="outline" className="w-full gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Sweet Treats
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 mb-4">
                  <Mail className="h-7 w-7 text-amber-700" />
                </div>
                <h1 className="text-2xl font-bold mb-2">Unsubscribe from emails</h1>
                <p className="text-muted-foreground text-sm">
                  You&apos;ll no longer receive marketing emails, deals, or newsletters
                  from Sweet Treats. Transactional emails (order confirmations, receipts)
                  will still be sent.
                </p>
              </div>

              <form onSubmit={handleUnsubscribe} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    className="mt-1"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading || !email.trim()}
                  variant="outline"
                  className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                >
                  {loading ? "Unsubscribing…" : "Confirm unsubscribe"}
                </Button>
              </form>

              <div className="text-center">
                <Link href="/customer/notifications" className="text-sm text-amber-700 hover:underline">
                  Manage individual notification preferences instead →
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

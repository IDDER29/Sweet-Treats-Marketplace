import Link from "next/link";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative h-[560px] flex items-center justify-center text-center text-white overflow-hidden">
      {/* Warm gradient background — swap for a real hero image when available */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-amber-900 via-orange-800 to-rose-900" />
      {/* Subtle noise overlay for depth */}
      <div className="absolute inset-0 z-10 bg-black/25" />
      <div className="relative z-20 max-w-3xl mx-auto px-6">
        <p className="text-amber-200 text-sm font-semibold uppercase tracking-widest mb-4">
          Fresh · Local · Delivered
        </p>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Discover the Best Local Bakeries Near You
        </h1>
        <p className="text-lg md:text-xl mb-10 text-white/80 max-w-xl mx-auto">
          Freshly baked goods and sweet treats from artisanal local bakeries,
          delivered to your door.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" asChild className="bg-white text-amber-900 hover:bg-amber-50 font-semibold px-8">
            <Link href="/products">Browse Products</Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10 px-8">
            <Link href="/auth/register">Start Selling</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

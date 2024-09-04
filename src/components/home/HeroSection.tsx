import Image from "next/image";
import { Button } from "@/components/ui/button";
const HeroSection = () => {
  return (
    <section className="relative h-[500px] flex items-center justify-center text-center text-white">
      <Image
        src="/placeholder.svg?height=500&width=1200"
        alt="Delicious baked goods"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
      <div className="relative z-20 max-w-3xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Discover the Best Local Bakeries and Sweets Near You!
        </h1>
        <p className="text-xl mb-8">
          Indulge in freshly baked goods and sweet treats from artisanal local
          bakeries.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg">Browse Products</Button>
          <Button size="lg" variant="outline">
            Sign Up
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

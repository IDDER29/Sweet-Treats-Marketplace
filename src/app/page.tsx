import Link from "next/link";
import type { Metadata } from "next";
import { ShoppingBag, Store, Truck, Star, ChefHat, Heart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import HeroSection from "@/components/home/HeroSection";
import FeaturedProductsSection from "@/components/home/FeaturedProductsSection";
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import { PRODUCT_CATEGORIES } from "@/config";

export const metadata: Metadata = {
  title: "Sweet Treats Marketplace — Fresh Local Bakeries",
  description:
    "Discover cakes, pastries, cookies, and sweet treats from artisanal local bakeries delivered to your door.",
};

const CATEGORY_ICONS: Record<string, string> = {
  Bread: "🍞",
  Pastry: "🥐",
  Cake: "🎂",
  Cookie: "🍪",
  Donut: "🍩",
  Other: "🍬",
};

function CategoryBrowseSection() {
  return (
    <section className="py-16 md:py-20 bg-amber-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-2">
            Browse by Category
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900">
            What are you craving?
          </h2>
          <p className="mt-3 text-amber-700/70 max-w-md mx-auto">
            From flaky croissants to towering birthday cakes — find exactly what you&apos;re looking for.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {PRODUCT_CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/products?category=${encodeURIComponent(cat)}`}
              className="group flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-amber-200 shadow-sm hover:border-amber-400 hover:bg-amber-100 hover:shadow-md transition-all duration-200 text-amber-800 font-medium text-sm md:text-base"
            >
              <span className="text-xl">{CATEGORY_ICONS[cat] ?? "🍰"}</span>
              <span>{cat}</span>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/products"
            className="text-amber-600 hover:text-amber-800 font-semibold text-sm underline underline-offset-4"
          >
            View all products &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

const HOW_IT_WORKS_STEPS = [
  {
    icon: ShoppingBag,
    step: "01",
    title: "Browse & Discover",
    description:
      "Explore hundreds of freshly baked products from artisanal local bakeries. Filter by category, dietary needs, or store.",
    color: "bg-amber-100 text-amber-700",
    border: "border-amber-200",
  },
  {
    icon: Store,
    step: "02",
    title: "Place Your Order",
    description:
      "Add your favourite treats to the cart, choose a delivery time, and check out securely in minutes.",
    color: "bg-orange-100 text-orange-700",
    border: "border-orange-200",
  },
  {
    icon: Truck,
    step: "03",
    title: "Enjoy Fresh Delivery",
    description:
      "Your order is freshly prepared and delivered right to your door. Track it in real time every step of the way.",
    color: "bg-rose-100 text-rose-700",
    border: "border-rose-200",
  },
];

function HowItWorksSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-2">
            Simple as 1 - 2 - 3
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            How Sweet Treats Works
          </h2>
          <p className="mt-3 text-gray-500 max-w-md mx-auto">
            From local bakery shelf to your table in three easy steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 relative">
          {/* Connector line (desktop only) */}
          <div className="hidden md:block absolute top-14 left-1/4 right-1/4 h-px bg-gradient-to-r from-amber-200 via-orange-200 to-rose-200" />

          {HOW_IT_WORKS_STEPS.map(({ icon: Icon, step, title, description, color, border }) => (
            <div key={step} className="flex flex-col items-center text-center">
              <div className={`relative w-24 h-24 rounded-2xl border-2 ${border} ${color} flex items-center justify-center mb-6 shadow-sm`}>
                <Icon className="w-10 h-10" strokeWidth={1.5} />
                <span className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center text-xs font-bold text-gray-400 shadow-sm">
                  {step}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
              <p className="text-gray-500 leading-relaxed max-w-xs">{description}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Button size="lg" asChild className="bg-amber-500 hover:bg-amber-600 text-white px-10 font-semibold rounded-full shadow-md">
            <Link href="/products">Start Shopping</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function JoinAsSellerSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-amber-900 via-orange-800 to-rose-900 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/5" />
      <div className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full bg-white/5" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-amber-200 text-sm font-semibold">
              <ChefHat className="w-4 h-4" />
              For Bakery Owners &amp; Sellers
            </div>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Bring Your Bakes to Thousands of Sweet Lovers
          </h2>
          <p className="text-lg text-white/75 mb-10 max-w-xl mx-auto leading-relaxed">
            Join our growing community of local bakeries and dessert shops. Set up your storefront
            in minutes, reach customers in your city, and grow your business with zero fuss.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-12 text-sm text-amber-100">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-300" fill="currentColor" />
              No monthly fees
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-300" />
              50,000+ active customers
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-amber-300" />
              200+ bakeries trust us
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              asChild
              className="bg-white text-amber-900 hover:bg-amber-50 font-semibold px-8 rounded-full shadow-lg"
            >
              <Link href="/auth/register">Open Your Store Today</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-white/50 text-white hover:bg-white/10 px-8 rounded-full"
            >
              <Link href="/about">Learn More About Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <CategoryBrowseSection />
      <FeaturedProductsSection />
      <HowItWorksSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <JoinAsSellerSection />
    </div>
  );
}

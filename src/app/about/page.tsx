import type { Metadata } from "next";
import Link from "next/link";
import { Heart, Leaf, Star, MapPin, ShoppingBag, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "About Us — Sweet Treats Marketplace",
  description:
    "Learn about the story, values, and mission behind Sweet Treats Marketplace — connecting sweet lovers with the best local bakeries.",
};

const STATS = [
  { value: "5", label: "Cities Served", icon: MapPin },
  { value: "200+", label: "Local Bakeries", icon: ShoppingBag },
  { value: "50k+", label: "Orders Delivered", icon: Award },
  { value: "98%", label: "Happy Customers", icon: Heart },
];

const VALUES = [
  {
    icon: Star,
    title: "Quality First",
    description:
      "Every bakery on our platform is vetted for quality, hygiene, and consistency. We believe you deserve nothing but the best.",
    bg: "bg-amber-50",
    iconColor: "text-amber-600",
    border: "border-amber-100",
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "We champion local bakers and dessert artisans, helping them reach more customers and grow sustainable businesses.",
    bg: "bg-orange-50",
    iconColor: "text-orange-600",
    border: "border-orange-100",
  },
  {
    icon: Leaf,
    title: "Always Fresh",
    description:
      "Our bakers prepare orders fresh to order. No stale shelves — just warm, delicious treats made with love.",
    bg: "bg-rose-50",
    iconColor: "text-rose-600",
    border: "border-rose-100",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="relative py-24 md:py-36 flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900 via-orange-800 to-rose-900" />
        <div className="absolute inset-0 bg-black/20" />
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-amber-500/10 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-rose-500/10 translate-x-1/3 translate-y-1/3" />

        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <p className="text-amber-200 font-semibold text-sm uppercase tracking-widest mb-4">
            Our Story
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            About Sweet Treats<br className="hidden md:block" /> Marketplace
          </h1>
          <p className="text-lg md:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed">
            We started with a simple idea: make it effortless for everyone to enjoy the freshest, most
            delicious sweet treats from the talented bakers right in their own community.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-3">
                How We Started
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Born from a love of local baking
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Sweet Treats Marketplace was founded by a small team of food enthusiasts who kept
                  asking the same question: why is it so hard to find and order from the amazing bakeries
                  and dessert shops right around the corner?
                </p>
                <p>
                  We built this platform to solve that — a single, beautiful marketplace where customers
                  can discover local bakeries, browse their menus, and get fresh-baked goods delivered
                  right to their door.
                </p>
                <p>
                  For bakery owners, we remove the technical burden. List your products, manage orders,
                  and grow your customer base without needing a website or delivery team of your own.
                </p>
              </div>
            </div>

            {/* Stats card */}
            <div>
              <Card className="border-amber-100 shadow-lg rounded-3xl overflow-hidden">
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8">
                  <h3 className="text-xl font-bold text-amber-900 mb-8 text-center">
                    Sweet Treats by the Numbers
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                    {STATS.map(({ value, label, icon: Icon }) => (
                      <div key={label} className="text-center">
                        <div className="flex justify-center mb-2">
                          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-amber-700" />
                          </div>
                        </div>
                        <p className="text-3xl font-bold text-amber-800">{value}</p>
                        <p className="text-sm text-amber-600 font-medium mt-0.5">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Separator className="bg-amber-50" />

      {/* Our Values */}
      <section className="py-16 md:py-24 bg-amber-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-2">
              What We Stand For
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Values</h2>
            <p className="mt-3 text-gray-500 max-w-md mx-auto">
              Three principles guide every decision we make as a marketplace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUES.map(({ icon: Icon, title, description, bg, iconColor, border }) => (
              <Card
                key={title}
                className={`border ${border} rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300`}
              >
                <CardContent className={`p-8 ${bg}`}>
                  <div className={`w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-5 shadow-sm`}>
                    <Icon className={`w-7 h-7 ${iconColor}`} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
                  <p className="text-gray-600 leading-relaxed">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 bg-gradient-to-br from-amber-900 via-orange-800 to-rose-900 rounded-3xl overflow-hidden shadow-2xl">
              <CardContent className="p-10 md:p-16 text-center text-white">
                <p className="text-amber-200 font-semibold text-sm uppercase tracking-widest mb-6">
                  Our Mission
                </p>
                <blockquote className="text-2xl md:text-4xl font-bold leading-snug mb-6">
                  &ldquo;To make every neighbourhood&apos;s sweetest secrets accessible to everyone — one
                  delicious delivery at a time.&rdquo;
                </blockquote>
                <p className="text-white/70 text-lg max-w-xl mx-auto">
                  We exist to celebrate local bakers, strengthen communities, and bring more joy to
                  people&apos;s everyday moments through extraordinary sweets.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team / Community CTA */}
      <section className="py-16 md:py-24 bg-amber-50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Be Part of the Story
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">
            Join Our Sweet Community
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-10 text-lg leading-relaxed">
            Whether you&apos;re here to discover amazing treats or to share your baking talent with the
            world, there&apos;s a place for you at Sweet Treats Marketplace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              asChild
              className="bg-amber-500 hover:bg-amber-600 text-white px-10 rounded-full font-semibold shadow-md"
            >
              <Link href="/products">Browse Products</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-amber-300 text-amber-700 hover:bg-amber-100 px-10 rounded-full font-semibold"
            >
              <Link href="/auth/register">Become a Seller</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

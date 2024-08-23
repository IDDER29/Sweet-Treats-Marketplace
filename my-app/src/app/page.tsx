import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SearchIcon, ShoppingCartIcon, UserIcon } from "lucide-react";
const featuredProducts = [
  {
    id: 1,
    name: "Chocolate Cake",
    description: "Rich and moist chocolate cake",
    price: "$25.99",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Strawberry Tart",
    description: "Fresh strawberries on a creamy base",
    price: "$18.99",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Macarons Set",
    description: "Assorted flavors of French macarons",
    price: "$15.99",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Cinnamon Rolls",
    description: "Soft and gooey cinnamon rolls",
    price: "$12.99",
    image: "/placeholder.svg?height=200&width=200",
  },
];

const testimonials = [
  {
    id: 1,
    text: "The quality of the pastries is amazing! I love supporting local bakeries.",
    author: "Sarah M.",
  },
  {
    id: 2,
    text: "This platform has helped my small bakery reach so many new customers!",
    author: "John D., Sweet Treats Bakery",
  },
  {
    id: 3,
    text: "Ordering is so easy, and the delivery is always on time. Highly recommend!",
    author: "Emily L.",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">LocalEats</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium ml-auto">
            <Link href="/">Home</Link>
            <Link href="/products">Products</Link>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/login">
              <UserIcon className="h-5 w-5" />
            </Link>
            <Link href="/cart">
              <ShoppingCartIcon className="h-5 w-5" />
            </Link>
          </nav>
        </div>
      </header>
      {/* Hero Section */}
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

      {/* Featured Products Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-muted-foreground mb-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">{product.price}</span>
                    <Button size="sm">Add to Cart</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <svg
                  className="w-12 h-12 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Support Local Businesses
              </h3>
              <p className="text-muted-foreground">
                Help your community thrive by supporting local bakeries and
                artisans.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <svg
                  className="w-12 h-12 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Freshly Made by Artisans
              </h3>
              <p className="text-muted-foreground">
                Enjoy high-quality, freshly baked goods made with passion and
                expertise.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <svg
                  className="w-12 h-12 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Easy Delivery Options
              </h3>
              <p className="text-muted-foreground">
                Convenient delivery right to your doorstep, ensuring freshness
                and quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-muted">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    <Star className="text-yellow-400 fill-current" />
                    <Star className="text-yellow-400 fill-current" />
                    <Star className="text-yellow-400 fill-current" />
                    <Star className="text-yellow-400 fill-current" />
                    <Star className="text-yellow-400 fill-current" />
                  </div>
                  <p className="mb-4 italic">"{testimonial.text}"</p>
                  <p className="font-semibold">- {testimonial.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4">About Us</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Shipping & Returns
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
              <p className="text-muted-foreground mb-4">
                Stay updated with our latest offers and products.
              </p>
              <form className="flex">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="rounded-r-none"
                />
                <Button type="submit" className="rounded-l-none">
                  Subscribe
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-muted-foreground/20 text-center text-muted-foreground">
            <p>&copy; 2023 Local Bakery Marketplace. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

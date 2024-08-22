import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SearchIcon, ShoppingCartIcon, UserIcon } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col  ">
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

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[600px] flex items-center justify-center text-center text-white">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/placeholder.svg?height=600&width=1200')",
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="relative z-10 space-y-4">
            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
              Welcome to LocalEats
            </h1>
            <p className="text-xl sm:text-2xl">
              Discover fresh, local produce at your fingertips
            </p>
            <div className="flex justify-center space-x-4">
              <Button size="lg">Shop Now</Button>
              <Button size="lg" variant="outline">
                Sign Up for Business
              </Button>
            </div>
          </div>
        </section>

        {/* Search Bar */}
        <section className="container mx-auto mt-8">
          <div className="relative">
            <SearchIcon className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
            <Input className="pl-8" placeholder="Search for products..." />
          </div>
        </section>

        {/* Categories Section */}
        <section className="container mx-auto mt-12">
          <h2 className="text-2xl font-bold mb-4">Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {["Bakery", "Produce", "Dairy", "Meat", "Seafood", "Pantry"].map(
              (category) => (
                <Card
                  key={category}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-4 text-center">
                    <div className="w-16 h-16 mx-auto mb-2 bg-muted rounded-full flex items-center justify-center">
                      {/* Replace with actual category icons */}
                      <span className="text-2xl">🍎</span>
                    </div>
                    <h3 className="font-medium">{category}</h3>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        </section>

        {/* Featured Products Carousel */}
        <section className="container mx-auto mt-12">
          <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
          <Carousel className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
            <CarouselContent>
              {[1, 2, 3, 4, 5].map((product) => (
                <CarouselItem key={product}>
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <div className="text-center">
                        <img
                          src={`/placeholder.svg?height=200&width=200&text=Product+${product}`}
                          alt={`Product ${product}`}
                          className="mx-auto mb-4 rounded-md"
                        />
                        <h3 className="font-medium mb-2">Product {product}</h3>
                        <p className="text-muted-foreground mb-4">$9.99</p>
                        <Button>Add to Cart</Button>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>

        {/* Testimonials */}
        <section className="container mx-auto mt-12 mb-12">
          <h2 className="text-2xl font-bold mb-4">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Alice Johnson",
                role: "Customer",
                text: "LocalEats has transformed how I shop for groceries. The produce is always fresh and I love supporting local businesses!",
              },
              {
                name: "Bob Smith",
                role: "Business Owner",
                text: "As a small farm owner, LocalEats has given me a platform to reach more customers than I ever could on my own.",
              },
              {
                name: "Carol Davis",
                role: "Customer",
                text: "The variety of local products available is amazing. It's like having a farmer's market at my fingertips every day!",
              },
            ].map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-muted mr-4"></div>
                    <div>
                      <h3 className="font-medium">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{testimonial.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-muted py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">About Us</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about">Our Story</Link>
                </li>
                <li>
                  <Link href="/team">Our Team</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/contact">Get in Touch</Link>
                </li>
                <li>
                  <Link href="/support">Support</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/terms">Terms of Service</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {/* Replace with actual social media icons */}
                <a href="#" className="text-foreground hover:text-primary">
                  FB
                </a>
                <a href="#" className="text-foreground hover:text-primary">
                  TW
                </a>
                <a href="#" className="text-foreground hover:text-primary">
                  IG
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            © 2023 LocalEats. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}

import HeroSection from "@/components/home/HeroSection";
import FeaturedProductsSection from "@/components/home/FeaturedProductsSection";
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import React from "react";
import { Search, Menu, ShoppingCart, Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function HomePage() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <HeroSection />

        {/* Featured Products Section */}
        <FeaturedProductsSection />

        {/* Why Choose Us Section */}
        <WhyChooseUsSection />

        {/* Testimonials Section */}
        <TestimonialsSection />
      </div>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            <div className="mr-4 hidden md:flex">
              <a className="mr-6 flex items-center space-x-2" href="#">
                <span className="hidden font-bold sm:inline-block">LOGO</span>
              </a>
              <nav className="flex items-center space-x-6 text-sm font-medium">
                <a
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                  href="#"
                >
                  Home
                </a>
                <a
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                  href="#"
                >
                  Products
                </a>
                <a
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                  href="#"
                >
                  About
                </a>
                <a
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                  href="#"
                >
                  Contact
                </a>
              </nav>
            </div>
            <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
              <div className="w-full flex-1 md:w-auto md:flex-none">
                <Input
                  className="w-full md:w-[300px]"
                  placeholder="Search..."
                  type="search"
                />
              </div>
              <Button size="icon" variant="ghost">
                <ShoppingCart className="h-4 w-4" />
                <span className="sr-only">Shopping cart</span>
              </Button>
              <Button size="icon" variant="ghost">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <section className="mb-12">
            <div className="rounded-lg bg-gray-100 p-8">
              <h1 className="mb-4 text-4xl font-bold">
                Welcome to Our Bakery Marketplace
              </h1>
              <p className="mb-6 text-lg">
                Discover the best local bakeries and sweet treats in your area.
              </p>
              <Button>Explore Now</Button>
            </div>
          </section>

          {/* Categories */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">Categories</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
              {["Cakes", "Bread", "Pastries", "Cookies", "Donuts"].map(
                (category) => (
                  <Button key={category} variant="outline" className="h-20">
                    {category}
                  </Button>
                )
              )}
            </div>
          </section>

          {/* Top Product Sales */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">Top Product Sales</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <Card key={item}>
                  <CardContent className="p-4">
                    <div className="aspect-square bg-gray-200 mb-2"></div>
                    <h3 className="font-semibold">Product {item}</h3>
                    <p className="text-sm text-gray-500">$XX.XX</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Top Bakeries */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">Top Bakeries</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Card key={item}>
                  <CardContent className="p-4">
                    <div className="aspect-video bg-gray-200 mb-2"></div>
                    <h3 className="font-semibold">Bakery {item}</h3>
                    <p className="text-sm text-gray-500">Location</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Reviews and Feedback */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">
              Reviews and Feedback
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <Card key={item}>
                  <CardContent className="p-4">
                    <div className="flex items-center mb-2">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <Star className="h-4 w-4 text-yellow-400" />
                      <Star className="h-4 w-4 text-yellow-400" />
                      <Star className="h-4 w-4 text-yellow-400" />
                      <Star className="h-4 w-4 text-yellow-400" />
                    </div>
                    <p className="text-sm">
                      "Great experience! The pastries were delicious."
                    </p>
                    <p className="text-sm font-semibold mt-2">
                      - Customer {item}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* What We Offer */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">What We Offer</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">For Users</h3>
                  <ul className="list-disc list-inside text-sm">
                    <li>Wide variety of bakery products</li>
                    <li>Easy ordering process</li>
                    <li>Delivery options</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">For Businesses</h3>
                  <ul className="list-disc list-inside text-sm">
                    <li>Expand your customer base</li>
                    <li>Manage orders efficiently</li>
                    <li>Analytics and insights</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Map */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">
              Local Bakeries in Your Area
            </h2>
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
              <MapPin className="h-12 w-12 text-gray-400" />
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <Card key={item}>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">Question {item}?</h3>
                    <p className="text-sm">Answer to question {item}...</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t bg-gray-100">
          <div className="container mx-auto px-4 py-8">
            <div className="grid gap-8 md:grid-cols-4">
              <div>
                <h3 className="font-semibold mb-2">About Us</h3>
                <p className="text-sm">Brief description of the company...</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Quick Links</h3>
                <ul className="text-sm space-y-1">
                  <li>
                    <a href="#" className="hover:underline">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Products
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Contact Us</h3>
                <address className="text-sm not-italic">
                  <p>123 Bakery Street</p>
                  <p>City, State 12345</p>
                  <p>Email: info@bakery.com</p>
                  <p>Phone: (123) 456-7890</p>
                </address>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Follow Us</h3>
                <div className="flex space-x-4">
                  {/* Add social media icons here */}
                </div>
              </div>
            </div>
            <div className="mt-8 text-center text-sm">
              <p>&copy; 2024 Bakery Marketplace. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
      <ToastContainer />
    </>
  );
}

"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, ArrowRight, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqCategories = [
  {
    id: "ordering",
    category: "Ordering",
    questions: [
      {
        question: "How do I place an order?",
        answer:
          "Browse our marketplace, find a product or store you love, and add items to your cart. When you're ready, head to checkout and complete your order in a few easy steps.",
        popular: true,
      },
      {
        question: "Can I modify or cancel my order?",
        answer:
          "You can modify or cancel your order within 30 minutes of placing it. After that, the bakery has already started preparing your goods. Contact our support team if you need urgent help.",
        popular: false,
      },
      {
        question: "Do I need an account to order?",
        answer:
          "You need a free customer account to place orders. This lets you track deliveries, view order history, and save your favourite stores.",
        popular: true,
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We currently support Cash on Delivery. Online card payments are coming soon — we'll announce when they go live.",
        popular: false,
      },
    ],
  },
  {
    id: "delivery",
    category: "Delivery",
    questions: [
      {
        question: "What are your delivery hours?",
        answer:
          "Delivery is available from 9 AM to 9 PM, seven days a week. Some bakeries may have their own specific preparation and pickup windows.",
        popular: true,
      },
      {
        question: "How is the delivery fee calculated?",
        answer:
          "The delivery fee is based on the distance between the bakery and your delivery address. You can see the exact fee before confirming your order at checkout.",
        popular: false,
      },
      {
        question: "Can I track my order in real time?",
        answer:
          "Yes! Once your order is confirmed and picked up by a driver, you can track it live from the Order Tracking page in your account.",
        popular: true,
      },
      {
        question: "What happens if my order is late?",
        answer:
          "If your order is significantly delayed, our support team will contact you. You can also reach out via the Contact page and we'll investigate right away.",
        popular: false,
      },
    ],
  },
  {
    id: "returns",
    category: "Returns & Refunds",
    questions: [
      {
        question: "What is your return policy?",
        answer:
          "Due to the perishable nature of baked goods, we do not accept returns. If there is an issue with your order — wrong items, damage, or quality concerns — please contact us within 24 hours.",
        popular: true,
      },
      {
        question: "How do I request a refund?",
        answer:
          "Contact our customer support within 24 hours of receiving your order with photos of the issue. We'll review your case and process eligible refunds within 3–5 business days.",
        popular: false,
      },
      {
        question: "What if I received the wrong item?",
        answer:
          "We're sorry to hear that! Take a photo and contact us immediately. We'll arrange a replacement delivery or a full refund as quickly as possible.",
        popular: true,
      },
    ],
  },
  {
    id: "account",
    category: "Account",
    questions: [
      {
        question: "How do I become a seller on Sweet Treats?",
        answer:
          "Click 'Start Selling' on the homepage or navigate to Register and choose the Business account type. You'll be guided through setting up your store profile, adding products, and going live.",
        popular: true,
      },
      {
        question: "How do I reset my password?",
        answer:
          "Visit the Login page and click 'Forgot Password'. We'll send a reset link to your registered email address.",
        popular: false,
      },
      {
        question: "Can I have both a customer and seller account?",
        answer:
          "Each email address is tied to a single role. If you'd like both, use separate email addresses for your customer and business accounts.",
        popular: false,
      },
    ],
  },
];

const CATEGORY_TABS = faqCategories.map((c) => ({ id: c.id, label: c.category }));

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const popularQuestions = faqCategories
    .flatMap((c) => c.questions.filter((q) => q.popular))
    .slice(0, 4);

  const filteredCategories = faqCategories
    .filter((c) => activeCategory === "all" || c.id === activeCategory)
    .map((c) => ({
      ...c,
      questions: c.questions.filter(
        (q) =>
          searchTerm === "" ||
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((c) => c.questions.length > 0);

  const totalResults = filteredCategories.reduce((sum, c) => sum + c.questions.length, 0);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero with search */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900 via-orange-800 to-rose-900" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-amber-400/10" />
        <div className="absolute -bottom-16 -left-20 w-64 h-64 rounded-full bg-rose-400/10" />

        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <p className="text-amber-200 font-semibold text-sm uppercase tracking-widest mb-4">
            Help Center
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-5">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-white/75 max-w-xl mx-auto mb-10">
            Find answers to the most common questions about ordering, delivery, and selling on
            Sweet Treats Marketplace.
          </p>

          {/* Search bar */}
          <div className="max-w-lg mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="search"
              placeholder="Search questions…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-14 rounded-2xl bg-white border-0 text-gray-800 placeholder:text-gray-400 text-base shadow-xl focus:ring-2 focus:ring-amber-400"
            />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">

          {/* Popular questions (only when not searching and no category filter) */}
          {searchTerm === "" && activeCategory === "all" && (
            <div className="mb-14">
              <div className="flex items-center gap-2 mb-6">
                <h2 className="text-xl font-bold text-gray-900">Popular Questions</h2>
                <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-xs font-semibold">
                  Top picks
                </Badge>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {popularQuestions.map((q, i) => (
                  <div
                    key={i}
                    className="group p-4 rounded-xl border border-amber-100 bg-amber-50/50 hover:bg-amber-50 hover:border-amber-200 hover:shadow-sm transition-all duration-200 cursor-pointer"
                    onClick={() => setSearchTerm(q.question.split(" ").slice(0, 4).join(" "))}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") setSearchTerm(q.question.split(" ").slice(0, 4).join(" "));
                    }}
                  >
                    <p className="font-medium text-gray-900 text-sm group-hover:text-amber-800 leading-snug">
                      {q.question}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">{q.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === "all"
                  ? "bg-amber-500 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-amber-100 hover:text-amber-800"
              }`}
            >
              All
            </button>
            {CATEGORY_TABS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveCategory(id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === id
                    ? "bg-amber-500 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-amber-100 hover:text-amber-800"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Search result count */}
          {searchTerm !== "" && (
            <p className="text-sm text-gray-500 mb-6">
              {totalResults === 0
                ? "No results found. Try a different search term."
                : `Showing ${totalResults} result${totalResults !== 1 ? "s" : ""} for "${searchTerm}"`}
            </p>
          )}

          {/* FAQ accordions by category */}
          {filteredCategories.length > 0 ? (
            <div className="space-y-10">
              {filteredCategories.map((cat) => (
                <div key={cat.id}>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    {cat.category}
                    <span className="text-sm font-normal text-gray-400">
                      ({cat.questions.length})
                    </span>
                  </h2>
                  <Accordion type="single" collapsible className="w-full space-y-2">
                    {cat.questions.map((faq, idx) => (
                      <AccordionItem
                        key={idx}
                        value={`${cat.id}-${idx}`}
                        className="border border-gray-100 rounded-xl px-2 shadow-sm data-[state=open]:border-amber-200 data-[state=open]:bg-amber-50/40 transition-colors duration-200"
                      >
                        <AccordionTrigger className="text-left font-semibold text-gray-800 hover:text-amber-800 py-5 hover:no-underline">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 leading-relaxed pb-5 pr-4">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-400">
              <p className="text-lg mb-2">No questions match your search.</p>
              <p className="text-sm">Try a different term or{" "}
                <button
                  className="text-amber-600 underline"
                  onClick={() => { setSearchTerm(""); setActiveCategory("all"); }}
                >
                  clear filters
                </button>.
              </p>
            </div>
          )}

          {/* Still have questions CTA */}
          <div className="mt-16 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 p-8 text-center">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-6 h-6 text-amber-700" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Still have questions?</h3>
            <p className="text-gray-500 mb-6 max-w-sm mx-auto">
              Our team is always happy to help. Reach out and we&apos;ll get back to you quickly.
            </p>
            <Button
              asChild
              className="bg-amber-500 hover:bg-amber-600 text-white px-8 rounded-full font-semibold"
            >
              <Link href="/contact">
                Contact Us <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

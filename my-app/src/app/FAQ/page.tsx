"use client";
import { useState } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Mock FAQ data
const faqCategories = [
  {
    category: "Ordering",
    questions: [
      {
        question: "How do I place an order?",
        answer:
          "You can place an order by browsing our marketplace, selecting the items you want, and proceeding to checkout.",
      },
      {
        question: "Can I modify or cancel my order?",
        answer:
          "You can modify or cancel your order within 30 minutes of placing it. After that, please contact our customer support.",
      },
    ],
  },
  {
    category: "Delivery",
    questions: [
      {
        question: "What are your delivery hours?",
        answer: "Our delivery hours are from 9 AM to 9 PM, seven days a week.",
      },
      {
        question: "How is the delivery fee calculated?",
        answer:
          "The delivery fee is calculated based on the distance from the bakery to your location. You can see the exact fee at checkout.",
      },
    ],
  },
  {
    category: "Returns and Refunds",
    questions: [
      {
        question: "What is your return policy?",
        answer:
          "Due to the perishable nature of our products, we do not accept returns. If you have any issues with your order, please contact our customer support immediately.",
      },
      {
        question: "How do I request a refund?",
        answer: `'If you're unsatisfied with your order, please contact our customer support within 24 hours of receiving your order to discuss refund options.' `,
      },
    ],
  },
];

export default function Component() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFAQs = faqCategories
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>

      <div className="mb-6 relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search FAQs"
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredFAQs.map((category, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">{category.category}</h2>
          <Accordion type="single" collapsible className="w-full">
            {category.questions.map((faq, faqIndex) => (
              <AccordionItem value={`item-${index}-${faqIndex}`} key={faqIndex}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
  );
}

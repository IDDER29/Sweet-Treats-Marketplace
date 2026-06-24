"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MessageCircle,
  Send,
  ArrowRight,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { APP_CONFIG } from "@/config";

const CONTACT_METHODS = [
  {
    icon: Mail,
    title: "Email Us",
    detail: APP_CONFIG.supportEmail,
    meta: "We reply within 24 hours",
    bg: "bg-amber-50",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-700",
    border: "border-amber-100",
  },
  {
    icon: Phone,
    title: "Call Us",
    detail: APP_CONFIG.supportPhone,
    meta: "Mon–Sat, 9 AM – 6 PM",
    bg: "bg-orange-50",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-700",
    border: "border-orange-100",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    detail: "Chat with our team",
    meta: "Available during business hours",
    bg: "bg-rose-50",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-700",
    border: "border-rose-100",
  },
];

const SUBJECTS = [
  "General Inquiry",
  "Order Support",
  "Become a Seller",
  "Technical Issue",
  "Billing & Payments",
  "Feedback",
];

export default function ContactPage() {
  const [subject, setSubject] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900 via-orange-800 to-rose-900" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-amber-500/10" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-rose-500/10" />
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <p className="text-amber-200 font-semibold text-sm uppercase tracking-widest mb-4">
            Get in Touch
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-5">
            We&apos;d love to hear from you
          </h1>
          <p className="text-lg text-white/75 max-w-xl mx-auto leading-relaxed">
            Have a question, idea, or just want to say hello? Reach out through any of the
            channels below — our team is always happy to help.
          </p>
        </div>
      </section>

      {/* Contact method cards */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-16 relative z-20">
            {CONTACT_METHODS.map(({ icon: Icon, title, detail, meta, bg, iconBg, iconColor, border }) => (
              <Card
                key={title}
                className={`border ${border} shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300`}
              >
                <CardContent className={`p-6 ${bg}`}>
                  <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${iconColor}`} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
                  <p className="text-gray-700 font-medium text-sm">{detail}</p>
                  <div className="flex items-center gap-1.5 mt-2 text-gray-500 text-xs">
                    <Clock className="w-3.5 h-3.5" />
                    {meta}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator className="bg-gray-100" />

      {/* Contact form */}
      <section className="py-16 md:py-24 bg-amber-50/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
              <p className="text-gray-500">
                Fill in the form below and we&apos;ll get back to you as soon as possible.
              </p>
            </div>

            <Card className="border-gray-100 shadow-lg rounded-2xl overflow-hidden">
              <CardContent className="p-6 md:p-10">
                {submitted ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                    <p className="text-gray-500 mb-6">
                      Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                    </p>
                    <Button
                      variant="outline"
                      className="border-amber-300 text-amber-700 hover:bg-amber-50"
                      onClick={() => setSubmitted(false)}
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-700 font-medium">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          placeholder="Jane Doe"
                          required
                          className="border-gray-200 focus:border-amber-400 focus:ring-amber-100"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-700 font-medium">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="jane@example.com"
                          required
                          className="border-gray-200 focus:border-amber-400 focus:ring-amber-100"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-gray-700 font-medium">
                        Subject
                      </Label>
                      <select
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                        className="flex h-10 w-full rounded-md border border-gray-200 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:border-amber-400"
                      >
                        <option value="" disabled>
                          Select a subject…
                        </option>
                        {SUBJECTS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-gray-700 font-medium">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us how we can help you…"
                        required
                        rows={6}
                        className="border-gray-200 focus:border-amber-400 focus:ring-amber-100 resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-amber-500 hover:bg-amber-600 text-white rounded-full font-semibold shadow-md"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ teaser */}
      <section className="py-12 md:py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-lg">
            Have more questions?{" "}
            <Link
              href="/FAQ"
              className="inline-flex items-center gap-1 text-amber-600 hover:text-amber-800 font-semibold underline underline-offset-4"
            >
              Check our FAQ <ArrowRight className="w-4 h-4" />
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}

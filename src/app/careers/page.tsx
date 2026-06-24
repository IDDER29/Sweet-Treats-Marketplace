import Link from "next/link";
import type { Metadata } from "next";
import {
  Heart,
  Laptop,
  Target,
  TrendingUp,
  ShieldCheck,
  Wifi,
  Clock,
  BookOpen,
  Users,
  Gift,
  ArrowRight,
  MapPin,
  Briefcase,
  Mail,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Careers | Sweet Treats",
  description:
    "Join the Sweet Treats team and help connect communities with local bakeries. Explore open roles across engineering, design, operations, and more.",
};

const VALUES = [
  {
    icon: Heart,
    title: "Passion for food",
    description: "We genuinely love great food and believe local bakeries deserve to thrive.",
  },
  {
    icon: Wifi,
    title: "Remote-first",
    description: "Work from anywhere. We believe talent has no postcode.",
  },
  {
    icon: Target,
    title: "Mission-driven",
    description: "Every feature we ship helps a local baker reach more customers.",
  },
  {
    icon: TrendingUp,
    title: "Grow together",
    description: "We invest in your growth as much as we invest in our product.",
  },
];

const BENEFITS = [
  { icon: ShieldCheck, label: "Health insurance" },
  { icon: Laptop, label: "Remote work" },
  { icon: Clock, label: "Flexible hours" },
  { icon: BookOpen, label: "Learning budget" },
  { icon: Users, label: "Team retreats" },
  { icon: Gift, label: "Sweet treats allowance" },
];

const JOBS = [
  {
    title: "Senior Frontend Engineer",
    location: "Remote",
    type: "Full-time",
    department: "Engineering",
  },
  {
    title: "Product Designer",
    location: "Remote",
    type: "Full-time",
    department: "Design",
  },
  {
    title: "Operations Manager",
    location: "London, UK",
    type: "Full-time",
    department: "Operations",
  },
  {
    title: "Customer Success Lead",
    location: "Remote",
    type: "Contract",
    department: "Support",
  },
  {
    title: "Marketplace Partnerships",
    location: "Remote",
    type: "Full-time",
    department: "Growth",
  },
];

const DEPT_COLORS: Record<string, string> = {
  Engineering: "bg-blue-100 text-blue-800",
  Design: "bg-violet-100 text-violet-800",
  Operations: "bg-green-100 text-green-800",
  Support: "bg-rose-100 text-rose-800",
  Growth: "bg-amber-100 text-amber-800",
};

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 border-b py-20 md:py-28">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <Badge className="mb-5 bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100 text-sm px-4 py-1">
            We&apos;re hiring
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-5 leading-tight">
            Come bake something<br />
            <span className="text-amber-600">amazing with us</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Sweet Treats is on a mission to make local bakeries flourish. We&apos;re a small,
            focused team building tools that help independent food businesses reach the
            people who love them most.
          </p>
          <a href="#open-roles">
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white gap-2 px-8">
              View open roles <ArrowRight className="h-5 w-5" />
            </Button>
          </a>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Our values</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              These aren&apos;t words on a wall. They&apos;re how we make decisions every day.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {VALUES.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-2xl border p-6 hover:shadow-sm transition-shadow text-center">
                <div className="mx-auto w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-amber-700" />
                </div>
                <h3 className="font-bold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-amber-50 border-y">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10">Benefits</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {BENEFITS.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border text-center">
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-amber-700" />
                </div>
                <span className="text-xs font-semibold text-gray-700">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="open-roles" className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Open positions</h2>
            <p className="text-muted-foreground">
              All roles are fully remote unless a location is specified.
            </p>
          </div>
          <div className="space-y-3">
            {JOBS.map(({ title, location, type, department }) => (
              <Link
                key={title}
                href="#"
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border p-5 hover:border-amber-400 hover:shadow-sm transition-all group"
              >
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 group-hover:text-amber-700 transition-colors">
                    {title}
                  </p>
                  <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="h-3.5 w-3.5" />
                      {type}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${DEPT_COLORS[department]}`}>
                    {department}
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-amber-600 transition-colors shrink-0" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 rounded-2xl bg-amber-50 border border-amber-200 p-8 text-center">
            <h3 className="font-bold text-lg mb-2">Don&apos;t see your role?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              We&apos;re always open to hearing from talented people. Send us a note and
              tell us how you&apos;d contribute.
            </p>
            <a href="mailto:careers@sweettreats.example">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white gap-2">
                <Mail className="h-4 w-4" />
                Get in touch
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

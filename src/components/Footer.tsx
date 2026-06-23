"use client";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FOOTER_NAV, APP_CONFIG } from "@/config";

const Footer = () => {
  const handleNewsletter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    toast.success("Thanks for subscribing!");
    form.reset();
  };

  return (
    <footer className="bg-muted py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {FOOTER_NAV.map((column) => (
            <div key={column.title}>
              <h3 className="font-semibold text-lg mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
            <p className="text-muted-foreground mb-4">
              Stay updated with our latest offers and products.
            </p>
            <form className="flex" onSubmit={handleNewsletter}>
              <Input
                type="email"
                name="email"
                required
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
          <p>
            &copy; 2026 {APP_CONFIG.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

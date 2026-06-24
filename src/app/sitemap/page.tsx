import Link from "next/link";
import type { Metadata } from "next";
import { MapPin, ShoppingBag, Store, Users, Briefcase, Truck, FileText, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Sitemap — Sweet Treats Marketplace",
  description: "Full directory of all pages on Sweet Treats Marketplace.",
};

interface SitemapSection {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  links: { label: string; href: string; description?: string }[];
}

const SECTIONS: SitemapSection[] = [
  {
    title: "Shopping",
    icon: ShoppingBag,
    color: "text-amber-700 bg-amber-100",
    links: [
      { label: "All Products", href: "/products", description: "Browse every treat from every bakery" },
      { label: "Stores Directory", href: "/stores", description: "Discover local bakeries near you" },
      { label: "Collections", href: "/collections", description: "Curated treat selections by occasion" },
      { label: "Deals & Offers", href: "/deals", description: "Time-limited promotions and discount codes" },
      { label: "Gift Guide", href: "/gift-guide", description: "Perfect edible gifts for every occasion" },
    ],
  },
  {
    title: "Your Account",
    icon: Users,
    color: "text-blue-700 bg-blue-100",
    links: [
      { label: "Profile", href: "/customer/profile", description: "Personal info and account settings" },
      { label: "My Orders", href: "/customer/orders", description: "Order history and status" },
      { label: "Wishlist", href: "/customer/wishlist", description: "Saved products for later" },
      { label: "Delivery Addresses", href: "/customer/addresses", description: "Saved addresses for faster checkout" },
      { label: "My Reviews", href: "/customer/reviews", description: "Reviews you've submitted" },
      { label: "Notifications", href: "/customer/notifications", description: "Notification centre and preferences" },
      { label: "Payment Methods", href: "/customer/payment-methods", description: "Saved cards and billing" },
      { label: "Rewards & Loyalty", href: "/customer/loyalty", description: "Points balance, tiers, and referrals" },
      { label: "Review & Feedback", href: "/review-and-feedback", description: "Leave a review for a delivered order" },
    ],
  },
  {
    title: "Seller / Business",
    icon: Briefcase,
    color: "text-purple-700 bg-purple-100",
    links: [
      { label: "Sell on Sweet Treats", href: "/sell", description: "Learn about selling on our platform" },
      { label: "Seller Onboarding", href: "/business/onboarding", description: "Set up your bakery in minutes" },
      { label: "Dashboard", href: "/business/dashboard", description: "Overview of your store performance" },
      { label: "Products", href: "/business/dashboard/products", description: "Manage your product catalogue" },
      { label: "Orders", href: "/business/dashboard/orders", description: "View and manage customer orders" },
      { label: "Inventory", href: "/business/dashboard/inventory", description: "Stock levels and availability" },
      { label: "Reviews", href: "/business/dashboard/reviews", description: "Customer reviews and responses" },
      { label: "Promotions", href: "/business/dashboard/promotions", description: "Create discount codes and deals" },
      { label: "Customers", href: "/business/dashboard/customers", description: "Customer list and insights" },
      { label: "Sales Analytics", href: "/business/dashboard/sales", description: "Revenue and order analytics" },
      { label: "Store Page", href: "/business/store", description: "Manage your public storefront" },
      { label: "Settings", href: "/business/settings", description: "Account, notifications, and payout settings" },
    ],
  },
  {
    title: "Delivery Driver",
    icon: Truck,
    color: "text-green-700 bg-green-100",
    links: [
      { label: "Driver Dashboard", href: "/delivery-provider/dashboard", description: "Active deliveries and requests" },
      { label: "Active Deliveries", href: "/delivery-provider/orders", description: "Current and completed deliveries" },
      { label: "Earnings", href: "/delivery-provider/earnings", description: "Earnings history and payout info" },
      { label: "Driver Profile", href: "/delivery-provider/profile", description: "Personal details and vehicle info" },
      { label: "Driver Settings", href: "/delivery-provider/settings", description: "Availability, zones, and preferences" },
    ],
  },
  {
    title: "Order Tracking",
    icon: MapPin,
    color: "text-orange-700 bg-orange-100",
    links: [
      { label: "Track Your Order", href: "/order-tracking", description: "Live status of your current order" },
      { label: "Cart", href: "/cart", description: "Your shopping cart" },
      { label: "Checkout", href: "/cart/checkout", description: "Complete your order" },
    ],
  },
  {
    title: "Company",
    icon: Store,
    color: "text-rose-700 bg-rose-100",
    links: [
      { label: "About Us", href: "/about", description: "Our story, mission, and values" },
      { label: "How It Works", href: "/how-it-works", description: "Step-by-step guide to ordering" },
      { label: "Sell on Sweet Treats", href: "/sell", description: "Start your bakery store" },
      { label: "Deliver with Us", href: "/drive", description: "Become a delivery driver" },
      { label: "Blog", href: "/blog", description: "Stories, tips, and bakery spotlights" },
      { label: "Careers", href: "/careers", description: "Job openings at Sweet Treats" },
      { label: "Press & Media", href: "/press", description: "Press coverage and brand assets" },
      { label: "Help Center", href: "/help", description: "Support articles and answers" },
      { label: "Contact", href: "/contact", description: "Get in touch with our team" },
      { label: "FAQ", href: "/FAQ", description: "Frequently asked questions" },
    ],
  },
  {
    title: "Legal",
    icon: FileText,
    color: "text-gray-700 bg-gray-100",
    links: [
      { label: "Terms of Service", href: "/terms", description: "Rules and conditions of use" },
      { label: "Privacy Policy", href: "/privacy", description: "How we handle your data" },
      { label: "Refund Policy", href: "/refund-policy", description: "Returns, replacements, and refunds" },
      { label: "Cookie Policy", href: "/cookie-policy", description: "Cookies and tracking preferences" },
      { label: "Accessibility", href: "/accessibility", description: "WCAG 2.1 AA accessibility statement" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 border-b py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">Sitemap</h1>
          <p className="text-muted-foreground">
            A complete directory of every page on Sweet Treats Marketplace.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {SECTIONS.map(({ title, icon: Icon, color, links }) => (
            <div key={title}>
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <h2 className="text-lg font-bold">{title}</h2>
              </div>
              <ul className="space-y-2">
                {links.map(({ label, href, description }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="group flex items-start gap-3 rounded-lg p-2.5 hover:bg-amber-50 transition-colors"
                    >
                      <ArrowRight className="h-4 w-4 text-amber-400 shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div>
                        <p className="font-medium text-sm group-hover:text-amber-700 transition-colors">
                          {label}
                        </p>
                        {description && (
                          <p className="text-xs text-muted-foreground">{description}</p>
                        )}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Auth links */}
        <div className="mt-12 border-t pt-10">
          <h2 className="text-lg font-bold mb-4 text-muted-foreground">Authentication</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Sign in", href: "/auth/login" },
              { label: "Register", href: "/auth/register" },
              { label: "Forgot password", href: "/auth/forgot-password" },
              { label: "Reset password", href: "/auth/reset-password" },
              { label: "Verify email", href: "/auth/verify-email" },
              { label: "Unsubscribe from emails", href: "/newsletter/unsubscribe" },
            ].map(({ label, href }) => (
              <Link key={href} href={href} className="text-sm text-muted-foreground hover:text-amber-700 underline underline-offset-2">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "../context/CartContext";
import CartSidePanel from "@/components/CartSidePanel";
import AuthModals from "@/components/AuthModals";
import QueryProvider from "@/providers/QueryProvider";
import { LocaleProvider } from "@/i18n/LocaleProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXTAUTH_URL ?? "https://sweettreats.example"
  ),
  title: {
    default: "Sweet Treats Marketplace",
    template: "%s | Sweet Treats Marketplace",
  },
  description:
    "Discover and order cakes, pastries, and sweet treats from local bakeries near you.",
  openGraph: {
    type: "website",
    siteName: "Sweet Treats Marketplace",
    title: "Sweet Treats Marketplace",
    description:
      "Discover and order cakes, pastries, and sweet treats from local bakeries near you.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sweet Treats Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sweet Treats Marketplace",
    description:
      "Discover and order cakes, pastries, and sweet treats from local bakeries near you.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <LocaleProvider>
            <CartProvider>
              <Navbar />
              <CartSidePanel />
              {children}
              <Footer />
              <AuthModals />
              <ToastContainer />
            </CartProvider>
          </LocaleProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

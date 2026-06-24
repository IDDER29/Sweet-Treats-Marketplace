"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CakeSlice,
  Store,
  Package,
  CreditCard,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Upload,
  MapPin,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PRODUCT_CATEGORIES, DIETARY_LABELS } from "@/config";
import { toast } from "react-toastify";

const STEPS = [
  { id: 1, label: "Store details", icon: Store },
  { id: 2, label: "First product", icon: Package },
  { id: 3, label: "Payment setup", icon: CreditCard },
  { id: 4, label: "Go live!", icon: CheckCircle2 },
];

interface StoreForm {
  name: string;
  description: string;
  city: string;
  address: string;
  phone: string;
  openingHours: string;
  category: string;
}

interface ProductForm {
  name: string;
  description: string;
  price: string;
  category: string;
  dietary: string;
  availability: string;
}

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {STEPS.map((step, i) => {
        const done = step.id < current;
        const active = step.id === current;
        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  done
                    ? "bg-green-500 text-white"
                    : active
                    ? "bg-amber-500 text-white ring-4 ring-amber-100"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {done ? <CheckCircle2 className="h-5 w-5" /> : step.id}
              </div>
              <span
                className={`text-xs font-medium hidden sm:block ${
                  active ? "text-amber-700" : done ? "text-green-600" : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`h-0.5 w-12 sm:w-20 mx-1 mt-[-20px] sm:mt-[-24px] ${
                  done ? "bg-green-400" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function StoreDetailsStep({
  form,
  setForm,
  onNext,
}: {
  form: StoreForm;
  setForm: (f: StoreForm) => void;
  onNext: () => void;
}) {
  const set = (k: keyof StoreForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [k]: e.target.value });

  const valid = form.name.trim() && form.city.trim();

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold">Tell us about your bakery</h2>
        <p className="text-muted-foreground text-sm mt-1">
          This is what customers will see when they visit your store page.
        </p>
      </div>

      {/* Logo placeholder */}
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-2xl bg-amber-100 flex items-center justify-center border-2 border-dashed border-amber-300">
          <CakeSlice className="h-8 w-8 text-amber-400" />
        </div>
        <div>
          <Button variant="outline" size="sm" className="gap-2 mb-1">
            <Upload className="h-4 w-4" />
            Upload logo
          </Button>
          <p className="text-xs text-muted-foreground">PNG or JPG, max 2 MB</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <Label htmlFor="sname">Bakery name *</Label>
          <Input id="sname" className="mt-1" value={form.name} onChange={set("name")} placeholder="Amira's Artisan Cakes" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="sdesc">About your bakery *</Label>
          <Textarea
            id="sdesc"
            className="mt-1 resize-none"
            rows={3}
            value={form.description}
            onChange={set("description")}
            placeholder="Tell customers what makes your baked goods special — your story, your ingredients, your passion…"
          />
        </div>
        <div>
          <Label htmlFor="scity">City *</Label>
          <div className="relative mt-1">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="scity" className="pl-9" value={form.city} onChange={set("city")} placeholder="Casablanca" />
          </div>
        </div>
        <div>
          <Label htmlFor="sphone">Phone number</Label>
          <Input id="sphone" className="mt-1" type="tel" value={form.phone} onChange={set("phone")} placeholder="+212 600 000 000" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="saddress">Street address</Label>
          <Input id="saddress" className="mt-1" value={form.address} onChange={set("address")} placeholder="123 Rue Mohammed V" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="shours">Opening hours</Label>
          <div className="relative mt-1">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="shours" className="pl-9" value={form.openingHours} onChange={set("openingHours")} placeholder="Mon–Sat 8:00am – 7:00pm" />
          </div>
        </div>
      </div>

      <Button
        disabled={!valid}
        className="w-full bg-amber-600 hover:bg-amber-700 text-white gap-2"
        onClick={onNext}
      >
        Save & continue
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

function FirstProductStep({
  form,
  setForm,
  onNext,
  onBack,
}: {
  form: ProductForm;
  setForm: (f: ProductForm) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const set = (k: keyof ProductForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const valid = form.name.trim() && form.price.trim() && Number(form.price) > 0;

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold">Add your first product</h2>
        <p className="text-muted-foreground text-sm mt-1">
          You can add more products later. This gets your store live faster.
        </p>
      </div>

      {/* Image upload zone */}
      <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-amber-300 transition-colors cursor-pointer">
        <Upload className="h-8 w-8 text-gray-300 mx-auto mb-2" />
        <p className="text-sm font-medium text-gray-500">Click to upload product photos</p>
        <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10 MB each</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <Label htmlFor="pname">Product name *</Label>
          <Input id="pname" className="mt-1" value={form.name} onChange={set("name")} placeholder="Chocolate Lava Cake" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="pdesc">Description</Label>
          <Textarea
            id="pdesc"
            className="mt-1 resize-none"
            rows={3}
            value={form.description}
            onChange={set("description")}
            placeholder="Rich dark chocolate cake with a warm, gooey center…"
          />
        </div>
        <div>
          <Label htmlFor="pprice">Price ($) *</Label>
          <Input id="pprice" className="mt-1" type="number" min="0" step="0.01" value={form.price} onChange={set("price")} placeholder="12.99" />
        </div>
        <div>
          <Label htmlFor="pcat">Category</Label>
          <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
            <SelectTrigger id="pcat" className="mt-1">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {PRODUCT_CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="pdiet">Dietary label</Label>
          <Select value={form.dietary} onValueChange={(v) => setForm({ ...form, dietary: v })}>
            <SelectTrigger id="pdiet" className="mt-1">
              <SelectValue placeholder="Select label" />
            </SelectTrigger>
            <SelectContent>
              {DIETARY_LABELS.map((d) => (
                <SelectItem key={d} value={d}>{d}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="pavail">Availability</Label>
          <Select value={form.availability} onValueChange={(v) => setForm({ ...form, availability: v })}>
            <SelectTrigger id="pavail" className="mt-1">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="In Stock">In Stock</SelectItem>
              <SelectItem value="Limited">Limited</SelectItem>
              <SelectItem value="Out of Stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" className="flex-1 gap-2" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button
          disabled={!valid}
          className="flex-1 bg-amber-600 hover:bg-amber-700 text-white gap-2"
          onClick={onNext}
        >
          Continue
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      <button
        onClick={onNext}
        className="w-full text-sm text-muted-foreground hover:text-foreground underline underline-offset-2"
      >
        Skip for now — I&apos;ll add products later
      </button>
    </div>
  );
}

function PaymentStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold">Set up payments</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Add your payout details so we can send you your earnings directly.
        </p>
      </div>

      <div className="rounded-xl border bg-amber-50 border-amber-200 p-5 space-y-3">
        <p className="font-semibold text-amber-900 text-sm">How payouts work</p>
        <ul className="space-y-2">
          {[
            "Earnings are calculated after each completed order",
            "Payouts are processed every Monday",
            "Funds arrive in your bank within 2–5 business days",
            "Our platform fee is deducted automatically",
          ].map((point) => (
            <li key={point} className="flex items-start gap-2 text-sm text-amber-800">
              <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
              {point}
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="bankName">Bank name</Label>
          <Input id="bankName" className="mt-1" placeholder="e.g. Attijariwafa Bank" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="iban">IBAN / Account number</Label>
            <Input id="iban" className="mt-1" placeholder="MA00 0000 0000 0000" />
          </div>
          <div>
            <Label htmlFor="swift">SWIFT / BIC</Label>
            <Input id="swift" className="mt-1" placeholder="BCMAMAMC" />
          </div>
        </div>
        <div>
          <Label htmlFor="accountName">Account holder name</Label>
          <Input id="accountName" className="mt-1" placeholder="As it appears on your bank account" />
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" className="flex-1 gap-2" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button className="flex-1 bg-amber-600 hover:bg-amber-700 text-white gap-2" onClick={onNext}>
          Save & finish
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      <button
        onClick={onNext}
        className="w-full text-sm text-muted-foreground hover:text-foreground underline underline-offset-2"
      >
        Skip — I&apos;ll set up payments later
      </button>
    </div>
  );
}

function GoLiveStep({ storeName }: { storeName: string }) {
  const router = useRouter();
  return (
    <div className="text-center space-y-6 py-4">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
        <CheckCircle2 className="h-10 w-10 text-green-500" />
      </div>
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">
          {storeName ? `${storeName} is live! 🎉` : "Your store is live! 🎉"}
        </h2>
        <p className="text-muted-foreground max-w-sm mx-auto">
          Congratulations! Your bakery is now discoverable on Sweet Treats Marketplace.
          Start managing your store from the dashboard.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          className="bg-amber-600 hover:bg-amber-700 text-white gap-2"
          onClick={() => router.push("/business/dashboard")}
        >
          Go to dashboard
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Link href="/business/dashboard/products/add">
          <Button variant="outline" className="w-full gap-2">
            <Package className="h-4 w-4" />
            Add more products
          </Button>
        </Link>
      </div>
      <div className="pt-4 border-t">
        <p className="text-sm text-muted-foreground mb-3">What to do next</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
          {[
            { icon: Package, text: "Add your full product catalogue" },
            { icon: Store, text: "Customise your store cover image" },
            { icon: CreditCard, text: "Verify your payout details" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-sm text-muted-foreground bg-gray-50 rounded-lg px-3 py-2">
              <Icon className="h-4 w-4 text-amber-600 shrink-0" />
              {text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [storeForm, setStoreForm] = useState<StoreForm>({
    name: "", description: "", city: "", address: "", phone: "", openingHours: "", category: "",
  });
  const [productForm, setProductForm] = useState<ProductForm>({
    name: "", description: "", price: "", category: "", dietary: "None", availability: "In Stock",
  });

  function handleStoreNext() {
    // TODO(backend): POST store details to /business/store
    setStep(2);
  }

  function handleProductNext() {
    // TODO(backend): POST first product if filled in
    setStep(3);
  }

  function handlePaymentNext() {
    // TODO(backend): POST payout details to /business/settings/payout
    toast.success("Store is live!");
    setStep(4);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-10 px-4">
      <div className="w-full max-w-xl">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="bg-amber-100 rounded-xl p-2">
            <CakeSlice className="h-6 w-6 text-amber-700" />
          </div>
          <span className="text-xl font-bold">Sweet Treats</span>
        </div>

        <StepIndicator current={step} />

        <div className="bg-white rounded-2xl border shadow-sm p-7 sm:p-8">
          {step === 1 && (
            <StoreDetailsStep form={storeForm} setForm={setStoreForm} onNext={handleStoreNext} />
          )}
          {step === 2 && (
            <FirstProductStep
              form={productForm}
              setForm={setProductForm}
              onNext={handleProductNext}
              onBack={() => setStep(1)}
            />
          )}
          {step === 3 && <PaymentStep onNext={handlePaymentNext} onBack={() => setStep(2)} />}
          {step === 4 && <GoLiveStep storeName={storeForm.name} />}
        </div>

        {step < 4 && (
          <p className="text-center text-xs text-muted-foreground mt-5">
            Step {step} of {STEPS.length - 1} &middot; You can always update these later in{" "}
            <Link href="/business/settings" className="text-amber-700 hover:underline">
              Settings
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

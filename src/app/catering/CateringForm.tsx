"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "react-toastify";

const EVENT_TYPES = [
  { value: "office", label: "Office meeting" },
  { value: "team", label: "Team celebration" },
  { value: "client", label: "Client gifting" },
  { value: "launch", label: "Product launch" },
  { value: "wedding", label: "Wedding" },
  { value: "other", label: "Other" },
];

export default function CateringForm() {
  const [form, setForm] = useState({
    company: "",
    contact: "",
    email: "",
    phone: "",
    eventDate: "",
    itemCount: "",
    eventType: "",
    dietary: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);

  function set(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.company || !form.contact || !form.email || !form.eventDate || !form.itemCount || !form.eventType) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (Number(form.itemCount) < 50) {
      toast.error("Minimum order quantity is 50 items.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Request submitted! We'll contact you within 24 hours.");
      setForm({ company: "", contact: "", email: "", phone: "", eventDate: "", itemCount: "", eventType: "", dietary: "", notes: "" });
    }, 1000);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-amber-100 bg-amber-50 p-6 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="c-company" className="mb-1.5 block">Company name <span className="text-red-500">*</span></Label>
          <Input id="c-company" placeholder="Acme Corp" value={form.company} onChange={set("company")} className="bg-white" required />
        </div>
        <div>
          <Label htmlFor="c-contact" className="mb-1.5 block">Contact name <span className="text-red-500">*</span></Label>
          <Input id="c-contact" placeholder="Jane Smith" value={form.contact} onChange={set("contact")} className="bg-white" required />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="c-email" className="mb-1.5 block">Email <span className="text-red-500">*</span></Label>
          <Input id="c-email" type="email" placeholder="jane@acme.com" value={form.email} onChange={set("email")} className="bg-white" required />
        </div>
        <div>
          <Label htmlFor="c-phone" className="mb-1.5 block">Phone <span className="text-gray-400">(optional)</span></Label>
          <Input id="c-phone" type="tel" placeholder="+1 555 000 0000" value={form.phone} onChange={set("phone")} className="bg-white" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="c-date" className="mb-1.5 block">Event date <span className="text-red-500">*</span></Label>
          <Input id="c-date" type="date" value={form.eventDate} onChange={set("eventDate")} className="bg-white" required />
        </div>
        <div>
          <Label htmlFor="c-items" className="mb-1.5 block">Number of items <span className="text-red-500">*</span></Label>
          <Input id="c-items" type="number" min={50} placeholder="Minimum 50" value={form.itemCount} onChange={set("itemCount")} className="bg-white" required />
        </div>
      </div>

      <div>
        <Label className="mb-1.5 block">Occasion / event type <span className="text-red-500">*</span></Label>
        <Select value={form.eventType} onValueChange={(val) => setForm((prev) => ({ ...prev, eventType: val }))}>
          <SelectTrigger className="bg-white">
            <SelectValue placeholder="Select event type" />
          </SelectTrigger>
          <SelectContent>
            {EVENT_TYPES.map(({ value, label }) => (
              <SelectItem key={value} value={value}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="c-dietary" className="mb-1.5 block">Dietary requirements <span className="text-gray-400">(optional)</span></Label>
        <textarea
          id="c-dietary"
          rows={2}
          placeholder="e.g. vegan, gluten-free, nut allergy..."
          value={form.dietary}
          onChange={set("dietary")}
          className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
      </div>

      <div>
        <Label htmlFor="c-notes" className="mb-1.5 block">Additional notes <span className="text-gray-400">(optional)</span></Label>
        <textarea
          id="c-notes"
          rows={3}
          placeholder="Any other details about your order..."
          value={form.notes}
          onChange={set("notes")}
          className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="h-12 w-full bg-amber-600 text-base font-semibold text-white hover:bg-amber-700 disabled:opacity-70"
      >
        {loading ? "Submitting..." : "Submit catering request"}
      </Button>

      <p className="text-center text-xs text-gray-500">
        We respond to all catering enquiries within 24 hours.
      </p>
    </form>
  );
}

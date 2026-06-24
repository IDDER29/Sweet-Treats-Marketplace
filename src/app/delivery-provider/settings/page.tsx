"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Trash2, AlertTriangle } from "lucide-react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ZONES = [
  "City Centre",
  "North District",
  "South Side",
  "East End",
  "West Bay",
  "Airport Area",
] as const;

type Zone = (typeof ZONES)[number];

function useSectionSave(successMessage: string) {
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 700));
    setSaving(false);
    toast.success(successMessage);
  }

  return { saving, save };
}

export default function DeliverySettingsPage() {
  const [notifOrders, setNotifOrders] = useState(true);
  const [notifReminders, setNotifReminders] = useState(true);
  const [notifEarnings, setNotifEarnings] = useState(false);
  const [notifPromos, setNotifPromos] = useState(false);

  const [available, setAvailable] = useState(true);

  const [selectedZones, setSelectedZones] = useState<Zone[]>([
    "City Centre",
    "North District",
    "West Bay",
  ]);

  const [language, setLanguage] = useState("en");
  const [darkMode, setDarkMode] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteConfirming, setDeleteConfirming] = useState(false);

  const notifSave = useSectionSave("Notification preferences saved.");
  const availSave = useSectionSave("Availability updated.");
  const zoneSave = useSectionSave("Zone preferences saved.");
  const appSave = useSectionSave("App preferences saved.");

  function toggleZone(zone: Zone) {
    setSelectedZones((prev) =>
      prev.includes(zone) ? prev.filter((z) => z !== zone) : [...prev, zone]
    );
  }

  async function handleDeleteAccount() {
    setDeleteConfirming(true);
    await new Promise((r) => setTimeout(r, 700));
    setDeleteConfirming(false);
    setDeleteOpen(false);
    toast.error("Account deletion requested. You will receive a confirmation email.");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Link
          href="/delivery-provider/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-gray-900 transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your preferences, availability, and account.
          </p>
        </div>

        <div className="space-y-6">

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Notification Preferences</CardTitle>
              <CardDescription>
                Choose which notifications you want to receive.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  id: "notif-orders",
                  label: "Order alerts",
                  description: "Get notified when a new order is assigned to you.",
                  value: notifOrders,
                  onChange: setNotifOrders,
                },
                {
                  id: "notif-reminders",
                  label: "Delivery reminders",
                  description: "Reminders before pickup and drop-off windows.",
                  value: notifReminders,
                  onChange: setNotifReminders,
                },
                {
                  id: "notif-earnings",
                  label: "Weekly earnings summary",
                  description: "A summary of your earnings every Monday morning.",
                  value: notifEarnings,
                  onChange: setNotifEarnings,
                },
                {
                  id: "notif-promos",
                  label: "Promotions",
                  description: "Bonus opportunities and platform promotions.",
                  value: notifPromos,
                  onChange: setNotifPromos,
                },
              ].map((item, idx, arr) => (
                <div key={item.id}>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <Label htmlFor={item.id} className="text-sm font-medium cursor-pointer">
                        {item.label}
                      </Label>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.description}
                      </p>
                    </div>
                    <Switch
                      id={item.id}
                      checked={item.value}
                      onCheckedChange={item.onChange}
                    />
                  </div>
                  {idx < arr.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button
                onClick={notifSave.save}
                disabled={notifSave.saving}
                className="bg-amber-500 hover:bg-amber-600 text-white"
              >
                {notifSave.saving ? "Saving…" : "Save Preferences"}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Availability</CardTitle>
              <CardDescription>
                Control whether you are accepting new delivery orders.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div
                className={`flex items-center justify-between gap-4 rounded-lg border-2 px-4 py-3 transition-colors ${
                  available
                    ? "border-green-300 bg-green-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <Label
                  htmlFor="availability"
                  className={`text-sm font-semibold cursor-pointer ${
                    available ? "text-green-700" : "text-gray-500"
                  }`}
                >
                  {available ? "Available for deliveries" : "Unavailable"}
                </Label>
                <Switch
                  id="availability"
                  checked={available}
                  onCheckedChange={setAvailable}
                />
              </div>
              {!available && (
                <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2">
                  You won&apos;t receive new orders while unavailable.
                </p>
              )}
            </CardContent>
            <CardFooter>
              <Button
                onClick={availSave.save}
                disabled={availSave.saving}
                className="bg-amber-500 hover:bg-amber-600 text-white"
              >
                {availSave.saving ? "Saving…" : "Save Availability"}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Zone Preferences</CardTitle>
              <CardDescription>
                Select the delivery zones you want to cover.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ZONES.map((zone) => {
                  const checked = selectedZones.includes(zone);
                  return (
                    <div
                      key={zone}
                      className={`flex items-center gap-3 rounded-lg border px-4 py-3 cursor-pointer transition-colors ${
                        checked
                          ? "border-amber-300 bg-amber-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => toggleZone(zone)}
                    >
                      <Checkbox
                        id={`zone-${zone}`}
                        checked={checked}
                        onCheckedChange={() => toggleZone(zone)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <Label
                        htmlFor={`zone-${zone}`}
                        className="text-sm font-medium cursor-pointer"
                      >
                        {zone}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={zoneSave.save}
                disabled={zoneSave.saving}
                className="bg-amber-500 hover:bg-amber-600 text-white"
              >
                {zoneSave.saving ? "Saving…" : "Save Zones"}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">App Preferences</CardTitle>
              <CardDescription>
                Language and display settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="language">Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger id="language" className="w-full sm:w-56">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="ar">Arabic</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="flex items-center justify-between gap-4">
                <div>
                  <Label htmlFor="darkMode" className="text-sm font-medium cursor-pointer">
                    Dark mode
                  </Label>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Switch between light and dark appearance.
                  </p>
                </div>
                <Switch
                  id="darkMode"
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={appSave.save}
                disabled={appSave.saving}
                className="bg-amber-500 hover:bg-amber-600 text-white"
              >
                {appSave.saving ? "Saving…" : "Save Preferences"}
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-base text-red-700">Danger Zone</CardTitle>
              <CardDescription>
                Permanent actions that cannot be undone.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-start justify-between gap-4 flex-wrap sm:flex-nowrap">
                <div>
                  <p className="text-sm font-medium text-gray-900">Delete account</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Permanently delete your driver account and all associated data.
                    This action cannot be reversed.
                  </p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  className="shrink-0 gap-2"
                  onClick={() => setDeleteOpen(true)}
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <DialogTitle>Delete account?</DialogTitle>
            </div>
            <DialogDescription>
              This will permanently delete your driver account, including your earnings
              history, ratings, and all personal data. This action{" "}
              <strong>cannot be undone</strong>.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setDeleteOpen(false)}
              disabled={deleteConfirming}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteAccount}
              disabled={deleteConfirming}
              className="gap-2"
            >
              <Trash2 className="h-4 w-4" />
              {deleteConfirming ? "Deleting…" : "Yes, delete my account"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

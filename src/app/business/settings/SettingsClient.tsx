"use client";

import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { LoadingState } from "@/components/feedback/LoadingState";
import { ErrorState } from "@/components/feedback/ErrorState";
import {
  getBusinessSettings,
  updateBusinessSettings,
} from "@/services/settings";
import {
  EMPTY_NOTIFICATIONS,
  type BusinessSettings,
  type NotificationSettings,
  type UpdateBusinessSettingsInput,
} from "@/lib/settings";
import {
  Building2,
  Bell,
  Lock,
  CreditCard,
  Camera,
  CheckCircle2,
} from "lucide-react";

function PasswordStrengthBar({ password }: { password: string }) {
  const len = password.length;
  let strength = 0;
  let label = "";
  let barColor = "";

  if (len === 0) {
    return null;
  } else if (len < 6) {
    strength = 1;
    label = "Weak";
    barColor = "bg-red-500";
  } else if (len < 9) {
    strength = 2;
    label = "Medium";
    barColor = "bg-yellow-500";
  } else {
    strength = 3;
    label = "Strong";
    barColor = "bg-green-500";
  }

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i <= strength ? barColor : "bg-gray-200"
            }`}
          />
        ))}
      </div>
      <p className={`text-xs font-medium ${
        strength === 1 ? "text-red-600" : strength === 2 ? "text-yellow-600" : "text-green-600"
      }`}>
        {label} password
      </p>
    </div>
  );
}

export default function SettingsClient() {
  const { data, isLoading, isError, refetch } = useQuery<BusinessSettings>({
    queryKey: ["business-settings"],
    queryFn: () => getBusinessSettings(),
  });

  // General tab
  const [storeName, setStoreName] = useState<string>("");
  const [storeDescription, setStoreDescription] = useState<string>("");
  const [storeAddress, setStoreAddress] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  // Notifications tab
  const [notifications, setNotifications] =
    useState<NotificationSettings>(EMPTY_NOTIFICATIONS);

  // Security tab
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState<boolean>(false);

  // Billing tab
  const [billingEmail, setBillingEmail] = useState<string>("");

  // Save confirmation state per tab
  const [savedTab, setSavedTab] = useState<string | null>(null);

  // Hydrate controlled inputs from fetched data.
  useEffect(() => {
    if (!data) return;
    setStoreName(data.storeName ?? "");
    setStoreDescription(data.storeDescription ?? "");
    setStoreAddress(data.storeAddress ?? "");
    setPhoneNumber(data.phoneNumber ?? "");
    setEmail(data.email ?? "");
    setNotifications({ ...EMPTY_NOTIFICATIONS, ...data.notifications });
    setTwoFactorEnabled(data.twoFactorEnabled ?? false);
    setBillingEmail(data.billingEmail ?? "");
  }, [data]);

  const mutation = useMutation({
    mutationFn: (input: UpdateBusinessSettingsInput) =>
      updateBusinessSettings(input),
    onSuccess: () => {
      toast.success("Settings saved.");
      refetch();
    },
    onError: () => {
      toast.error("Failed to save settings. Please try again.");
    },
  });

  const saving = mutation.isPending;

  const setNotification = (key: keyof NotificationSettings, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveGeneral = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(
      { storeName, storeDescription, storeAddress, phoneNumber, email },
      { onSuccess: () => setSavedTab("general") }
    );
  };

  const handleSaveNotifications = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(
      { notifications },
      { onSuccess: () => setSavedTab("notifications") }
    );
  };

  const handleSaveSecurity = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword && newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    mutation.mutate(
      {
        currentPassword: currentPassword || undefined,
        newPassword: newPassword || undefined,
        twoFactorEnabled,
      },
      {
        onSuccess: () => {
          setSavedTab("security");
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
        },
      }
    );
  };

  const handleSaveBilling = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(
      { billingEmail },
      { onSuccess: () => setSavedTab("billing") }
    );
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">Settings</h1>
        <LoadingState rows={6} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">Settings</h1>
        <ErrorState
          title="Couldn't load settings"
          message="We couldn't fetch your settings right now. Please try again."
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Manage your store preferences, notifications, and account security.
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4" onValueChange={() => setSavedTab(null)}>
        <TabsList className="grid w-full grid-cols-4 h-auto p-1">
          <TabsTrigger value="general" className="flex flex-col gap-1 py-2 text-xs">
            <Building2 className="h-4 w-4" />
            <span>Store</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex flex-col gap-1 py-2 text-xs">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex flex-col gap-1 py-2 text-xs">
            <Lock className="h-4 w-4" />
            <span>Password</span>
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex flex-col gap-1 py-2 text-xs">
            <CreditCard className="h-4 w-4" />
            <span>Payment</span>
          </TabsTrigger>
        </TabsList>

        {/* General / Store Tab */}
        <TabsContent value="general">
          <form onSubmit={handleSaveGeneral}>
            <Card>
              <CardHeader>
                <CardTitle>Store Settings</CardTitle>
                <CardDescription>
                  Manage your store profile and contact information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Logo / Profile Picture Upload Placeholder */}
                <div>
                  <p className="text-sm font-medium mb-3">Store Logo</p>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center border-2 border-dashed border-amber-300 flex-shrink-0">
                      <Camera className="h-7 w-7 text-amber-400" />
                    </div>
                    <div>
                      <Button type="button" variant="outline" size="sm">
                        Upload Logo
                      </Button>
                      <p className="text-xs text-muted-foreground mt-1.5">
                        Recommended: square image, at least 200×200px
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="store-name">Store Name</Label>
                  <Input
                    id="store-name"
                    value={storeName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setStoreName(e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="store-description">Store Description</Label>
                  <Textarea
                    id="store-description"
                    value={storeDescription}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setStoreDescription(e.target.value)
                    }
                    className="resize-none"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="store-address">Store Address</Label>
                  <Input
                    id="store-address"
                    value={storeAddress}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setStoreAddress(e.target.value)
                    }
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="store-phone">Phone Number</Label>
                    <Input
                      id="store-phone"
                      value={phoneNumber}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setPhoneNumber(e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="store-email">Email Address</Label>
                    <Input
                      id="store-email"
                      type="email"
                      value={email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setEmail(e.target.value)
                      }
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex items-center gap-3">
                <Button type="submit" disabled={saving}>
                  {saving ? "Saving…" : "Save Changes"}
                </Button>
                {savedTab === "general" && (
                  <span className="flex items-center gap-1.5 text-sm text-green-600">
                    <CheckCircle2 className="h-4 w-4" />
                    Saved
                  </span>
                )}
              </CardFooter>
            </Card>
          </form>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <form onSubmit={handleSaveNotifications}>
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose which alerts you want to receive about your store activity.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-0 divide-y">
                {/* Orders section */}
                <div className="py-1 pb-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                    Orders
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="new-order" className="text-sm font-medium">
                          New Order Notifications
                        </Label>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Receive an alert whenever a customer places an order
                        </p>
                      </div>
                      <Switch
                        id="new-order"
                        checked={notifications.newOrder}
                        onCheckedChange={(v: boolean) =>
                          setNotification("newOrder", v)
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="order-status" className="text-sm font-medium">
                          Order Status Updates
                        </Label>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Get notified when an order status changes
                        </p>
                      </div>
                      <Switch
                        id="order-status"
                        checked={notifications.orderStatus}
                        onCheckedChange={(v: boolean) =>
                          setNotification("orderStatus", v)
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Inventory section */}
                <div className="py-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                    Inventory
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="low-stock" className="text-sm font-medium">
                        Low Stock Alerts
                      </Label>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Alert when a product is running low or out of stock
                      </p>
                    </div>
                    <Switch
                      id="low-stock"
                      checked={notifications.lowStock}
                      onCheckedChange={(v: boolean) =>
                        setNotification("lowStock", v)
                      }
                    />
                  </div>
                </div>

                {/* Marketing section */}
                <div className="py-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                    Marketing
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="promotions" className="text-sm font-medium">
                        Promotional Emails
                      </Label>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Platform news, tips, and promotional opportunities
                      </p>
                    </div>
                    <Switch
                      id="promotions"
                      checked={notifications.promotions}
                      onCheckedChange={(v: boolean) =>
                        setNotification("promotions", v)
                      }
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex items-center gap-3">
                <Button type="submit" disabled={saving}>
                  {saving ? "Saving…" : "Save Preferences"}
                </Button>
                {savedTab === "notifications" && (
                  <span className="flex items-center gap-1.5 text-sm text-green-600">
                    <CheckCircle2 className="h-4 w-4" />
                    Saved
                  </span>
                )}
              </CardFooter>
            </Card>
          </form>
        </TabsContent>

        {/* Security / Password Tab */}
        <TabsContent value="security">
          <form onSubmit={handleSaveSecurity}>
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your password and two-factor authentication.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    value={currentPassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setCurrentPassword(e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNewPassword(e.target.value)
                    }
                  />
                  <PasswordStrengthBar password={newPassword} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setConfirmPassword(e.target.value)
                    }
                  />
                  {confirmPassword && newPassword !== confirmPassword && (
                    <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                  )}
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="2fa" className="text-sm font-medium">
                      Two-Factor Authentication
                    </Label>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch
                    id="2fa"
                    checked={twoFactorEnabled}
                    onCheckedChange={(v: boolean) => setTwoFactorEnabled(v)}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex items-center gap-3">
                <Button type="submit" disabled={saving}>
                  {saving ? "Saving…" : "Update Security Settings"}
                </Button>
                {savedTab === "security" && (
                  <span className="flex items-center gap-1.5 text-sm text-green-600">
                    <CheckCircle2 className="h-4 w-4" />
                    Saved
                  </span>
                )}
              </CardFooter>
            </Card>
          </form>
        </TabsContent>

        {/* Billing / Payment Tab */}
        <TabsContent value="billing">
          <form onSubmit={handleSaveBilling}>
            <Card>
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
                <CardDescription>
                  Manage your billing details and view your current plan.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="rounded-lg border bg-gray-50 p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Current Plan</p>
                    <p className="font-semibold text-gray-900">
                      {data?.plan ? data.plan : "No active plan"}
                    </p>
                  </div>
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="rounded-lg border bg-gray-50 p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Payment Method</p>
                    <p className="font-semibold text-gray-900">
                      {data?.paymentMethod
                        ? data.paymentMethod
                        : "No payment method on file"}
                    </p>
                  </div>
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billing-email">Billing Email</Label>
                  <Input
                    id="billing-email"
                    type="email"
                    value={billingEmail}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setBillingEmail(e.target.value)
                    }
                  />
                </div>
              </CardContent>
              <CardFooter className="flex items-center gap-3">
                <Button type="submit" disabled={saving}>
                  {saving ? "Saving…" : "Update Billing Info"}
                </Button>
                {savedTab === "billing" && (
                  <span className="flex items-center gap-1.5 text-sm text-green-600">
                    <CheckCircle2 className="h-4 w-4" />
                    Saved
                  </span>
                )}
              </CardFooter>
            </Card>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}

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
    mutation.mutate({
      storeName,
      storeDescription,
      storeAddress,
      phoneNumber,
      email,
    });
  };

  const handleSaveNotifications = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({ notifications });
  };

  const handleSaveSecurity = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword && newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    mutation.mutate({
      currentPassword: currentPassword || undefined,
      newPassword: newPassword || undefined,
      twoFactorEnabled,
    });
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleSaveBilling = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({ billingEmail });
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <form onSubmit={handleSaveGeneral}>
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Manage your account settings and set e-mail preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
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
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={saving}>
                  {saving ? "Saving…" : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>

        <TabsContent value="notifications">
          <form onSubmit={handleSaveNotifications}>
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose what notifications you want to receive.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="new-order">New Order Notifications</Label>
                  <Switch
                    id="new-order"
                    checked={notifications.newOrder}
                    onCheckedChange={(v: boolean) =>
                      setNotification("newOrder", v)
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="order-status">Order Status Updates</Label>
                  <Switch
                    id="order-status"
                    checked={notifications.orderStatus}
                    onCheckedChange={(v: boolean) =>
                      setNotification("orderStatus", v)
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="low-stock">Low Stock Alerts</Label>
                  <Switch
                    id="low-stock"
                    checked={notifications.lowStock}
                    onCheckedChange={(v: boolean) =>
                      setNotification("lowStock", v)
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="promotions">Promotional Emails</Label>
                  <Switch
                    id="promotions"
                    checked={notifications.promotions}
                    onCheckedChange={(v: boolean) =>
                      setNotification("promotions", v)
                    }
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={saving}>
                  {saving ? "Saving…" : "Save Preferences"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>

        <TabsContent value="security">
          <form onSubmit={handleSaveSecurity}>
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your password and 2FA settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
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
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="2fa">Enable Two-Factor Authentication</Label>
                  <Switch
                    id="2fa"
                    checked={twoFactorEnabled}
                    onCheckedChange={(v: boolean) => setTwoFactorEnabled(v)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={saving}>
                  {saving ? "Saving…" : "Update Security Settings"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>

        <TabsContent value="billing">
          <form onSubmit={handleSaveBilling}>
            <Card>
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
                <CardDescription>
                  Manage your billing details and view your plan.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Current Plan</h3>
                  <p>{data?.plan ? data.plan : "No active plan"}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Payment Method</h3>
                  <p>
                    {data?.paymentMethod
                      ? data.paymentMethod
                      : "No payment method on file"}
                  </p>
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
              <CardFooter>
                <Button type="submit" disabled={saving}>
                  {saving ? "Saving…" : "Update Billing Info"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}

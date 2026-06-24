"use client";

import React, { useState } from "react";
import {
  Bike,
  Star,
  Tag,
  Package,
  Bell,
  BellOff,
  CheckCheck,
  Mail,
  Smartphone,
} from "lucide-react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// ─── Types ──────────────────────────────────────────────────────────────────

type NotificationType = "delivery" | "review" | "deal" | "order";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface PreferenceChannel {
  email: boolean;
  push: boolean;
}

interface NotificationPreference {
  key: string;
  label: string;
  description: string;
  enabled: boolean;
  channels: PreferenceChannel;
}

// ─── Demo data (shown when no real notifications are available) ───────────────

const DEMO_NOTIFICATIONS: Notification[] = [
  {
    id: "d1",
    type: "delivery",
    title: "Your order is out for delivery!",
    message: "Order #ORD-1847 is on its way — your driver is 8 minutes away.",
    timestamp: "2 hours ago",
    read: false,
  },
  {
    id: "d2",
    type: "order",
    title: "Order confirmed by Amira's Cakes",
    message: "Your order #ORD-1847 has been confirmed and is being freshly prepared.",
    timestamp: "3 hours ago",
    read: false,
  },
  {
    id: "d3",
    type: "deal",
    title: "Flash deal: 15% off Artisan Pastries",
    message: "Today only — use code PASTRY15 at checkout. Offer ends at midnight.",
    timestamp: "Yesterday",
    read: true,
  },
  {
    id: "d4",
    type: "review",
    title: "Your review was published",
    message: "Your 5-star review for Chocolate Lava Cake is now live. Thank you!",
    timestamp: "2 days ago",
    read: true,
  },
  {
    id: "d5",
    type: "order",
    title: "Order delivered",
    message: "Your order #ORD-1831 was successfully delivered. Enjoy your treats!",
    timestamp: "3 days ago",
    read: true,
  },
];

// ─── Default preferences ─────────────────────────────────────────────────────

const INITIAL_PREFERENCES: NotificationPreference[] = [
  {
    key: "order_updates",
    label: "Order Updates",
    description: "Get notified when your order status changes",
    enabled: true,
    channels: { email: true, push: true },
  },
  {
    key: "delivery_updates",
    label: "Delivery Updates",
    description: "Track your delivery in real time",
    enabled: true,
    channels: { email: false, push: true },
  },
  {
    key: "new_arrivals",
    label: "New Arrivals",
    description: "Be first to know when favourite bakeries add new products",
    enabled: false,
    channels: { email: true, push: false },
  },
  {
    key: "deals",
    label: "Deals & Promotions",
    description: "Exclusive offers and flash sales",
    enabled: false,
    channels: { email: true, push: false },
  },
  {
    key: "reviews",
    label: "Reviews",
    description: "When someone responds to your review",
    enabled: true,
    channels: { email: true, push: true },
  },
  {
    key: "wishlist_alerts",
    label: "Wishlist Alerts",
    description: "When wishlisted items go on sale or come back in stock",
    enabled: false,
    channels: { email: false, push: false },
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function NotificationIcon({ type }: { type: NotificationType }) {
  const baseClass = "h-5 w-5";
  switch (type) {
    case "delivery":
      return (
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
          <Bike className={`${baseClass} text-blue-600`} />
        </span>
      );
    case "review":
      return (
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
          <Star className={`${baseClass} text-amber-600`} />
        </span>
      );
    case "deal":
      return (
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
          <Tag className={`${baseClass} text-green-600`} />
        </span>
      );
    case "order":
      return (
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
          <Package className={`${baseClass} text-orange-600`} />
        </span>
      );
  }
}

function NotificationItem({
  notification,
  onMarkRead,
}: {
  notification: Notification;
  onMarkRead: (id: string) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`group flex items-start gap-4 rounded-lg p-4 transition-colors cursor-pointer ${
        notification.read
          ? "hover:bg-gray-50"
          : "bg-amber-50/60 hover:bg-amber-50"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={(e) => {
        e.preventDefault();
        if (!notification.read) onMarkRead(notification.id);
      }}
    >
      <div className="shrink-0 mt-0.5">
        <NotificationIcon type={notification.type} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p
              className={`text-sm leading-snug ${
                notification.read ? "font-normal text-gray-700" : "font-semibold text-gray-900"
              }`}
            >
              {notification.title}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
              {notification.message}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {!notification.read && (
              <span className="h-2 w-2 rounded-full bg-blue-500 shrink-0" />
            )}
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {notification.timestamp}
            </span>
          </div>
        </div>
        {!notification.read && hovered && (
          <button
            className="mt-1.5 text-xs text-amber-700 hover:text-amber-900 font-medium underline-offset-2 hover:underline"
            onClick={(e) => {
              e.stopPropagation();
              onMarkRead(notification.id);
            }}
          >
            Mark as read
          </button>
        )}
      </div>
    </div>
  );
}

function ChannelToggle({
  label,
  icon: Icon,
  checked,
  onToggle,
  disabled,
}: {
  label: string;
  icon: React.ElementType;
  checked: boolean;
  onToggle: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <Switch
        checked={checked && !disabled}
        onCheckedChange={onToggle}
        disabled={disabled}
        className="h-4 w-7 data-[state=checked]:bg-amber-500"
      />
      <Icon className="h-3 w-3 text-muted-foreground" />
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(DEMO_NOTIFICATIONS);
  const [preferences, setPreferences] = useState<NotificationPreference[]>(INITIAL_PREFERENCES);

  const unreadCount = notifications.filter((n) => !n.read).length;

  function markRead(id: string) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read.");
  }

  function togglePreference(key: string) {
    setPreferences((prev) =>
      prev.map((p) => (p.key === key ? { ...p, enabled: !p.enabled } : p))
    );
  }

  function toggleChannel(key: string, channel: "email" | "push") {
    setPreferences((prev) =>
      prev.map((p) =>
        p.key === key
          ? { ...p, channels: { ...p.channels, [channel]: !p.channels[channel] } }
          : p
      )
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 py-8">
        {/* Page header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
              <Bell className="h-5 w-5 text-amber-700" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
              <p className="text-sm text-muted-foreground">
                Stay updated on your orders, deals, and more.
              </p>
            </div>
          </div>
        </header>

        {/* ── Notification Center ── */}
        <section className="mb-8">
          <Card className="overflow-hidden shadow-sm">
            <CardHeader className="pb-3 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold">
                    Notification Center
                  </CardTitle>
                  {unreadCount > 0 && (
                    <CardDescription className="mt-0.5">
                      {unreadCount} unread notification{unreadCount > 1 ? "s" : ""}
                    </CardDescription>
                  )}
                </div>
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-amber-700 hover:text-amber-900 hover:bg-amber-50 gap-1.5"
                    onClick={markAllRead}
                  >
                    <CheckCheck className="h-4 w-4" />
                    Mark all as read
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-0 divide-y divide-gray-100">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center gap-3 py-12 text-center">
                  <BellOff className="h-10 w-10 text-muted-foreground" />
                  <p className="text-sm font-semibold text-gray-700">All caught up!</p>
                  <p className="text-xs text-muted-foreground">No notifications right now.</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkRead={markRead}
                  />
                ))
              )}
            </CardContent>
          </Card>
        </section>

        {/* ── Notification Preferences ── */}
        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-900">
            Notification Preferences
          </h2>
          <Card className="shadow-sm">
            <CardContent className="p-0 divide-y divide-gray-100">
              {preferences.map((pref) => (
                <div key={pref.key} className="px-4 py-4 sm:px-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-gray-900">
                        {pref.label}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {pref.description}
                      </p>
                      {/* Channel sub-toggles */}
                      <div className="mt-2.5 flex items-center gap-4">
                        <ChannelToggle
                          label="Email"
                          icon={Mail}
                          checked={pref.channels.email}
                          onToggle={() => toggleChannel(pref.key, "email")}
                          disabled={!pref.enabled}
                        />
                        <ChannelToggle
                          label="Push"
                          icon={Smartphone}
                          checked={pref.channels.push}
                          onToggle={() => toggleChannel(pref.key, "push")}
                          disabled={!pref.enabled}
                        />
                      </div>
                    </div>
                    <Switch
                      checked={pref.enabled}
                      onCheckedChange={() => togglePreference(pref.key)}
                      className="mt-0.5 data-[state=checked]:bg-amber-500 shrink-0"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          <p className="mt-3 text-xs text-center text-muted-foreground">
            Transactional notifications (e.g. account security) are always sent regardless of these settings.
          </p>
        </section>
      </div>
    </div>
  );
}

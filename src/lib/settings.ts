// Settings domain types + defaults.
//
// Kept in a plain (non-"use server") module so both client components and
// the server-action service can import the constants/types. A "use server"
// file may only export async functions, so these can't live there.

export interface NotificationSettings {
  newOrder: boolean;
  orderStatus: boolean;
  lowStock: boolean;
  promotions: boolean;
}

export interface BusinessSettings {
  /** General tab. */
  storeName: string;
  storeDescription: string;
  storeAddress: string;
  phoneNumber: string;
  email: string;
  /** Notifications tab. */
  notifications: NotificationSettings;
  /** Security tab. */
  twoFactorEnabled: boolean;
  /** Billing tab. */
  billingEmail: string;
  plan?: string;
  paymentMethod?: string;
}

export const EMPTY_NOTIFICATIONS: NotificationSettings = {
  newOrder: false,
  orderStatus: false,
  lowStock: false,
  promotions: false,
};

export const EMPTY_SETTINGS: BusinessSettings = {
  storeName: "",
  storeDescription: "",
  storeAddress: "",
  phoneNumber: "",
  email: "",
  notifications: EMPTY_NOTIFICATIONS,
  twoFactorEnabled: false,
  billingEmail: "",
  plan: "",
  paymentMethod: "",
};

/** Fields the General tab can change. */
export interface UpdateGeneralInput {
  storeName: string;
  storeDescription: string;
  storeAddress: string;
  phoneNumber: string;
  email: string;
}

/** Security tab: change password / toggle 2FA. */
export interface UpdateSecurityInput {
  currentPassword?: string;
  newPassword?: string;
  twoFactorEnabled: boolean;
}

export type UpdateBusinessSettingsInput = Partial<
  UpdateGeneralInput & {
    notifications: NotificationSettings;
    billingEmail: string;
  } & UpdateSecurityInput
>;

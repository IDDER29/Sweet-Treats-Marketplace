// Domain models for Sweet Treats Marketplace.
//
// This frontend consumes an external REST API. These types describe the
// shapes exchanged with it. Where the backend contract is not yet pinned
// down, fields are optional and annotated so callers stay defensive.

export type ID = string;

export type UserRole = "customer" | "business" | "driver";

export type CurrencyCode = "USD" | "EUR" | "MAD" | "GBP";

export interface Money {
  amount: number;
  currency: CurrencyCode;
}

export interface ProductImage {
  url: string;
  name?: string;
  key?: string;
}

export type AvailabilityStatus = "In Stock" | "Out of Stock" | "Limited";

export interface Product {
  id: ID;
  name: string;
  price: number;
  category: string;
  description: string;
  ingredients?: string;
  allergens?: string;
  dietaryLabel?: string;
  calories?: number;
  macronutrients?: string;
  size?: string;
  weight?: string;
  shelfLife?: string;
  storageInstructions?: string;
  servingSuggestions?: string;
  variations?: string;
  customizationOptions?: string;
  seasonalAvailability?: string;
  availability?: AvailabilityStatus | string;
  images: ProductImage[];
  options?: string[];
  rating?: number;
  reviewCount?: number;
  storeId?: ID;
  createdAt?: string;
  updatedAt?: string;
}

export interface Address {
  fullName?: string;
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  postalCode?: string;
  country?: string;
  phone?: string;
  instructions?: string;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  productId: ID;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Order {
  id: ID;
  number?: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  status: OrderStatus;
  customerId?: ID;
  storeId?: ID;
  shippingAddress?: Address;
  paymentMethod?: string;
  createdAt: string;
  estimatedDeliveryAt?: string;
}

export interface Business {
  id: ID;
  name: string;
  email: string;
  phoneNumber?: string;
  businessType?: string;
  address?: string;
}

export interface Store {
  id: ID;
  name: string;
  description?: string;
  logoUrl?: string;
  coverUrl?: string;
  rating?: number;
  reviewCount?: number;
  deliveryFee?: number;
  deliveryTime?: string;
  address?: string;
  hours?: string;
  categories?: string[];
}

export interface Customer {
  id: ID;
  name: string;
  email: string;
  phone?: string;
  addresses?: Address[];
}

export interface DeliveryDriver {
  id: ID;
  name: string;
  email: string;
  phone?: string;
  available?: boolean;
  avatarUrl?: string;
}

export type DeliveryStatus =
  | "assigned"
  | "in_transit"
  | "delivered"
  | "cancelled";

export interface Delivery {
  id: ID;
  orderId: ID;
  driverId?: ID;
  status: DeliveryStatus;
  pickupAddress?: Address;
  dropoffAddress?: Address;
  etaMinutes?: number;
  createdAt: string;
}

export interface Review {
  id?: ID;
  productId?: ID;
  /** Some components use `author`, others `name`; both supported. */
  author?: string;
  name?: string;
  rating: number;
  comment: string;
  createdAt?: string;
}

/** Standard paginated list envelope. */
export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

/** Result envelope returned by the service layer (mirrors existing api.ts). */
export interface ApiResult<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

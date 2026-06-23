import OrdersList from "./OrdersList";

export const metadata = {
  title: "My Orders",
};

export default function CustomerOrdersPage() {
  // Middleware gates /customer/*; the order data itself is loaded client-side
  // through React Query so we get loading/error/empty states for free.
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">My Orders</h1>
        <p className="mt-1 text-muted-foreground">
          Track your past and current orders.
        </p>
      </header>

      <OrdersList />
    </div>
  );
}

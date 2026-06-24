import WishlistGrid from "./WishlistGrid";

export const metadata = {
  title: "My Wishlist",
};

export default function CustomerWishlistPage() {
  // Middleware gates /customer/*; wishlist data is loaded client-side via
  // React Query so loading/error/empty states are handled in the grid.
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">My Wishlist</h1>
        <p className="mt-1 text-muted-foreground">
          Treats you&apos;ve saved for later.
        </p>
      </header>

      <WishlistGrid />
    </div>
  );
}

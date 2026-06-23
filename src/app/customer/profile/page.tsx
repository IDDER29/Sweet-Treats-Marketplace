import { getCurrentUser } from "@/lib/auth-helpers";
import ProfileForm from "./ProfileForm";

export const metadata = {
  title: "My Profile",
};

export default async function CustomerProfilePage() {
  // Middleware gates /customer/*, but we also read the session here for
  // display (greeting + the email we show as read-only).
  const user = await getCurrentUser();

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">My Profile</h1>
        {user?.name && (
          <p className="mt-1 text-muted-foreground">
            Signed in as {user.name}
          </p>
        )}
      </header>

      <ProfileForm sessionEmail={user?.email ?? undefined} />
    </div>
  );
}

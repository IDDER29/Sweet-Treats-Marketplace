import Link from "next/link";
import { UserIcon, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { doLogout } from "@/app/actions";
import ShopingIcon from "./ShopingIcon";
import { MAIN_NAV } from "@/config";

const Navbar = async () => {
  const session = await auth();
  const role = session?.user?.role;

  // Role-aware account menu so the dropdown links actually go somewhere.
  const accountLinks =
    role === "business"
      ? [
          { href: "/business/dashboard", label: "Dashboard" },
          { href: "/business/profile", label: "Profile" },
          { href: "/business/settings", label: "Settings" },
        ]
      : role === "driver"
      ? [{ href: "/delivery-provider/dashboard", label: "Dashboard" }]
      : [
          { href: "/customer/profile", label: "My Profile" },
          { href: "/customer/orders", label: "My Orders" },
          { href: "/customer/wishlist", label: "Wishlist" },
        ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl">Sweet Treats</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium ml-auto">
          {MAIN_NAV.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}

          <ShopingIcon />

          {session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={session?.user?.image ?? ""}
                      alt="Account"
                    />
                    <AvatarFallback>
                      {session?.user?.name?.[0]?.toUpperCase() ?? "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {session?.user?.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session?.user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {accountLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link href={link.href}>{link.label}</Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <form action={doLogout} method="post">
                    <button
                      type="submit"
                      className="flex w-full items-center"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth/login" aria-label="Sign in">
              <UserIcon className="h-5 w-5" />
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

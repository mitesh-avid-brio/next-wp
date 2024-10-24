"use client";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo.svg";
import { mainMenu } from "@/menu.config";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MobileNav } from "./mobile-nav";
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux"; // Import useSelector

type NavProps = {
  className?: string;
  children?: React.ReactNode;
  id?: string;
};

export const Nav = ({ className, children, id }: NavProps) => {
  // Get the cart items count from the Redux store
  const cartItemsCount = useSelector((state: any) => state.cart.items.length); // Adjust selector based on your state shape

  return (
    <nav
      className={cn(
        "sticky z-50 top-0 bg-background",
        "border-b",
        "fade-in",
        className
      )}
      id={id}
    >
      <div
        id="nav-container"
        className="max-w-5xl mx-auto py-4 px-6 sm:px-8 flex justify-between items-center"
      >
        <Link
          className="hover:opacity-75 transition-all flex gap-2 items-center"
          href="/"
        >
          <h2 className="sr-only">next-wp starter</h2>
          <Image
            src={Logo}
            alt="Logo"
            className="dark:invert"
            width={84}
            height={30.54}
          />
        </Link>
        {children}
        <div className="flex items-center gap-2">
          <div className="mx-2 hidden md:flex">
            {Object.entries(mainMenu).map(([key, href]) => (
              <Button key={href} asChild variant="ghost" size="sm">
                <Link href={href}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Link>
              </Button>
            ))}
          </div>
          <Button asChild className="hidden sm:flex relative">
            <Link href="/checkout">
              <ShoppingCart size={32} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </nav>
  );
};

"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { ThemeSwitch } from "./theme-switch";
import NavbarDropdown from "./NavbarDropdown";
import { useUser } from "@/context/user.provider";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";

export const Navbar = () => {
  const { user, isLoading } = useUser();
  const cartCount = useSelector((state: any) => state.cart.totalItems); // Adjust selector as needed

  const router = useRouter();

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      {/* Left section with brand name */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <p className="font-bold text-inherit">Urbanhide</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden md:flex">
      <NavbarMenuItem>
            <Link href="/" size="lg" color="foreground">
              Home
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link href="/products" size="lg" color="foreground">
              Products
            </Link>
          </NavbarMenuItem>
      </NavbarContent>

      {/* Right section with Theme Switch, Cart Icon, and Login button */}
      <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        {/* Cart Icon with Badge */}
        <NavbarItem className="relative">
          <Button isIconOnly variant="flat" onClick={() => router.push("/cart")} aria-label="View Cart">
            <ShoppingCartIcon className="h-5 w-5 text-gray-800 dark:text-white" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Button>
        </NavbarItem>
        {user?.email ? (
          <NavbarItem className="hidden sm:flex gap-2">
            <NavbarDropdown />
          </NavbarItem>
        ) : (
          <NavbarItem className="hidden sm:flex gap-2">
            <Button onClick={() => router.push("/login")}>Login</Button>
          </NavbarItem>
        )}
      </NavbarContent>

      {/* Mobile view with Theme Switch and menu toggle */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
      <NavbarItem className="relative">
          <Button isIconOnly variant="flat" onClick={() => router.push("/cart")} aria-label="View Cart">
            <ShoppingCartIcon className="h-5 w-5 text-gray-800 dark:text-white" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Button>
        </NavbarItem>
        
      {user?.email ? (
          <NavbarItem className="sm:flex gap-2">
            <NavbarDropdown />
          </NavbarItem>
        ) : (
          <NavbarItem className="sm:flex gap-2">
            <Button onClick={() => router.push("/login")}>Login</Button>
          </NavbarItem>
        )}
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      {/* Navbar menu for mobile view */}
      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          <NavbarMenuItem>
            <Link href="/" size="lg" color="foreground">
              Home
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link href="/products" size="lg" color="foreground">
              Products
            </Link>
          </NavbarMenuItem>
         
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};

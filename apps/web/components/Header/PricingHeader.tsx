"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Brain, Sun, Moon, LogOut, LogIn, X, Menu } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import { useTheme } from "next-themes";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { ConnectKitButton } from "connectkit";
import { pricingitems } from "./pricingitems";

export default function PricingHeader({ amount }: { amount: any }) {
  const { theme, setTheme } = useTheme();
  const { address, isConnecting } = useAccount();
  const router = useRouter();
  const session = useSession();

  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
  };

  const handleSignIn = async () => {
    router.push("/login");
  };

  useEffect(() => {
    if (theme) {
      setIsDarkMode(theme === "dark");
    }
    setMounted(true);
  }, [theme]);

  if (!mounted) return null;

  return (
    <>
      <header className="px-4 lg:px-6 h-16 flex items-center backdrop-blur-md bg-white/30 dark:bg-gray-900/30 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-all duration-300">
        <Link className="flex items-center justify-center" href="/">
          <Brain className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          <span className="ml-2 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
            Bodhi
          </span>
        </Link>
        <div className="flex items-center ml-auto">
          <nav className="hidden xl:flex items-center gap-4 sm:gap-6">
            {pricingitems.length > 0 ? (
              pricingitems.map((item: any) => {
                const isTopup = item.name.toLowerCase() === "topup";

                if (isTopup && address) {
                  return (
                    <Link
                      className="text-sm font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                      href={item.href}
                      key={item.id}
                    >
                      {item.name}
                    </Link>
                  );
                }
                if (!isTopup) {
                  return (
                    <Link
                      className="text-sm font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                      href={item.href}
                      key={item.id}
                    >
                      {item.name}
                    </Link>
                  );
                }
              })
            ) : (
              <div>No items</div>
            )}
          </nav>
          {isConnecting ||
            (address && (
              <div className="text-sm font-medium ml-[12px]">
                Balance:{" "}
                <span className="text-green-600 dark:text-green-400">
                  {(Number(amount) / Number(1e18))?.toString()} BODHI
                </span>
              </div>
            ))}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
            aria-label="Toggle dark mode"
          >
            {mounted &&
              (isDarkMode ? (
                <Sun className="h-5 w-5 hover:text-purple-600" />
              ) : (
                <Moon className="h-5 w-5 hover:text-purple-600" />
              ))}
          </Button>
          <div className="hidden sm:flex">
            <ConnectKitButton />
          </div>
          {session.status !== "loading" && (
            <Button
              className="hidden lg:flex hover:text-purple-600"
              variant="ghost"
              size="sm"
              onClick={() =>
                session.status === "authenticated"
                  ? handleSignOut()
                  : handleSignIn()
              }
            >
              {session.status === "authenticated" ? (
                <LogOut className="w-4 h-4 mr-2" />
              ) : (
                <LogIn className="w-4 h-4 mr-2" />
              )}
              Log {session.status === "authenticated" ? "Out" : "In"}
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="xl:hidden hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </header>
      {/* Mobile Menu */}
      <div
        className={`xl:hidden fixed top-0 left-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md z-40 inset-0 duration-300 ease-in-out ${
          mobileMenuOpen
            ? "opacity-100 translate-x-100"
            : "opacity-0 translate-x-full"
        }`}
      >
        <div className="h-[60px]"></div>
        <nav className="flex flex-col space-y-4 p-4">
          {pricingitems.length > 0 ? (
            pricingitems.map((item: any) => {
              const isTopup = item.name.toLowerCase() === "topup";
              if (isTopup && address) {
                return (
                  <Link
                    className="text-sm font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-center p-2"
                    href={item.href}
                    key={item.id}
                  >
                    {item.name}
                  </Link>
                );
              }
              if (!isTopup) {
                return (
                  <Link
                    className="text-sm font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-center p-2"
                    href={item.href}
                    key={item.id}
                  >
                    {item.name}
                  </Link>
                );
              }
            })
          ) : (
            <div>No items</div>
          )}
          <div className="flex justify-center">
            <ConnectKitButton />
          </div>

          {session.status !== "loading" && (
            <Button
              variant="ghost"
              className="hover:text-purple-600"
              size="sm"
              onClick={() =>
                session.status === "authenticated"
                  ? handleSignOut()
                  : handleSignIn()
              }
            >
              {session.status === "authenticated" ? (
                <LogOut className="w-4 h-4 mr-2" />
              ) : (
                <LogIn className="w-4 h-4 mr-2" />
              )}
              Log {session.status === "authenticated" ? "Out" : "In"}
            </Button>
          )}
        </nav>
      </div>
    </>
  );
}

"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@repo/ui/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import { Brain, Moon, Sun, LogOut, X, Menu } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { signOut } from "next-auth/react";
import TokenUsage from "../TokenUsage";
import { useAccount } from "wagmi";
import { ConnectKitButton } from "connectkit";
import { chatnavitems } from "./chatnavitems";

interface Props {
  handleTokenUsage: () => void;
  isDisabled: boolean;
  token: number;
  amount: any;
}

export default function ChatHeader({
  handleTokenUsage,
  isDisabled,
  token,
  amount,
}: Props) {
  const { theme, setTheme } = useTheme();
  const { address, isConnecting } = useAccount();

  const [model, setModel] = useState("gemini");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [mounted, setMounted] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (theme) {
      setIsDarkMode(theme === "dark");
    }
    setMounted(true);
  }, [theme]);

  const handleSignOut = async () => {
    await signOut();
  };

  if (!mounted) return null;

  return (
    <>
      <header className="px-4 lg:px-6 h-16 flex items-center backdrop-blur-md bg-white/30 dark:bg-gray-900/30 border-b border-gray-200 dark:border-gray-700 w-full sticky top-0 z-50 transition-all duration-300">
        <Link className="flex items-center justify-center" href="/">
          <Brain className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          <span className="ml-2 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
            Bodhi
          </span>
        </Link>
        <div className="ml-auto flex items-center">
          <nav className="hidden xl:flex items-center space-x-4">
            {chatnavitems.length > 0 ? (
              chatnavitems.map((item: any) => {
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

            {isConnecting ||
              (address && (
                <div className="text-sm font-medium ml-[12px]">
                  Balance:{" "}
                  <span className="text-green-600 dark:text-green-400">
                    {(Number(amount) / Number(1e18))?.toString() || "0"} BODHI
                  </span>
                </div>
              ))}

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(isDarkMode ? "light" : "dark")}
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

            <Select value={model} onValueChange={setModel}>
              <SelectTrigger className="w-[180px] h-[36px] rounded-[4px]">
                <SelectValue placeholder="Select AI Model" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 rounded-[4px]">
                <SelectItem
                  className="cursor-pointer hover:text-purple-600"
                  value="gemini"
                >
                  Gemini
                </SelectItem>
              </SelectContent>
            </Select>

            <TokenUsage
              TokenUsage={handleTokenUsage}
              isDisabled={isDisabled}
              tokenCount={token}
            />
          </nav>

          <div className="hidden sm:flex ml-4">
            <ConnectKitButton />
          </div>
          {
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSignOut()}
              className="hidden sm:flex hover:text-purple-600 cursor-pointer"
            >
              <LogOut className="w-4 h-4 mr-2 cursor-pointer" />
              Log Out
            </Button>
          }
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
      {/* Mobile menu */}
      <div
        className={`xl:hidden fixed inset-0 z-40 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md transition-all duration-300 ease-in-out ${
          mobileMenuOpen
            ? "opacity-100 translate-x-100"
            : "opacity-0 translate-x-full"
        }`}
      >
        <div className="h-[60px]"></div>
        <nav className="flex flex-col space-y-4 p-4">
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger className="w-full rounded-[4px]">
              <SelectValue placeholder="Select AI Model" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 rounded-[4px]">
              <SelectItem
                className="cursor-pointer hover:text-purple-600"
                value="gemini"
              >
                Gemini
              </SelectItem>
            </SelectContent>
          </Select>
          <TokenUsage
            TokenUsage={handleTokenUsage}
            isDisabled={isDisabled}
            tokenCount={token}
          />
          {chatnavitems.length > 0 ? (
            chatnavitems.map((item: any) => {
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

          <Button
            variant="ghost"
            className="hover:text-purple-600"
            size="sm"
            onClick={() => handleSignOut()}
          >
            <LogOut className="w-4 h-4 mr-2 cursor-pointer" />
            Log Out
          </Button>
        </nav>
      </div>
    </>
  );
}

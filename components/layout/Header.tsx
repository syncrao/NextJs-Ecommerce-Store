"use client";
import { useState } from "react";
import { UserRound, Search, ShoppingCart, TextAlignStart } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import Link from "next/link";
import Menubar from "./MenuBar";

const Header = () => {
  console.log("Header component rendered");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const cartCount = useCartStore((state) =>
    state.cart.reduce((t, i) => t + i.qty, 0),
  );

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-50 transition-all duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className="sticky top-0 z-50 bg-transparent backdrop-blur-sm px-4 lg:px-8 py-2">
        <div className="flex items-center justify-between ">
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl hover:scale-105"
            >
              <TextAlignStart className="text-text h-10 w-10  p-2 rounded-full border border-border" />
            </button>
            <Link href="/">
              <div>
                <h1 className="text-xl font-bold text-accent">BIKANERI</h1>
                <p className="text-xs text-text-muted">BANDHEJ HOUSE</p>
              </div>
            </Link>
          </div>

          <div className="flex items-cemter space-x-4">
            <div className="flex items-center  md:bg-section rounded-xl md:px-6  md:w-90 hover:scale-105 transition-all duration-300 ">
              <Search className="h-9 text-text md:mr-3" />
              <input
                type="text"
                placeholder="Search Products by Name, Brand. . ."
                className="hidden md:block bg-section text-text placeholder- focus:outline-none flex-1"
              />
            </div>
            <Link href="/cart">
              <div className="relative flex items-center hover:scale-105 transition-all duration-300">
                <ShoppingCart className="h-8 " />

                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-2 min-w-5 h-5 flex items-center justify-center rounded-full bg-red-500 text-white text-xs font-semibold">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>
            <Link href="/admin">
              <div className=" flex items-center rounded-xl hover:scale-105 transition-all duration-300">
                <UserRound className="h-9" />
              </div>
            </Link>
          </div>
        </div>
      </div>
      <Menubar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </>
  );
};

export default Header;

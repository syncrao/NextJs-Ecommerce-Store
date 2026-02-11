"use client";
import { useState } from "react";
import { UserRound, Search, ShoppingCart, TextAlignStart } from "lucide-react";
import Menubar from "./MenuBar";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-50 transition-all duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className="sticky top-0 z-50 bg-transparent backdrop-blur-sm px-6 py-2">
        <div className="flex items-center justify-between ">
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl hover:scale-105"
            >
              <TextAlignStart className="text-text h-10 w-10  p-2 rounded-full border border-border" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-accent">BIKANERI</h1>
              <p className="text-xs text-text-muted">BANDHEJ HOUSE</p>
            </div>
          </div>

          <div className="flex items-cemter space-x-4">
            <div className="flex items-center  md:bg-section rounded-xl md:px-6  md:w-90 hover:scale-105 transition-all duration-300 ">
              <Search className="h-10 text-text md:mr-3" />
              <input
                type="text"
                placeholder="Search Products by Name, Brand. . ."
                className="hidden md:block bg-section text-text placeholder- focus:outline-none flex-1"
              />
            </div>
            <div className=" flex items-center rounded-xl hover:scale-105 transition-all duration-300">
              <ShoppingCart className="h-9" />
            </div>
            <div className=" flex items-center rounded-xl hover:scale-105 transition-all duration-300">
              <UserRound className="h-9" />
            </div>
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

"use client";
import { CircleUserRound, Search, ShoppingCart, TextAlignStart } from "lucide-react";

const Header = () => {
  return (
    <div className="bg-white/10 px-6 py-2 border-b border-white/20  backdrop-blur-xl">
      <div className="flex items-center justify-between ">
        <div className="flex items-center space-x-6">
          <button className="lg:hidden text-white/70 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-all">
            <TextAlignStart className="text-gray-800 h-10 w-10  p-2 rounded-full border border-gray-500 " />
          </button>
        </div>

        <div className="flex items-cemter space-x-4">
          <div className=" md:flex items-center bg-black/70 backdrop-blur-xl border border-white/20 rounded-xl md:px-6 p-2 md:w-90 group hover:bg-white/20 transition-all duration-300">
            <Search className="h-5 w-5 text-white/50 md:mr-3 group-hover:text-white/70 transition-all" />
            <input
              type="text"
              placeholder="Search Anything with AI....."
              className="hidden md:block bg-transparent text-white placeholder-white/50 focus:outline-none flex-1"
            />
          </div>
          <div className="bg-black/30 p-2 flex items-center rounded-xl">
              <ShoppingCart className="p-1"/>
          </div>
        <div className="bg-gray-icon flex items-center rounded-full p-2">
              <CircleUserRound className="text-blue-200"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

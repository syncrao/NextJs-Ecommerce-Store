import { Crown, Rocket, Shirt, X } from "lucide-react";
import { menuItems } from "./layoutData";

interface MenuProps {
    sidebarOpen: boolean,
    setSidebarOpen: (value: boolean) => void,
    activeTab: string,
    setActiveTab: (value: string) => void
}

export default function Menubar({sidebarOpen, setSidebarOpen, activeTab, setActiveTab, }:MenuProps) {
  return (
    <div
      className={`${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } fixed inset-y-0 left-0 z-60 w-80 
      bg-surface border-r border-border
      transform transition-all duration-500 ease-out
      lg:hidden lg:static lg:inset-0`}
    >
      
      <div className="flex items-center justify-between h-16 px-8 border-b border-border">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center">
            <Shirt className="h-6 w-6 text-text-inverse" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-accent">
              BIKANERI
            </h1>
            <p className="text-xs text-text-muted">
              BANDHEJ HOUSE
            </p>
          </div>
        </div>

        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden text-text-muted hover:text-text p-2 rounded-xl transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="mt-8 px-6 space-y-2">
        {menuItems.map((items) => (
          <button
            key={items.id}
            className={`w-full flex items-center px-6 py-4 text-left rounded-2xl transition-all duration-300
              ${
                activeTab === items.id
                  ? "bg-accent/10 text-accent border border-accent"
                  : "text-text-muted hover:text-text hover:bg-section"
              }`}
            onClick={() => {
              setActiveTab(items.id);
              setSidebarOpen(false);
            }}
          >
            <div
              className={`p-2 rounded-xl mr-4 transition-all duration-300
                ${
                  activeTab === items.id
                    ? "bg-accent text-text-inverse"
                    : "bg-section text-text-muted"
                }`}
            >
              <items.icon className="h-5 w-5" />
            </div>

            <span className="font-medium">{items.label}</span>
          </button>
        ))}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="bg-section rounded-3xl p-6 border border-border">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-accent rounded-xl">
              <Crown className="text-text-inverse h-5 w-5" />
            </div>
            <div>
              <h3 className="text-text font-semibold">
                MORE DISCOUNTS
              </h3>
              <p className="text-text-muted text-xs">
                Create Your Account
              </p>
            </div>
          </div>

          <button className="w-full bg-brand text-text-inverse py-2 rounded-2xl font-semibold hover:bg-brand-hover transition-all duration-300">
            <Rocket className="w-4 h-4 inline mr-2" />
            Create Now
          </button>
        </div>
      </div>
    </div>
  );
}

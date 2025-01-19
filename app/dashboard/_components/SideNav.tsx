"use client";

import { FileClock, HomeIcon, SettingsIcon, WalletIcon } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import UsageTrack from "./UsageTrack";



function SideNav() {
  const router = useRouter(); // For programmatic navigation
  const path = usePathname(); // Current path

  const MenuList = [
    {
      name: "Home",
      icon: HomeIcon,
      path: "/dashboard",
    },
    {
      name: "History",
      icon: FileClock,
      path: "/dashboard/History", // Ensure this matches the actual route
    },
    {
      name: "Billing",
      icon: WalletIcon,
      path: "/dashboard/Billing",
    },
    {
      name: "Setting",
      icon: SettingsIcon,
      path: "/dashboard/Settings",
    },
  ];

  const handleNavigation = (menuPath: string) => {
    console.log("Navigating to:", menuPath); // Debug log
    router.push(menuPath);
  };

  return (
    <div className="h-screen relative p-5 shadow-sm border bg-white">
      <div className="flex justify-center space-x-2">
        <Image src="/logo.svg" width={30} height={30} alt="logo" />
          <a href="#" className="logo text-violet-700 font-bold text-xl">
            Inspire<span className="text-violet-700">AI</span>
          </a>
      </div>
      <hr className="my-6 border" />
      <div className="mt-3">
        {MenuList.map((menu) => (
          <div
            key={menu.path}
            className={`flex gap-2 mb-2 p-5 hover:bg-primary hover:text-white rounded-lg cursor-pointer items-center ${
              path === menu.path && "bg-primary text-white"
            }`}
            onClick={() => handleNavigation(menu.path)} // Trigger navigation
          >
            <menu.icon className="h-6 w-6" />
            <h2 className="text-lg">{menu.name}</h2>
          </div>
        ))}
      </div>
      <div className="absolute bottom-10 left-0 w-full">
        <UsageTrack />
      </div>
    </div>
  );
}

export default SideNav;

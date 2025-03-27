"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, UserPlus, LogOut } from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/", icon: <Home size={20} /> },
    { name: "Add User", href: "/add-user", icon: <UserPlus size={20} /> },
  ];

  return (
    <div className="w-64 h-screen bg-white shadow-md fixed flex flex-col">
      {/* Company Logo */}
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-green-700">Admin Panel</h2>
      </div>

      {/* Sidebar Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Link key={item.name} href={item.href}>
            <div
              className={`flex items-center gap-3 px-4 py-3 rounded-md cursor-pointer transition-all ${
                pathname === item.href ? "bg-green-100 text-green-700 font-semibold" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.icon}
              {item.name}
            </div>
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4">
        <button className="flex items-center gap-2 px-4 py-2 w-full text-red-600 font-semibold rounded-md hover:bg-red-100">
          <LogOut size={20} />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
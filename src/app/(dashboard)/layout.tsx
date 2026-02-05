"use client";

import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import AIFloatingBar from "@/components/AIFloatingBar";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className="flex h-full w-full overflow-hidden">
      <Sidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <TopHeader onMobileNavOpen={handleDrawerToggle} />
        <main className="flex-1 overflow-y-auto p-8 transition-colors duration-200">
          {children}
        </main>
      </div>
      <AIFloatingBar />
    </div>
  );
}

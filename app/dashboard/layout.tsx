"use client";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { StaffSidebar } from "@/components/layout/Sidebar/StaffSidebar";
import StaffHeader from "@/components/layout/Header/StaffHeader";
import StaffBreadcrumb from "@/components/layout/Breadcrumb/StaffBreadcrumb";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <StaffSidebar />
      <SidebarInset className="bg-background flex flex-col min-w-0 h-screen overflow-hidden transition-all duration-300">
        <StaffHeader />
        <StaffBreadcrumb />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden h-full">
          <div className="flex-1 overflow-auto min-h-0 h-full">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

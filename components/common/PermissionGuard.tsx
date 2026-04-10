"use client";

import { useStaffMe } from "@/hooks/use-staff-auth";
import { ShieldOff } from "lucide-react";
import { useMemo } from "react";

interface PermissionGuardProps {
  permission: string;
  children: React.ReactNode;
}

export function PermissionGuard({ permission, children }: PermissionGuardProps) {
  const { data: staff, isLoading, isFetching } = useStaffMe();

  const hasPermission = useMemo(() => {
    if (!staff?.role?.permissions) return false;
    return staff.role.permissions.some((p) => p.slug === permission);
  }, [staff, permission]);

  // Block until we have fresh data — both initial load and background refetch
  if (isLoading || isFetching) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-86px)]">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!hasPermission) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-86px)] gap-4 text-center px-4">
        <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center">
          <ShieldOff size={28} className="text-rose-500" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">Access Denied</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            You don&apos;t have permission to view this page.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

export interface StaffPermission {
  id: number;
  name: string;
  slug: string;
  module: string;
}

export interface StaffRole {
  id: number;
  name: string;
  slug: string;
  permissions?: StaffPermission[];
}

export interface StaffProfile {
  id: number;
  name: string;
  email: string;
  emp_id: string;
  designation: string;
  mobile: string;
  profile_pic: string | null;
  vendor_id: number;
  company_id: number | null;
  role_id: number | null;
  role?: StaffRole | null;
  vendor?: { id: number; company_name: string; company_logo: string | null };
}

const fetchMe = async (): Promise<StaffProfile> => {
  const res = await axios.get("/api/proxy/v1/vendors/staff/auth/me", { withCredentials: true });
  return res.data?.data?.staff;
};

export function useStaffMe() {
  return useQuery({
    queryKey: ["staff-me"],
    queryFn: fetchMe,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpdateStaffProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<StaffProfile>) => {
      const res = await axios.put("/api/proxy/v1/vendors/staff/auth/profile", data, { withCredentials: true });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff-me"] });
      toast.success("Profile updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update profile");
    },
  });
}

export function useStaffLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      try {
        await axios.post("/api/proxy/v1/vendors/staff/auth/logout", {}, { withCredentials: true });
      } catch { /* ignore */ }
      await fetch("/api/logout", { method: "POST" });
      if (typeof document !== "undefined") {
        document.cookie = "staff_auth_pending=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax";
      }
    },
    onSuccess: () => {
      queryClient.clear();
      router.push("/login");
    },
  });
}

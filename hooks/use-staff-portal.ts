"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface StaffPortalClient {
  id: number;
  client_id: string;
  vendor_id: number;
  name: string;
  mobile: string;
  email: string;
  profile_pic: string | null;
  registration_type: "guest" | "client";
  plan: "silver" | "gold" | "platinum" | "standard" | "not_subscribed";
  is_active: 0 | 1 | 2;
  login_access: 0 | 1;
  address: string | null;
  country: string | null;
  state: string | null;
  city: string | null;
  locality: string | null;
  pincode: string | null;
  createdAt: string;
}

export interface StaffPortalStaff {
  id: number;
  vendor_id: number;
  emp_id: string;
  name: string;
  email: string;
  mobile: string;
  designation: string;
  doj: string | null;
  dob: string | null;
  profile_pic: string | null;
  is_active: 0 | 1 | 2;
  login_access: boolean;
  role_id: number | null;
  role?: { id: number; name: string; slug: string };
}

export interface StaffPortalRole {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  is_active: 0 | 1;
  vendor_id: number;
  permissions?: { id: number; name: string; slug: string; module: string }[];
}

export interface StaffPortalPermission {
  id: number;
  name: string;
  slug: string;
  module: string;
  module_id: number | null;
  moduleRef?: { id: number; name: string; slug: string } | null;
}

export interface StaffPortalModule {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  permissions: StaffPortalPermission[];
}

export interface Pagination {
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  total?: number;
}

// ─── Clients ──────────────────────────────────────────────────────────────────

export const useStaffPortalClients = (params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: number;
  plan?: string;
  sort_by?: string;
  sort_order?: "ASC" | "DESC";
}) => {
  return useQuery({
    queryKey: ["staff-portal-clients", params],
    queryFn: async () => {
      const res = await apiClient.get("/vendors/staff/portal/clients", { params });
      return res.data.data as { data: StaffPortalClient[]; pagination: Pagination };
    },
  });
};

export const useStaffPortalClient = (id: string | number | undefined) => {
  return useQuery({
    queryKey: ["staff-portal-clients", id],
    queryFn: async () => {
      const res = await apiClient.get(`/vendors/staff/portal/clients/${id}`);
      return res.data.data?.client as StaffPortalClient;
    },
    enabled: !!id,
  });
};

export const useUpdateStaffPortalClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number | string; data: Partial<StaffPortalClient> }) => {
      const res = await apiClient.put(`/vendors/staff/portal/clients/${id}`, data);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff-portal-clients"] });
      toast.success("Client updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update client");
    },
  });
};

export const useUpdateClientStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, is_active }: { id: number | string; is_active: number }) => {
      const res = await apiClient.patch(`/vendors/staff/portal/clients/${id}`, { is_active });
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff-portal-clients"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update client status");
    },
  });
};

export const useUpdateClientLoginAccess = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, login_access }: { id: number | string; login_access: number }) => {
      const res = await apiClient.put(`/vendors/staff/portal/clients/${id}`, { login_access });
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff-portal-clients"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update login access");
    },
  });
};

export const useDeleteStaffPortalClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number | string) => {
      await apiClient.delete(`/vendors/staff/portal/clients/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff-portal-clients"] });
      toast.success("Client deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete client");
    },
  });
};

export const useDeleteStaffPortalStaffMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number | string) => {
      await apiClient.delete(`/vendors/staff/portal/staff/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff-portal-staff"] });
      toast.success("Staff deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete staff");
    },
  });
};

export const useDeleteStaffPortalRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number | string) => {
      await apiClient.delete(`/vendors/staff/portal/roles/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff-portal-roles"] });
      toast.success("Role deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete role");
    },
  });
};

// ─── Staff ────────────────────────────────────────────────────────────────────

export const useStaffPortalStaff = (params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: number;
  sort_by?: string;
  sort_order?: "ASC" | "DESC";
}) => {
  return useQuery({
    queryKey: ["staff-portal-staff", params],
    queryFn: async () => {
      const res = await apiClient.get("/vendors/staff/portal/staff", { params });
      return res.data.data as { data: StaffPortalStaff[]; pagination: Pagination };
    },
  });
};

export const useStaffPortalStaffById = (id: string | number | undefined) => {
  return useQuery({
    queryKey: ["staff-portal-staff", id],
    queryFn: async () => {
      const res = await apiClient.get(`/vendors/staff/portal/staff/${id}`);
      const staffData = res.data.data?.staff;
      if (staffData?.role && !Array.isArray(staffData.role.permissions)) {
        return { ...staffData, role: { ...staffData.role, permissions: [] } } as StaffPortalStaff;
      }
      return staffData as StaffPortalStaff;
    },
    enabled: !!id,
  });
};

// ─── Roles ────────────────────────────────────────────────────────────────────

export const useStaffPortalRoles = (params?: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  return useQuery({
    queryKey: ["staff-portal-roles", params],
    queryFn: async () => {
      const res = await apiClient.get("/vendors/staff/portal/roles", { params });
      return res.data.data.data as StaffPortalRole[];
    },
  });
};

export const useStaffPortalRole = (id: string | number | undefined) => {
  return useQuery({
    queryKey: ["staff-portal-roles", id],
    queryFn: async () => {
      const res = await apiClient.get(`/vendors/staff/portal/roles/${id}`);
      const roleData = res.data.data?.role;
      if (roleData && !Array.isArray(roleData.permissions)) {
        return { ...roleData, permissions: [] } as StaffPortalRole;
      }
      return roleData as StaffPortalRole;
    },
    enabled: !!id,
  });
};

// ─── Modules & Permissions ───────────────────────────────────────────────────

export const useStaffPortalModules = () => {
  return useQuery({
    queryKey: ["staff-portal-modules"],
    queryFn: async () => {
      const res = await apiClient.get("/vendors/staff/portal/modules");
      const modules = res.data.data?.modules;
      if (Array.isArray(modules)) return modules as StaffPortalModule[];
      if (Array.isArray(modules?.data)) return modules.data as StaffPortalModule[];
      return [] as StaffPortalModule[];
    },
    staleTime: 10 * 60 * 1000,
  });
};

export const useStaffPortalPermissions = () => {
  return useQuery({
    queryKey: ["staff-portal-permissions"],
    queryFn: async () => {
      const res = await apiClient.get("/vendors/staff/portal/permissions");
      const permissions = res.data.data?.permissions;
      if (Array.isArray(permissions)) return permissions as StaffPortalPermission[];
      if (Array.isArray(permissions?.data)) return permissions.data as StaffPortalPermission[];
      return [] as StaffPortalPermission[];
    },
    staleTime: 10 * 60 * 1000,
  });
};

// ─── Activity Log ─────────────────────────────────────────────────────────────

export interface StaffPortalActivityLog {
  id: number;
  vendor_id: number;
  user_type: string;
  user_id: number;
  action: string;
  module: string;
  ip_address: string | null;
  user_agent: string | null;
  status: 'success' | 'failed';
  details: any;
  createdAt: string;
}

export const useStaffPortalActivityLog = (params?: {
  page?: number;
  limit?: number;
  module?: string;
  search?: string;
}) => {
  return useQuery({
    queryKey: ["staff-portal-activity-logs", params],
    queryFn: async () => {
      // NOTE: uses staff specific endpoint
      const res = await apiClient.get("/vendors/staff/portal/activity-logs", { params });
      return res.data.data as { data: StaffPortalActivityLog[]; pagination: Pagination };
    },
  });
};

// --- Added for compatibility with copied Vendor components ---

export const useCreateStaffPortalClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await apiClient.post("/vendors/staff/portal/clients", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff-portal-clients"] });
      toast.success("Client created successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create client");
    },
  });
};

export const useCreateVendorStaff = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      // NOTE: endpoint must be staff portal staff
      const res = await apiClient.post("/vendors/staff/portal/staff", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff-portal-staff"] });
      toast.success("Staff created successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create staff");
    },
  });
};

export const useUpdateVendorStaff = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string | number; data: any }) => {
      const res = await apiClient.put(`/vendors/staff/portal/staff/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff-portal-staff"] });
      toast.success("Staff updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update staff");
    },
  });
};

export const useUpdateStaffStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, is_active }: { id: string | number; is_active: number }) => {
      const res = await apiClient.put(`/vendors/staff/portal/staff/${id}/status`, { is_active });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff-portal-staff"] });
      toast.success("Staff status updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update staff status");
    },
  });
};

export const useCreateVendorRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await apiClient.post("/vendors/staff/portal/roles", data);
      const roleData = res.data.data;
      if (roleData && !Array.isArray(roleData.permissions)) {
        return { ...roleData, permissions: [] };
      }
      return roleData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff-portal-roles"] });
      toast.success("Role created successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create role");
    },
  });
};

export const useUpdateVendorRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string | number; data: any }) => {
      const res = await apiClient.put(`/vendors/staff/portal/roles/${id}`, data);
      const roleData = res.data.data;
      if (roleData && !Array.isArray(roleData.permissions)) {
        return { ...roleData, permissions: [] };
      }
      return roleData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff-portal-roles"] });
      toast.success("Role updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update role");
    },
  });
};

export const useAssignPermissions = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ roleId, permissions }: { roleId: string | number; permissions: any[] }) => {
      const payload = { permissions: permissions };
      const res = await apiClient.put(`/vendors/staff/portal/roles/${roleId}/permissions`, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff-portal-roles"] });
      toast.success("Permissions assigned successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to assign permissions");
    },
  });
};

export const useVendorModules = useStaffPortalModules;
export type VendorRole = StaffPortalRole;
export type VendorModule = StaffPortalModule;
export type VendorPermission = StaffPortalPermission;
export type VendorStaff = StaffPortalStaff;
export type VendorClient = StaffPortalClient;


import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api-client';
import { toast } from 'sonner';

// ─── About / Profile ──────────────────────────────────────────────────────────

export interface StaffPortalAbout {
  id: number;
  company_name: string;
  company_logo: string | null;
  company_contact: string | null;
  company_email: string | null;
  company_address: string | null;
  contact: string | null;
  alt_contact: string | null;
  alt_email: string | null;
  address: string | null;
  alt_address: string | null;
  about_us: string | null;
  short_description: string | null;
  website: string | null;
  youtube: string | null;
  facebook: string | null;
  instagram: string | null;
  twitter: string | null;
  linkedin: string | null;
  whatsapp: string | null;
  tiktok: string | null;
  telegram: string | null;
  pinterest: string | null;
  copywrite: string | null;
  poweredby: string | null;
  social_visibility?: Record<string, boolean> | null;
  footer_links?: { heading: string; page_ids: number[] }[] | null;
  nav_menu?: { label: string; page_ids: number[]; order: number; children: { page_id: number; label: string; order: number }[] }[] | null;
  district?: { id: number; name: string } | null;
  locality?: { id: number; name: string; pincode: string } | null;
}

const ABOUT_KEY = ['staff-portal-about'] as const;

export const useStaffPortalAbout = () => {
  return useQuery({
    queryKey: ABOUT_KEY,
    queryFn: async () => {
      const res = await apiClient.get('/vendors/staff/portal/website/about');
      return res.data.data as StaffPortalAbout;
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useUpdateStaffPortalAbout = (successMessage?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<StaffPortalAbout>) => {
      const res = await apiClient.put('/vendors/staff/portal/website/about', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ABOUT_KEY });
      toast.success(successMessage ?? 'About company updated successfully');
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || 'Failed to update');
    },
  });
};

// ─── Pages ────────────────────────────────────────────────────────────────────

export interface StaffPortalPage {
  id: number;
  name: string;
  description: string | null;
  content: string | null;
  is_active: number;
  vendor_id: number;
  company_id: number | null;
  createdAt: string;
  created_at: string;
  updated_at: string;
}

export interface StaffPortalPagesResponse {
  data: StaffPortalPage[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

const PAGES_KEY = ['staff-portal-pages'] as const;

export const useStaffPortalPages = (params?: {
  page?: number;
  limit?: number;
  search?: string;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}) => {
  return useQuery({
    queryKey: [...PAGES_KEY, params],
    queryFn: async () => {
      const res = await apiClient.get('/vendors/staff/portal/pages', { params });
      return res.data.data as StaffPortalPagesResponse;
    },
    staleTime: 30 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useStaffPortalPage = (id: number | null) => {
  return useQuery({
    queryKey: [...PAGES_KEY, id],
    queryFn: async () => {
      const res = await apiClient.get(`/vendors/staff/portal/pages/${id}`);
      return res.data.data as StaffPortalPage;
    },
    enabled: !!id,
    staleTime: 30 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useCreateStaffPortalPage = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: { name: string; description?: string; content?: string }) => {
      const res = await apiClient.post('/vendors/staff/portal/pages', data);
      return res.data.data as StaffPortalPage;
    },
    onSuccess: (page) => {
      queryClient.invalidateQueries({ queryKey: PAGES_KEY });
      toast.success(`Page "${page.name}" created successfully`);
      router.push('/dashboard/website/pages');
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || 'Failed to create page');
    },
  });
};

export const useUpdateStaffPortalPage = (id: number) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: { name?: string; description?: string; content?: string }) => {
      const res = await apiClient.put(`/vendors/staff/portal/pages/${id}`, data);
      return res.data.data as StaffPortalPage;
    },
    onSuccess: (page) => {
      queryClient.invalidateQueries({ queryKey: PAGES_KEY });
      toast.success(`Page "${page.name}" updated successfully`);
      router.push('/dashboard/website/pages');
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || 'Failed to update page');
    },
  });
};

export const useDeleteStaffPortalPage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await apiClient.delete(`/vendors/staff/portal/pages/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PAGES_KEY });
      toast.success('Page deleted successfully');
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || 'Failed to delete page');
    },
  });
};

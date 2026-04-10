'use client';

import { useState, useEffect } from 'react';
import { useStaffMe, useUpdateStaffProfile, StaffProfile } from '@/hooks/use-staff-auth';

export function SettingsTab() {
  const { data: staff, isLoading } = useStaffMe();
  const updateProfile = useUpdateStaffProfile();

  const [formData, setFormData] = useState<Partial<StaffProfile>>({ name: '', mobile: '' });

  useEffect(() => {
    if (staff) setFormData({ name: staff.name || '', mobile: staff.mobile || '' });
  }, [staff]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile.mutate(formData);
  };

  if (isLoading) return (
    <div className="animate-pulse space-y-4 pt-10">
      <div className="h-10 bg-muted rounded w-full" />
      <div className="h-10 bg-muted rounded w-full" />
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl">
        <div className="space-y-2">
          <label className="block text-foreground text-[14px] font-bold">Full Name</label>
          <input name="name" type="text" value={formData.name || ''} onChange={handleChange} className="w-full px-4 py-2 bg-background border border-border rounded-[5px] text-[14px] text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm" />
        </div>
        <div className="space-y-2">
          <label className="block text-foreground text-[14px] font-bold">Email Address</label>
          <input value={staff?.email || ''} type="email" className="w-full px-4 py-2 bg-muted border border-border rounded-[5px] text-[14px] text-muted-foreground cursor-not-allowed shadow-none" readOnly />
        </div>
        <div className="space-y-2">
          <label className="block text-foreground text-[14px] font-bold">Mobile</label>
          <input name="mobile" type="text" value={formData.mobile || ''} onChange={handleChange} className="w-full px-4 py-2 bg-background border border-border rounded-[5px] text-[14px] text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm" />
        </div>
        <button type="submit" disabled={updateProfile.isPending} className="bg-primary text-white px-8 py-3 rounded-[5px] text-[13px] font-bold hover:bg-primary/90 transition-all shadow-md uppercase tracking-wider flex items-center gap-2 disabled:opacity-50">
          {updateProfile.isPending ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useStaffMe, useUpdateStaffProfile, StaffProfile } from '@/hooks/use-staff-auth';
import { SidebarProfileCard } from './sidebar-profile-card';
import { LocationCard } from './location-card';

const cardClass = 'bg-card rounded-[5px] border border-border overflow-hidden shadow-sm dark:shadow-none mb-6 font-["Roboto",sans-serif]';

export function StaffEditProfileContent() {
  const { data: staff, isLoading } = useStaffMe();
  const updateProfile = useUpdateStaffProfile();

  const [formData, setFormData] = useState<Partial<StaffProfile>>({
    name: '',
    email: '',
    mobile: '',
  });

  useEffect(() => {
    if (staff) {
      setFormData({
        name: staff.name || '',
        email: staff.email || '',
        mobile: staff.mobile || '',
      });
    }
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
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
    </div>
  );

  return (
    <div className="bg-background min-h-screen -mt-6 -mx-6 -mb-6 p-6 font-['Roboto',sans-serif]">
      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        <div className="w-full lg:w-[380px] shrink-0 space-y-6">
          <SidebarProfileCard staff={staff} />
          <LocationCard />
        </div>

        <div className="flex-1 min-w-0 flex flex-col">
          <div className={`${cardClass} flex-1 flex flex-col mb-0 overflow-hidden`}>
            <div className="flex-1 overflow-y-auto p-8">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <h6 className="text-foreground text-[13px] font-bold uppercase tracking-wider mb-5 mt-2">PERSONAL INFO</h6>
                  <div className="space-y-[18px]">
                    <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
                      <label className="text-[14px] text-foreground font-normal md:col-span-1">Full Name</label>
                      <div className="md:col-span-3">
                        <input name="name" type="text" value={formData.name || ''} onChange={handleChange} className="w-full px-4 py-[9px] border border-border bg-card text-foreground rounded-[3px] text-[14px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Full Name" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
                      <label className="text-[14px] text-foreground font-normal md:col-span-1">Email</label>
                      <div className="md:col-span-3">
                        <input name="email" type="email" value={formData.email || ''} readOnly className="w-full px-4 py-[9px] border border-border bg-muted/50 text-muted-foreground rounded-[3px] text-[14px] cursor-not-allowed" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
                      <label className="text-[14px] text-foreground font-normal md:col-span-1">Mobile</label>
                      <div className="md:col-span-3">
                        <input name="mobile" type="text" value={formData.mobile || ''} onChange={handleChange} className="w-full px-4 py-[9px] border border-border bg-card text-foreground rounded-[3px] text-[14px] focus:outline-none focus:border-primary transition-all" placeholder="Mobile number" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-border pt-6">
                  <button
                    type="submit"
                    disabled={updateProfile.isPending}
                    className="bg-primary text-white px-[30px] py-[12px] text-[14px] font-bold rounded-[5px] hover:bg-primary/90 transition-all disabled:opacity-70 shadow-lg shadow-primary/20 flex items-center gap-2"
                  >
                    {updateProfile.isPending ? 'Updating...' : 'Update Profile'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

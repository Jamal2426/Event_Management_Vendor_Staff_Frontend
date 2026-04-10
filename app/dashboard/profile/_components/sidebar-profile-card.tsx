'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StaffProfile } from '@/hooks/use-staff-auth';

const cardClass = 'bg-card rounded-[5px] border border-border overflow-hidden shadow-sm dark:shadow-none mb-6 font-["Roboto",sans-serif]';

interface SidebarProfileCardProps {
  staff: StaffProfile | undefined;
}

export function SidebarProfileCard({ staff }: SidebarProfileCardProps) {
  const initials = staff?.name
    ? staff.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'ST';

  return (
    <div className={`${cardClass} p-8 text-center`}>
      <div className="relative inline-block mb-6">
        <Avatar className="w-[124px] h-[124px] border border-border p-[4px] bg-card rounded-full">
          <AvatarImage src={staff?.profile_pic || ''} className="object-cover rounded-full" />
          <AvatarFallback className="bg-gradient-to-br from-[#0162e8] to-[#0156cc] text-white font-bold text-4xl rounded-full">
            {initials}
          </AvatarFallback>
        </Avatar>
      </div>

      <h5 className="text-foreground text-[22px] font-bold mb-1">{staff?.name || 'Staff Name'}</h5>
      <p className="text-muted-foreground text-[13px] mb-6">{staff?.designation || 'Staff'}</p>

      <div className="text-left mb-6">
        <h6 className="text-foreground text-[15px] font-bold mb-2">Email</h6>
        <p className="text-muted-foreground text-[13px] leading-relaxed truncate">{staff?.email}</p>
      </div>

      {staff?.mobile && (
        <div className="text-left mb-6">
          <h6 className="text-foreground text-[15px] font-bold mb-2">Mobile</h6>
          <p className="text-muted-foreground text-[13px]">{staff.mobile}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-0 border-t border-border pt-6 mb-6">
        <div className="text-center border-r border-border">
          <p className="text-foreground text-[18px] font-bold leading-none">{staff?.emp_id || 'N/A'}</p>
          <p className="text-muted-foreground text-[12px] mt-1">Emp ID</p>
        </div>
        <div className="text-center">
          <p className="text-foreground text-[14px] font-bold leading-none uppercase px-1 truncate">{staff?.role?.name || 'No Role'}</p>
          <p className="text-muted-foreground text-[12px] mt-1">Role</p>
        </div>
      </div>

      {staff?.vendor?.company_name && (
        <div className="text-left space-y-2">
          <h6 className="text-foreground text-[13px] font-bold uppercase tracking-wider">Company</h6>
          <p className="text-foreground text-[14px] font-medium">{staff.vendor.company_name}</p>
        </div>
      )}
    </div>
  );
}

'use client';

import { useStaffMe } from '@/hooks/use-staff-auth';

export function AboutTab() {
  const { data: staff } = useStaffMe();

  return (
    <div className="animate-in fade-in duration-300">
      <h6 className="text-foreground text-[16px] font-bold uppercase mb-5">About</h6>
      <p className="text-muted-foreground text-[14px] leading-[2] mb-10 italic">
        No bio provided yet.
      </p>

      <div className="space-y-4">
        <h6 className="text-foreground text-[14px] font-bold uppercase tracking-wider mb-3">Details</h6>
        {[
          { label: 'Employee ID', value: staff?.emp_id },
          { label: 'Designation',  value: staff?.designation },
          { label: 'Mobile',       value: staff?.mobile },
          { label: 'Role',         value: staff?.role?.name },
          { label: 'Company',      value: staff?.vendor?.company_name },
        ].map(({ label, value }) => value ? (
          <div key={label} className="flex items-center gap-4">
            <span className="w-32 text-[13px] text-muted-foreground font-medium">{label}</span>
            <span className="text-[13px] text-foreground font-bold">{value}</span>
          </div>
        ) : null)}
      </div>
    </div>
  );
}

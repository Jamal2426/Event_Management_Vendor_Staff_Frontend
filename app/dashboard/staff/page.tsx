import StaffContent from "./_components/staff-content";
import { PermissionGuard } from "@/components/common/PermissionGuard";

export default function StaffPage() {
  return (
    <PermissionGuard permission="staff.view">
      <div className="min-h-screen bg-background transition-all duration-300">
        <StaffContent />
      </div>
    </PermissionGuard>
  );
}

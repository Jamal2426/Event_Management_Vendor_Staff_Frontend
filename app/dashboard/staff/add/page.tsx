import AddStaffContent from "../_components/add-staff-content";
import { PermissionGuard } from "@/components/common/PermissionGuard";

export default function AddStaffPage() {
  return (
    <PermissionGuard permission="staff.create">
      <div className="min-h-screen bg-background transition-all duration-300">
        <AddStaffContent />
      </div>
    </PermissionGuard>
  );
}

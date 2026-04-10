import RolesContent from "./_components/roles-content";
import { PermissionGuard } from "@/components/common/PermissionGuard";

export default function RolesPage() {
  return (
    <PermissionGuard permission="roles.view">
      <div className="min-h-screen bg-background transition-all duration-300">
        <RolesContent />
      </div>
    </PermissionGuard>
  );
}

import RoleForm from "../_components/role-form";
import { PageHeader } from "@/components/common/PageHeader";
import { PermissionGuard } from "@/components/common/PermissionGuard";

export default function CreateRolePage() {
  return (
    <PermissionGuard permission="roles.view">
      <div className="min-h-screen bg-background transition-all duration-300">
        <div className="p-6">
          <PageHeader title="Create Role" subtitle="Define a new staff role with permissions" />
        </div>
        <RoleForm />
      </div>
    </PermissionGuard>
  );
}

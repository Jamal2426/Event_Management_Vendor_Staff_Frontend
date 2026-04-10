import ModulesContent from "./_components/modules-content";
import { PermissionGuard } from "@/components/common/PermissionGuard";

export default function ModulesPage() {
  return (
    <PermissionGuard permission="modules.view">
      <div className="min-h-screen bg-background transition-all duration-300">
        <ModulesContent />
      </div>
    </PermissionGuard>
  );
}

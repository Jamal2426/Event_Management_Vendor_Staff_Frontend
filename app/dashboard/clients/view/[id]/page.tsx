import { AddClientContent } from "../../_components/add-client-content";
import { PermissionGuard } from "@/components/common/PermissionGuard";

export default function ViewClientPage() {
  return (
    <PermissionGuard permission="client.view">
      <div className="min-h-screen bg-background transition-all duration-300">
        <AddClientContent isView={true} />
      </div>
    </PermissionGuard>
  );
}

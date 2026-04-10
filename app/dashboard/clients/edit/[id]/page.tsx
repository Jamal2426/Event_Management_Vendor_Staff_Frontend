import { AddClientContent } from "../../_components/add-client-content";
import { PermissionGuard } from "@/components/common/PermissionGuard";

export default function EditClientPage() {
  return (
    <PermissionGuard permission="client.edit">
      <div className="min-h-screen bg-background transition-all duration-300">
        <AddClientContent isEdit={true} />
      </div>
    </PermissionGuard>
  );
}

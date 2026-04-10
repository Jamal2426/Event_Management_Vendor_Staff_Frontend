import { AddClientContent } from "../_components/add-client-content";
import { PermissionGuard } from "@/components/common/PermissionGuard";

export default function AddClientPage() {
  return (
    <PermissionGuard permission="client.create">
      <div className="min-h-screen bg-background transition-all duration-300">
        <AddClientContent />
      </div>
    </PermissionGuard>
  );
}

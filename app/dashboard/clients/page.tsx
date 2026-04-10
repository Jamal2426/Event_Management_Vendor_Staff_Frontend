import ClientsContent from "./_components/clients-content";
import { PermissionGuard } from "@/components/common/PermissionGuard";

export default function ClientsPage() {
  return (
    <PermissionGuard permission="client.view">
      <div className="min-h-screen bg-background transition-all duration-300">
        <ClientsContent />
      </div>
    </PermissionGuard>
  );
}

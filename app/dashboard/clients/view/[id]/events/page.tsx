import ClientEventsList from "../../../_components/client-events-list";
import { PermissionGuard } from "@/components/common/PermissionGuard";

export default function ClientEventsPage() {
  return (
    <PermissionGuard permission="client.view">
      <ClientEventsList />
    </PermissionGuard>
  );
}

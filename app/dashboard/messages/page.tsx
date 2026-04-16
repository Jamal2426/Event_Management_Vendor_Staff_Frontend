import { PermissionGuard } from "@/components/common/PermissionGuard";
import { MessagesContent } from './_components/messages-content';

export default function MessagesPage() {
  return (
    <PermissionGuard permission="communication.view">
      <MessagesContent />
    </PermissionGuard>
  );
}

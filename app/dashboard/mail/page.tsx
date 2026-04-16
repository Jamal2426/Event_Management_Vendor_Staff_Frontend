import { PermissionGuard } from "@/components/common/PermissionGuard";
import { MailContent } from './_components/mail-content';

export default function MailPage() {
  return (
    <PermissionGuard permission="communication.view">
      <MailContent />
    </PermissionGuard>
  );
}

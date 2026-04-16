import { PermissionGuard } from "@/components/common/PermissionGuard";
import { ComposeContent } from './_components/compose-content';

export default function ComposePage() {
  return (
    <PermissionGuard permission="communication.send">
      <ComposeContent />
    </PermissionGuard>
  );
}

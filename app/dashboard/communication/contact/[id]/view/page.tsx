import { ContactViewContent } from "../../_components/contact-view-content";
import { PermissionGuard } from "@/components/common/PermissionGuard";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <PermissionGuard permission="communication.view">
      <ContactViewContent id={id} />
    </PermissionGuard>
  );
}

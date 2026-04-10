import { PermissionGuard } from "@/components/common/PermissionGuard";

export default function EmailPage() {
  return (
    <PermissionGuard permission="communication.view">
      <div className="h-[calc(100vh-86px)] overflow-y-auto px-6 pt-4 pb-10 custom-scrollbar">
        <div className="max-w-[1700px] mx-auto space-y-4">
          <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">Email</h1>
          <p className="text-sm text-gray-500">Email communication coming soon.</p>
        </div>
      </div>
    </PermissionGuard>
  );
}

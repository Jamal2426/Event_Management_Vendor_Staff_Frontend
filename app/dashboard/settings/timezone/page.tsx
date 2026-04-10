import { PermissionGuard } from "@/components/common/PermissionGuard";

export default function TimezonePage() {
  return (
    <PermissionGuard permission="settings.edit">
      <div className="h-[calc(100vh-86px)] overflow-y-auto px-6 pt-4 pb-10 custom-scrollbar">
        <div className="max-w-[1700px] mx-auto space-y-4">
          <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">Timezone</h1>
          <p className="text-sm text-gray-500">Timezone settings coming soon.</p>
        </div>
      </div>
    </PermissionGuard>
  );
}

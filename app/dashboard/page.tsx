import StatsCards from "@/components/layout/Content/StatsCards";
import ChartsSection from "@/components/layout/Content/ChartsSection";
import TablesSection from "@/components/layout/Content/TablesSection";
import { PermissionGuard } from "@/components/common/PermissionGuard";

export default function DashboardPage() {
  return (
    <PermissionGuard permission="dashboard.view">
      <div className="h-[calc(100vh-86px)] overflow-y-auto px-6 pt-4 pb-10 custom-scrollbar">
        <div className="space-y-6 max-w-[1700px] mx-auto">
          <StatsCards />
          <ChartsSection />
          <TablesSection />
        </div>
      </div>
    </PermissionGuard>
  );
}

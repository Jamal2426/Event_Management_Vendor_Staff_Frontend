import AddPaymentContent from "../_components/add-payment-content";
import { PermissionGuard } from "@/components/common/PermissionGuard";

export default function AddPaymentPage() {
  return (
    <PermissionGuard permission="payment.edit">
      <div className="min-h-screen bg-background transition-all duration-300">
        <AddPaymentContent />
      </div>
    </PermissionGuard>
  );
}

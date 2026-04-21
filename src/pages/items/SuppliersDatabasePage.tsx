import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { SuppliersTable, SupplierData } from "@/components/suppliers/SuppliersTable";
import { Database, Loader2 } from "lucide-react";
import { useSuppliers } from "@/hooks/useSuppliers";
import ViewDetailsDialog from "@/components/dialogs/ViewDetailsDialog";
import { useState } from "react";

export default function SuppliersDatabasePage() {
  const { suppliers, loading } = useSuppliers();
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Record<string, string> | null>(null);

  const mappedData: SupplierData[] = suppliers.map(s => ({
    id: s.id,
    name: s.name,
    classification: s.category || "عام",
    country: "السعودية",
    taxNumber: "—",
    commercialRegister: "—",
    phone: s.phone || "—",
    email: s.email || "—",
    fax: "—",
    currency: "﷼",
  }));

  const handlePreview = (id: string) => {
    const supplier = suppliers.find(s => s.id === id);
    if (supplier) {
      setSelectedSupplier({
        "الاسم": supplier.name,
        "الفئة": supplier.category || "—",
        "جهة الاتصال": supplier.contact_person || "—",
        "الجوال": supplier.phone || "—",
        "البريد": supplier.email || "—",
        "العنوان": supplier.address || "—",
        "الحالة": supplier.status,
      });
      setViewOpen(true);
    }
  };

  return (
    <InnerPageLayout title="قاعدة بيانات الموردين" moduleId="financial-resources" moduleTitle="الموارد المالية" sectionTitle="إدارة الموردين">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg"><Database className="h-6 w-6 text-primary" /></div>
          <h1 className="text-xl font-bold">قاعدة بيانات الموردين</h1>
        </div>
        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
        ) : (
          <div className="bg-card rounded-lg border p-6">
            <SuppliersTable data={mappedData} showDeleteButton={false} onPreview={handlePreview} />
          </div>
        )}
      </div>
      {selectedSupplier && (
        <ViewDetailsDialog open={viewOpen} onOpenChange={setViewOpen} title="تفاصيل المورد" data={selectedSupplier} />
      )}
    </InnerPageLayout>
  );
}

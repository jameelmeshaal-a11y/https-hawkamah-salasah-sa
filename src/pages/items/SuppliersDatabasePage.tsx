import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { SuppliersTable, SupplierData } from "@/components/suppliers/SuppliersTable";
import { Database } from "lucide-react";

const suppliersData: SupplierData[] = [
  {
    id: "1",
    name: "نسمة معاذ",
    classification: "عام",
    country: "السعودية",
    taxNumber: "300123456789",
    commercialRegister: "1234567890",
    phone: "0512345678",
    email: "nsma@example.com",
    fax: "011234567",
    currency: "ريال",
  },
  {
    id: "2",
    name: "مصادر بن ملهي",
    classification: "مقاولات",
    country: "السعودية",
    taxNumber: "300987654321",
    commercialRegister: "0987654321",
    phone: "0598765432",
    email: "masader@example.com",
    fax: "012345678",
    currency: "ريال",
  },
  {
    id: "3",
    name: "القواجي",
    classification: "توريدات",
    country: "السعودية",
    taxNumber: "300111222333",
    commercialRegister: "1112223334",
    phone: "0551112223",
    email: "qawaji@example.com",
    fax: "011112223",
    currency: "ريال",
  },
  {
    id: "4",
    name: "ان ملهي",
    classification: "خدمات",
    country: "السعودية",
    taxNumber: "300444555666",
    commercialRegister: "4445556667",
    phone: "0544445556",
    email: "anmalhi@example.com",
    fax: "014445556",
    currency: "ريال",
  },
  {
    id: "5",
    name: "مورد عام",
    classification: "عام",
    country: "السعودية",
    taxNumber: "300777888999",
    commercialRegister: "7778889990",
    phone: "0577788899",
    email: "general@example.com",
    fax: "017778889",
    currency: "ريال",
  },
];

export default function SuppliersDatabasePage() {
  const handlePreview = (id: string) => {
    console.log("Preview supplier:", id);
  };

  return (
    <InnerPageLayout
      title="قاعدة بيانات الموردين"
      moduleId="financial-resources"
      moduleTitle="الموارد المالية"
      sectionTitle="إدارة الموردين"
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Database className="h-6 w-6 text-blue-600" />
          </div>
          <h1 className="text-xl font-bold">قاعدة بيانات الموردين</h1>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <SuppliersTable
            data={suppliersData}
            showDeleteButton={false}
            onPreview={handlePreview}
          />
        </div>
      </div>
    </InnerPageLayout>
  );
}

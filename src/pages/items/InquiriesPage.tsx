import InnerPageLayout from "@/components/layout/InnerPageLayout";
import InquiriesTable from "@/components/inquiries/InquiriesTable";

const InquiriesPage = () => {
  return (
    <InnerPageLayout
      moduleId="office"
      itemSlug="inquiries"
      title="مسائلات بحاجة إلى رد"
      sectionTitle="الخدمات المكتبية"
      moduleTitle="المكتب الإلكتروني"
    >
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-foreground">مسائلات بحاجة إلى رد</h1>
        
        <InquiriesTable />
      </div>
    </InnerPageLayout>
  );
};

export default InquiriesPage;

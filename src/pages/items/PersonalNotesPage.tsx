import InnerPageLayout from "@/components/layout/InnerPageLayout";
import NoteForm from "@/components/notes/NoteForm";
import NotesTable from "@/components/notes/NotesTable";

const PersonalNotesPage = () => {
  return (
    <InnerPageLayout
      moduleId="office"
      itemSlug="personal-notes"
      title="إدارة المذكرات الشخصية"
      sectionTitle="الخدمات المكتبية"
      moduleTitle="المكتب الإلكتروني"
    >
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-foreground">إدارة المذكرات الشخصية</h1>
        
        <NoteForm />
        
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">سجل المذكرات</h2>
          <NotesTable />
        </div>
      </div>
    </InnerPageLayout>
  );
};

export default PersonalNotesPage;

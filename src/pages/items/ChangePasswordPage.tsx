import InnerPageLayout from "@/components/layout/InnerPageLayout";
import PasswordForm from "@/components/password/PasswordForm";

const ChangePasswordPage = () => {
  return (
    <InnerPageLayout
      moduleId="office"
      itemSlug="change-password"
      title="تغيير كلمة المرور"
      sectionTitle="الخدمات المكتبية"
      moduleTitle="المكتب الإلكتروني"
    >
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-foreground">تغيير كلمة المرور</h1>
        
        <PasswordForm />
      </div>
    </InnerPageLayout>
  );
};

export default ChangePasswordPage;

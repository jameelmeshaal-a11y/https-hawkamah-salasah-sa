import { Suspense } from "react";
import { useParams, Navigate } from "react-router-dom";
import { getItemPage } from "@/utils/itemRoutes";
import InnerPageLayout from "@/components/layout/InnerPageLayout";

const ModuleItemPage = () => {
  const { moduleId, itemSlug } = useParams<{ moduleId: string; itemSlug: string }>();

  if (!moduleId || !itemSlug) {
    return <Navigate to="/" replace />;
  }

  const PageComponent = getItemPage(itemSlug);

  if (!PageComponent) {
    return (
      <InnerPageLayout moduleId={moduleId} itemSlug={itemSlug}>
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">الصفحة قيد التطوير...</p>
        </div>
      </InnerPageLayout>
    );
  }

  return (
    <Suspense fallback={
      <InnerPageLayout moduleId={moduleId} itemSlug={itemSlug}>
        <div className="flex items-center justify-center h-64">
          <div className="animate-pulse text-muted-foreground">جاري التحميل...</div>
        </div>
      </InnerPageLayout>
    }>
      <PageComponent />
    </Suspense>
  );
};

export default ModuleItemPage;

import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import KpiCards from "@/components/dashboard/KpiCards";
import ModulesSection from "@/components/dashboard/ModulesSection";
import SupportButton from "@/components/dashboard/SupportButton";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex w-full">
      {/* Sidebar */}
      <DashboardSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <DashboardHeader onMenuToggle={() => setSidebarOpen(true)} />

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          {/* KPI Cards */}
          <KpiCards />

          {/* Modules Section */}
          <ModulesSection />

          {/* Footer */}
          <footer className="text-center py-6 mt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              جميع الحقوق محفوظة © نظام سلاسة الإلكتروني ٢٠٢٥
            </p>
            <p className="text-xs text-muted-foreground/60 mt-1">
              تصميم و تطوير الفريق التقنية للنظام
            </p>
          </footer>
        </main>
      </div>

      {/* Support Button */}
      <SupportButton />
    </div>
  );
};

export default Index;

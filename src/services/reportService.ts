import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type ReportType = "beneficiaries" | "financial_accounts" | "journal_entries" | "sponsorships" | "audit_events" | "users";

export const exportReport = async (reportType: ReportType, format: "excel" | "pdf", filters?: Record<string, unknown>) => {
  try {
    toast.info("جاري إنشاء التقرير...");

    const { data, error } = await supabase.functions.invoke("generate-report", {
      body: { reportType, format: format === "excel" ? "excel" : "pdf", filters },
    });

    if (error) {
      toast.error("فشل إنشاء التقرير");
      console.error(error);
      return;
    }

    if (format === "excel") {
      // Data is CSV - download it
      const blob = new Blob([data], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${reportType}_report.csv`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("تم تصدير التقرير بنجاح (Excel/CSV)");
    } else {
      // For PDF - use client-side generation with the returned data
      const reportData = typeof data === "string" ? JSON.parse(data) : data;
      generatePDFFromData(reportData, reportType);
      toast.success("تم تصدير التقرير بنجاح (PDF)");
    }
  } catch (err) {
    toast.error("حدث خطأ أثناء التصدير");
    console.error(err);
  }
};

function generatePDFFromData(reportData: { data: any[]; columns: string[]; reportType: string }, reportType: string) {
  // Create a printable HTML window for PDF
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    toast.error("يرجى السماح بالنوافذ المنبثقة");
    return;
  }

  const columnLabels: Record<string, string> = {
    full_name: "الاسم الكامل", phone: "الهاتف", city: "المدينة", status: "الحالة",
    category: "الفئة", created_at: "تاريخ الإنشاء", code: "الكود", name: "الاسم",
    type: "النوع", balance: "الرصيد", is_active: "نشط", entry_number: "رقم القيد",
    entry_date: "التاريخ", hijri_date: "التاريخ الهجري", reference: "المرجع",
    description: "الوصف", program_name: "البرنامج", sponsor_name: "الكفيل",
    monthly_amount: "المبلغ الشهري", start_date: "تاريخ البداية", end_date: "تاريخ النهاية",
    action: "الإجراء", module_key: "الوحدة", entity_type: "نوع الكيان",
    occurred_at: "التاريخ", user_agent: "المتصفح", email: "البريد",
    department: "القسم", job_title: "الوظيفة", last_login_at: "آخر دخول",
  };

  const headers = reportData.columns.map((c) => columnLabels[c] || c);
  const rows = reportData.data.map((row) =>
    reportData.columns.map((c) => row[c] ?? "-").join("</td><td>")
  );

  printWindow.document.write(`
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="utf-8">
      <title>تقرير - ${reportType}</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Arial, sans-serif; padding: 20px; direction: rtl; }
        h1 { text-align: center; color: #1E4D4D; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th { background: #1E4D4D; color: white; padding: 10px; text-align: right; }
        td { padding: 8px 10px; border-bottom: 1px solid #ddd; text-align: right; }
        tr:nth-child(even) { background: #f9f9f9; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <h1>تقرير ${reportType}</h1>
      <p>تاريخ التقرير: ${new Date().toLocaleDateString("ar-SA")}</p>
      <p>عدد السجلات: ${reportData.data.length}</p>
      <table>
        <thead><tr><th>${headers.join("</th><th>")}</th></tr></thead>
        <tbody>${rows.map((r) => `<tr><td>${r}</td></tr>`).join("")}</tbody>
      </table>
      <div class="footer">نظام حوكمة - ${new Date().getFullYear()}</div>
      <script>window.print();</script>
    </body>
    </html>
  `);
  printWindow.document.close();
}

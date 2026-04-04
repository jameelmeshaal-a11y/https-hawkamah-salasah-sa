import { FileText, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { exportReport, ReportType } from "@/services/reportService";

interface ReportExportButtonsProps {
  onExportPDF?: () => void;
  onExportExcel?: () => void;
  reportType?: ReportType;
  filters?: Record<string, unknown>;
  className?: string;
}

const ReportExportButtons = ({
  onExportPDF,
  onExportExcel,
  reportType,
  filters,
  className,
}: ReportExportButtonsProps) => {
  const handleExcel = () => {
    if (onExportExcel) return onExportExcel();
    if (reportType) exportReport(reportType, "excel", filters);
  };

  const handlePDF = () => {
    if (onExportPDF) return onExportPDF();
    if (reportType) exportReport(reportType, "pdf", filters);
  };

  return (
    <div className={cn("flex gap-2", className)}>
      <Button type="button" onClick={handleExcel} className="bg-green-500 hover:bg-green-600 text-white">
        <FileSpreadsheet className="h-4 w-4 ml-2" />
        تصدير اكسيل
      </Button>
      <Button type="button" onClick={handlePDF} className="bg-red-500 hover:bg-red-600 text-white">
        <FileText className="h-4 w-4 ml-2" />
        تصدير PDF
      </Button>
    </div>
  );
};

export default ReportExportButtons;

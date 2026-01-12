import { FileText, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ReportExportButtonsProps {
  onExportPDF?: () => void;
  onExportExcel?: () => void;
  className?: string;
}

const ReportExportButtons = ({
  onExportPDF,
  onExportExcel,
  className,
}: ReportExportButtonsProps) => {
  return (
    <div className={cn("flex gap-2", className)}>
      <Button
        type="button"
        onClick={onExportExcel}
        className="bg-green-500 hover:bg-green-600 text-white"
      >
        <FileSpreadsheet className="h-4 w-4 ml-2" />
        تصدير اكسيل
      </Button>
      <Button
        type="button"
        onClick={onExportPDF}
        className="bg-red-500 hover:bg-red-600 text-white"
      >
        <FileText className="h-4 w-4 ml-2" />
        تصدير PDF
      </Button>
    </div>
  );
};

export default ReportExportButtons;

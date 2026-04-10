import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, FileSpreadsheet, FileText } from "lucide-react";
import { useState } from "react";
import ExportDialog from "./ExportDialog";
import { toast } from "sonner";

interface Column {
  key: string;
  label: string;
}

interface ExportDropdownProps {
  columns: Column[];
  data?: Record<string, unknown>[];
  fileName?: string;
  onExport?: (type: "pdf" | "excel", selectedColumns: string[]) => void;
}

const ExportDropdown = ({ columns, data, fileName = "export", onExport }: ExportDropdownProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [exportType, setExportType] = useState<"pdf" | "excel">("excel");

  const handleSelectExportType = (type: "pdf" | "excel") => {
    setExportType(type);
    setDialogOpen(true);
  };

  const handleExport = async (selectedColumns: string[]) => {
    if (onExport) {
      onExport(exportType, selectedColumns);
      return;
    }

    const exportData = data || [];
    const selectedCols = columns.filter(c => selectedColumns.includes(c.key));

    if (exportType === "excel") {
      try {
        const XLSX = await import("xlsx");
        const wsData = [
          selectedCols.map(c => c.label),
          ...exportData.map(row => selectedCols.map(c => String(row[c.key] ?? "")))
        ];
        const ws = XLSX.utils.aoa_to_sheet(wsData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "البيانات");
        XLSX.writeFile(wb, `${fileName}.xlsx`);
        toast.success("تم تصدير الملف بنجاح");
      } catch {
        toast.error("فشل في تصدير Excel");
      }
    } else {
      try {
        const { default: jsPDF } = await import("jspdf");
        const autoTable = (await import("jspdf-autotable")).default;
        const doc = new jsPDF({ orientation: "landscape" });
        const headers = selectedCols.map(c => c.label);
        const body = exportData.map(row => selectedCols.map(c => String(row[c.key] ?? "")));
        autoTable(doc, { head: [headers], body, styles: { font: "helvetica", fontSize: 8 } });
        doc.save(`${fileName}.pdf`);
        toast.success("تم تصدير الملف بنجاح");
      } catch {
        toast.error("فشل في تصدير PDF");
      }
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" title="تصدير">
            <Download className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-background">
          <DropdownMenuItem onClick={() => handleSelectExportType("excel")} className="flex items-center gap-2 cursor-pointer">
            <FileSpreadsheet className="h-4 w-4 text-green-600" />
            <span>تصدير Excel</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSelectExportType("pdf")} className="flex items-center gap-2 cursor-pointer">
            <FileText className="h-4 w-4 text-red-600" />
            <span>تصدير ملف PDF</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ExportDialog open={dialogOpen} onOpenChange={setDialogOpen} columns={columns} exportType={exportType} onExport={handleExport} />
    </>
  );
};

export default ExportDropdown;

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

interface Column {
  key: string;
  label: string;
}

interface ExportDropdownProps {
  columns: Column[];
  onExport?: (type: "pdf" | "excel", selectedColumns: string[]) => void;
}

const ExportDropdown = ({ columns, onExport }: ExportDropdownProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [exportType, setExportType] = useState<"pdf" | "excel">("excel");

  const handleSelectExportType = (type: "pdf" | "excel") => {
    setExportType(type);
    setDialogOpen(true);
  };

  const handleExport = (selectedColumns: string[]) => {
    if (onExport) {
      onExport(exportType, selectedColumns);
    }
    // Here you would implement actual export logic
    console.log(`Exporting ${exportType} with columns:`, selectedColumns);
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
          <DropdownMenuItem
            onClick={() => handleSelectExportType("excel")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <FileSpreadsheet className="h-4 w-4 text-green-600" />
            <span>تصدير Excel</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleSelectExportType("pdf")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <FileText className="h-4 w-4 text-red-600" />
            <span>تصدير ملف PDF</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ExportDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        columns={columns}
        exportType={exportType}
        onExport={handleExport}
      />
    </>
  );
};

export default ExportDropdown;

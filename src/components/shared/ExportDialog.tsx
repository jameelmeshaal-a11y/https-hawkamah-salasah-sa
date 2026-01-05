import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Download } from "lucide-react";
import { useState, useEffect } from "react";

interface Column {
  key: string;
  label: string;
}

interface ExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  columns: Column[];
  exportType: "pdf" | "excel";
  onExport: (selectedColumns: string[]) => void;
}

const ExportDialog = ({
  open,
  onOpenChange,
  columns,
  exportType,
  onExport,
}: ExportDialogProps) => {
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

  useEffect(() => {
    if (open) {
      setSelectedColumns(columns.map((col) => col.key));
    }
  }, [open, columns]);

  const handleSelectAll = () => {
    setSelectedColumns(columns.map((col) => col.key));
  };

  const handleDeselectAll = () => {
    setSelectedColumns([]);
  };

  const handleToggleColumn = (key: string) => {
    setSelectedColumns((prev) =>
      prev.includes(key)
        ? prev.filter((k) => k !== key)
        : [...prev, key]
    );
  };

  const handleExport = () => {
    onExport(selectedColumns);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-right">
            <Download className="h-5 w-5 text-primary" />
            سجلات التصدير ({exportType === "pdf" ? "PDF" : "Excel"})
          </DialogTitle>
          <DialogDescription className="text-right">
            الرجاء تحديد الأعمدة التي ترغب في تصديرها
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-2 mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSelectAll}
            className="text-xs"
          >
            اختيار الكل
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDeselectAll}
            className="text-xs"
          >
            لا تختر شيء
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto border rounded-lg p-4">
          <div className="grid grid-cols-2 gap-3">
            {columns.map((column) => (
              <label
                key={column.key}
                className="flex items-center gap-2 cursor-pointer hover:bg-muted/50 p-2 rounded-md transition-colors"
              >
                <Checkbox
                  checked={selectedColumns.includes(column.key)}
                  onCheckedChange={() => handleToggleColumn(column.key)}
                />
                <span className="text-sm">{column.label}</span>
              </label>
            ))}
          </div>
        </div>

        <DialogFooter className="flex gap-2 mt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            إلغاء
          </Button>
          <Button
            onClick={handleExport}
            disabled={selectedColumns.length === 0}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            تصدير
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExportDialog;

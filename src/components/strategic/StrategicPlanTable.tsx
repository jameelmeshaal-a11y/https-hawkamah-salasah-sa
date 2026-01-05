import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Download, Edit } from "lucide-react";

interface PlanData {
  id: number;
  title: string;
  periodMonths: number;
  startDateHijri: string;
  startDateGregorian: string;
  endDateHijri: string;
  endDateGregorian: string;
}

interface StrategicPlanTableProps {
  data: PlanData[];
  actionLabel: string;
  onActionClick?: (id: number) => void;
  onEditClick?: (id: number) => void;
}

const StrategicPlanTable = ({
  data,
  actionLabel,
  onActionClick,
  onEditClick,
}: StrategicPlanTableProps) => {
  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="بحث عام" className="pr-10" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" title="تصدير">
            <Download className="h-4 w-4" />
          </Button>
          <Select defaultValue="20">
            <SelectTrigger className="w-[100px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-right">{actionLabel}</TableHead>
              <TableHead className="text-right">العنوان</TableHead>
              <TableHead className="text-right">فترة الخطة (شهر)</TableHead>
              <TableHead className="text-right">تاريخ البداية</TableHead>
              <TableHead className="text-right">تاريخ النهاية</TableHead>
              <TableHead className="text-right w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  لا توجد بيانات متوفرة في الجدول
                </TableCell>
              </TableRow>
            ) : (
              data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-600 border-blue-600 hover:bg-blue-50"
                      onClick={() => onActionClick?.(row.id)}
                    >
                      {actionLabel}
                    </Button>
                  </TableCell>
                  <TableCell className="font-medium">{row.title}</TableCell>
                  <TableCell>{row.periodMonths}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{row.startDateHijri}</div>
                      <div className="text-muted-foreground">{row.startDateGregorian}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{row.endDateHijri}</div>
                      <div className="text-muted-foreground">{row.endDateGregorian}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEditClick?.(row.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      <div className="text-sm text-muted-foreground">
        إظهار السجلات {data.length > 0 ? 1 : 0} إلى {data.length} من {data.length}
      </div>
    </div>
  );
};

export default StrategicPlanTable;

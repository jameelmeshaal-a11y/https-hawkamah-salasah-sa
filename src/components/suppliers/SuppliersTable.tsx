import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EmptyState from "@/components/shared/EmptyState";
import MaskedPhone from "@/components/shared/MaskedPhone";
import { Search, Download, Eye } from "lucide-react";

export interface SupplierData {
  id: string;
  name: string;
  classification: string;
  country: string;
  taxNumber: string;
  commercialRegister: string;
  phone: string;
  email: string;
  fax: string;
  currency: string;
}

interface SuppliersTableProps {
  data: SupplierData[];
  showDeleteButton?: boolean;
  onDelete?: (id: string) => void;
  onPreview?: (id: string) => void;
}

export function SuppliersTable({
  data,
  showDeleteButton = false,
  onDelete,
  onPreview,
}: SuppliersTableProps) {
  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="بحث..." className="pr-10 text-right" />
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          تصدير
        </Button>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              {showDeleteButton && <TableHead className="text-right">حذف المورد</TableHead>}
              <TableHead className="text-right">معاينة</TableHead>
              <TableHead className="text-right">اسم المورد</TableHead>
              <TableHead className="text-right">التصنيف</TableHead>
              <TableHead className="text-right">الدولة</TableHead>
              <TableHead className="text-right">الرقم الضريبي</TableHead>
              <TableHead className="text-right">السجل التجاري</TableHead>
              <TableHead className="text-right">الهاتف</TableHead>
              <TableHead className="text-right">البريد الإلكتروني</TableHead>
              <TableHead className="text-right">الفاكس</TableHead>
              <TableHead className="text-right">ملة</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={showDeleteButton ? 11 : 10}>
                  <EmptyState message="لا توجد بيانات متوفرة في الجدول" />
                </TableCell>
              </TableRow>
            ) : (
              data.map((supplier) => (
                <TableRow key={supplier.id}>
                  {showDeleteButton && (
                    <TableCell>
                      <Button
                        size="sm"
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                        onClick={() => onDelete?.(supplier.id)}
                      >
                        حذف المورد
                      </Button>
                    </TableCell>
                  )}
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1 text-blue-600"
                      onClick={() => onPreview?.(supplier.id)}
                    >
                      <Eye className="h-3 w-3" />
                      معاينة
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">{supplier.name}</TableCell>
                  <TableCell className="text-right">{supplier.classification}</TableCell>
                  <TableCell className="text-right">{supplier.country}</TableCell>
                  <TableCell className="text-right">{supplier.taxNumber}</TableCell>
                  <TableCell className="text-right">{supplier.commercialRegister}</TableCell>
                  <TableCell className="text-right"><MaskedPhone value={supplier.phone} /></TableCell>
                  <TableCell className="text-right">{supplier.email}</TableCell>
                  <TableCell className="text-right">{supplier.fax}</TableCell>
                  <TableCell className="text-right">{supplier.currency}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>عرض 1 إلى {data.length} من {data.length} سجل</span>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>السابق</Button>
          <Button variant="outline" size="sm" className="bg-emerald-600 text-white">1</Button>
          <Button variant="outline" size="sm" disabled>التالي</Button>
        </div>
      </div>
    </div>
  );
}

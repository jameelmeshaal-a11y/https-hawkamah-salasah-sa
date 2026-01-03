import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RehabilitationFilterCardProps {
  actionLabel?: string;
  actionVariant?: "default" | "success";
  onAction?: () => void;
  showBeneficiaryField?: boolean;
}

const RehabilitationFilterCard = ({
  actionLabel = "إدارة",
  actionVariant = "success",
  onAction,
  showBeneficiaryField = true,
}: RehabilitationFilterCardProps) => {
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-medium">
              الفئة <span className="text-destructive">*</span>
            </Label>
            <Select>
              <SelectTrigger id="category">
                <SelectValue placeholder="أختر" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="orphans">أيتام</SelectItem>
                <SelectItem value="widows">أرامل</SelectItem>
                <SelectItem value="poor">فقراء</SelectItem>
                <SelectItem value="disabled">ذوي الإعاقة</SelectItem>
                <SelectItem value="elderly">كبار السن</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {showBeneficiaryField && (
            <div className="space-y-2">
              <Label htmlFor="beneficiaries" className="text-sm font-medium">
                مستفيدين
              </Label>
              <Input id="beneficiaries" placeholder="بحث..." />
            </div>
          )}

          <div>
            <Button
              onClick={onAction}
              className={
                actionVariant === "success"
                  ? "bg-green-600 hover:bg-green-700 text-white w-full md:w-auto"
                  : ""
              }
            >
              {actionLabel}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RehabilitationFilterCard;

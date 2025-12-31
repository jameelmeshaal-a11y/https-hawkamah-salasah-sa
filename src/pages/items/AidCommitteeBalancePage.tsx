import React, { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Search, Download, Edit, Trash2, Wallet } from "lucide-react";

interface BalanceRecord {
  id: number;
  description: string;
  additionMethod: string;
  operation: string;
  amount: number;
  createdAt: string;
  createdBy: string;
}

const AidCommitteeBalancePage = () => {
  const [operationType, setOperationType] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const currentBalance = 1000;

  const [records] = useState<BalanceRecord[]>([
    {
      id: 1,
      description: "إيداع رصيد افتتاحي",
      additionMethod: "يدوي",
      operation: "إيداع",
      amount: 1500,
      createdAt: "2024-01-15",
      createdBy: "مدير النظام",
    },
    {
      id: 2,
      description: "صرف مساعدة عاجلة",
      additionMethod: "يدوي",
      operation: "سحب",
      amount: 500,
      createdAt: "2024-01-20",
      createdBy: "مدير النظام",
    },
  ]);

  const handleAddRecord = () => {
    console.log("Adding record:", { operationType, amount, description });
  };

  return (
    <InnerPageLayout
      moduleId="supervision"
      sectionId="aid-committee"
      itemId="balance"
      title="إدارة رصيد لجنة المساعدات"
      sectionTitle="لجنة المساعدات"
      moduleTitle="الإدارة الإشرافية والتنفيذية"
    >
      <div className="space-y-6">
        {/* Current Balance Banner */}
        <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4 flex items-center gap-3">
          <Wallet className="h-6 w-6 text-yellow-700" />
          <div className="flex items-center gap-2">
            <span className="text-yellow-800 font-medium">الرصيد الحالي:</span>
            <span className="text-yellow-900 font-bold text-xl">
              {currentBalance.toLocaleString()} ريال سعودي
            </span>
          </div>
        </div>

        {/* Add Record Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">إضافة سجل جديد</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>نوع العملية</Label>
                <Select value={operationType} onValueChange={setOperationType}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع العملية" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="deposit">إيداع</SelectItem>
                    <SelectItem value="withdraw">سحب</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>المبلغ</Label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="أدخل المبلغ"
                />
              </div>
              <div className="space-y-2">
                <Label>وصف العملية</Label>
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="أدخل وصف العملية"
                />
              </div>
            </div>
            <div className="mt-4">
              <Button
                onClick={handleAddRecord}
                className="bg-green-600 hover:bg-green-700"
              >
                إضافة السجل
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Records Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">سجلات الرصيد</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="بحث عام..."
                    className="pr-9 w-64"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">وصف العملية</TableHead>
                  <TableHead className="text-right">آلية الإضافة</TableHead>
                  <TableHead className="text-right">العملية</TableHead>
                  <TableHead className="text-right">المبلغ</TableHead>
                  <TableHead className="text-right">تاريخ الإنشاء</TableHead>
                  <TableHead className="text-right">أنشأ بواسطة</TableHead>
                  <TableHead className="text-right">إدارة</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>{record.description}</TableCell>
                    <TableCell>{record.additionMethod}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          record.operation === "إيداع"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {record.operation}
                      </span>
                    </TableCell>
                    <TableCell>{record.amount.toLocaleString()}</TableCell>
                    <TableCell>{record.createdAt}</TableCell>
                    <TableCell>{record.createdBy}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4 text-blue-600" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default AidCommitteeBalancePage;

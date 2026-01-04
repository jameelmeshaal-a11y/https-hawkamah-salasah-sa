import React, { useState } from "react";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload,
  Bold,
  Italic,
  Underline,
  AlignRight,
  AlignCenter,
  AlignLeft,
  List,
  ListOrdered,
  Link,
  Image,
  Strikethrough,
  Superscript,
  Subscript,
  Quote,
  Code,
  Table,
  Undo,
  Redo,
  Type,
  Palette,
  Highlighter,
} from "lucide-react";

const NotificationsManagementPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [targetAudience, setTargetAudience] = useState("all");
  const [requiresSignature, setRequiresSignature] = useState(false);

  const handleAddRecord = () => {
    console.log("Adding notification:", {
      title,
      content,
      targetAudience,
      requiresSignature,
    });
  };

  return (
    <InnerPageLayout
      moduleId="supervision"
      title="إدارة الإشعارات"
      sectionTitle="إدارة الإشعارات"
      moduleTitle="الإدارة الإشرافية والتنفيذية"
    >
      <div className="space-y-6">
        {/* Add Notification Form */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>
                  العنوان <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="أدخل عنوان الإشعار"
                />
              </div>

              <div className="space-y-2">
                <Label>
                  المحتوى <span className="text-red-500">*</span>
                </Label>
                {/* Rich Text Editor Toolbar */}
                <div className="border rounded-t-md p-2 bg-muted/50 flex items-center gap-0.5 flex-wrap">
                  {/* Undo/Redo */}
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Undo className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Redo className="h-4 w-4" />
                  </Button>
                  <div className="w-px h-6 bg-border mx-1" />
                  
                  {/* Font Style */}
                  <Select defaultValue="normal">
                    <SelectTrigger className="h-8 w-24 text-xs">
                      <SelectValue placeholder="الخط" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">عادي</SelectItem>
                      <SelectItem value="heading1">عنوان 1</SelectItem>
                      <SelectItem value="heading2">عنوان 2</SelectItem>
                      <SelectItem value="heading3">عنوان 3</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="w-px h-6 bg-border mx-1" />
                  
                  {/* Text Formatting */}
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Underline className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Strikethrough className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Superscript className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Subscript className="h-4 w-4" />
                  </Button>
                  <div className="w-px h-6 bg-border mx-1" />
                  
                  {/* Colors */}
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Type className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Highlighter className="h-4 w-4" />
                  </Button>
                  <div className="w-px h-6 bg-border mx-1" />
                  
                  {/* Alignment */}
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <AlignRight className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <AlignCenter className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <AlignLeft className="h-4 w-4" />
                  </Button>
                  <div className="w-px h-6 bg-border mx-1" />
                  
                  {/* Lists */}
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <List className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ListOrdered className="h-4 w-4" />
                  </Button>
                  <div className="w-px h-6 bg-border mx-1" />
                  
                  {/* Insert */}
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Link className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Image className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Table className="h-4 w-4" />
                  </Button>
                  <div className="w-px h-6 bg-border mx-1" />
                  
                  {/* Quote & Code */}
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Quote className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Code className="h-4 w-4" />
                  </Button>
                </div>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="أدخل محتوى الإشعار..."
                  rows={8}
                  className="rounded-t-none"
                />
              </div>

              <div className="space-y-2">
                <Label>
                  موجهة إلى <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={targetAudience}
                  onValueChange={setTargetAudience}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الفئة المستهدفة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">كافة العاملين</SelectItem>
                    <SelectItem value="managers">المدراء فقط</SelectItem>
                    <SelectItem value="employees">الموظفين فقط</SelectItem>
                    <SelectItem value="department">قسم محدد</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>المرفقات</Label>
                <Button variant="outline" className="w-full justify-start bg-slate-700 text-white hover:bg-slate-800 border-slate-700">
                  <Upload className="h-4 w-4 ml-2" />
                  إضافة مرفقات
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <Switch
                  checked={requiresSignature}
                  onCheckedChange={setRequiresSignature}
                />
                <Label>يتطلب التوقيع</Label>
              </div>
            </div>

            <div className="mt-6">
              <Button
                onClick={handleAddRecord}
                className="bg-green-600 hover:bg-green-700"
              >
                إضافة سجل
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default NotificationsManagementPage;

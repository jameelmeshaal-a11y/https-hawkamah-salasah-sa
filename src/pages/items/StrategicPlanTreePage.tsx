import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Network, ChevronDown, ChevronLeft, Target, Gauge, Lightbulb, Eye, Pencil, FolderTree } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface TreeNode {
  id: string;
  name: string;
  type: "perspective" | "goal" | "mainIndicator" | "subIndicator";
  children?: TreeNode[];
}

const plansData = [
  { id: "1", name: "الخطة الإفتراضية" },
  { id: "2", name: "خطة 2024-2026" },
  { id: "3", name: "خطة التطوير المؤسسي" },
];

const treeData: TreeNode[] = [
  {
    id: "p1",
    name: "المنظور المالي",
    type: "perspective",
    children: [
      {
        id: "g1",
        name: "تحقيق الاستدامة المالية",
        type: "goal",
        children: [
          { 
            id: "mi1", 
            name: "نسبة نمو الإيرادات", 
            type: "mainIndicator",
            children: [
              { id: "si1", name: "إيرادات التبرعات", type: "subIndicator" },
              { id: "si2", name: "إيرادات الاستثمارات", type: "subIndicator" },
            ]
          },
          { 
            id: "mi2", 
            name: "نسبة تنويع مصادر الدخل", 
            type: "mainIndicator",
            children: [
              { id: "si3", name: "مصادر حكومية", type: "subIndicator" },
              { id: "si4", name: "مصادر خاصة", type: "subIndicator" },
            ]
          },
        ],
      },
      {
        id: "g2",
        name: "ضبط المصروفات",
        type: "goal",
        children: [
          { 
            id: "mi3", 
            name: "نسبة المصروفات الإدارية", 
            type: "mainIndicator",
            children: [
              { id: "si5", name: "مصروفات الرواتب", type: "subIndicator" },
              { id: "si6", name: "مصروفات التشغيل", type: "subIndicator" },
            ]
          },
        ],
      },
    ],
  },
  {
    id: "p2",
    name: "منظور المستفيدين",
    type: "perspective",
    children: [
      {
        id: "g3",
        name: "زيادة رضا المستفيدين",
        type: "goal",
        children: [
          { 
            id: "mi4", 
            name: "نسبة رضا المستفيدين", 
            type: "mainIndicator",
            children: [
              { id: "si7", name: "رضا عن الخدمات", type: "subIndicator" },
              { id: "si8", name: "رضا عن التواصل", type: "subIndicator" },
            ]
          },
          { 
            id: "mi5", 
            name: "عدد الشكاوى", 
            type: "mainIndicator",
            children: [
              { id: "si9", name: "شكاوى مغلقة", type: "subIndicator" },
              { id: "si10", name: "شكاوى معلقة", type: "subIndicator" },
            ]
          },
        ],
      },
      {
        id: "g4",
        name: "توسيع قاعدة المستفيدين",
        type: "goal",
        children: [
          { 
            id: "mi6", 
            name: "عدد المستفيدين الجدد", 
            type: "mainIndicator",
            children: [
              { id: "si11", name: "مستفيدين أيتام", type: "subIndicator" },
              { id: "si12", name: "مستفيدين أسر", type: "subIndicator" },
            ]
          },
        ],
      },
    ],
  },
  {
    id: "p3",
    name: "منظور العمليات الداخلية",
    type: "perspective",
    children: [
      {
        id: "g5",
        name: "أتمتة العمليات",
        type: "goal",
        children: [
          { 
            id: "mi7", 
            name: "نسبة الأتمتة", 
            type: "mainIndicator",
            children: [
              { id: "si13", name: "أتمتة المالية", type: "subIndicator" },
              { id: "si14", name: "أتمتة الموارد البشرية", type: "subIndicator" },
            ]
          },
        ],
      },
      {
        id: "g6",
        name: "تحسين جودة الخدمات",
        type: "goal",
        children: [
          { 
            id: "mi8", 
            name: "نسبة الالتزام بمعايير الجودة", 
            type: "mainIndicator",
            children: [
              { id: "si15", name: "معايير ISO", type: "subIndicator" },
              { id: "si16", name: "معايير التميز المؤسسي", type: "subIndicator" },
            ]
          },
        ],
      },
    ],
  },
  {
    id: "p4",
    name: "منظور التعلم والنمو",
    type: "perspective",
    children: [
      {
        id: "g7",
        name: "تطوير الكفاءات",
        type: "goal",
        children: [
          { 
            id: "mi9", 
            name: "ساعات التدريب لكل موظف", 
            type: "mainIndicator",
            children: [
              { id: "si17", name: "تدريب تقني", type: "subIndicator" },
              { id: "si18", name: "تدريب إداري", type: "subIndicator" },
            ]
          },
        ],
      },
    ],
  },
];

const TreeNodeComponent = ({ node, level = 0 }: { node: TreeNode; level?: number }) => {
  const [isOpen, setIsOpen] = useState(level < 1);

  const getIcon = () => {
    switch (node.type) {
      case "perspective": return <div className="w-4 h-4 rounded-full bg-purple-600" />;
      case "goal": return <Target className="h-4 w-4 text-blue-600" />;
      case "mainIndicator": return <Gauge className="h-4 w-4 text-green-600" />;
      case "subIndicator": return <Lightbulb className="h-4 w-4 text-orange-500" />;
    }
  };

  const getColors = () => {
    switch (node.type) {
      case "perspective": return "bg-purple-50 border-purple-400 hover:bg-purple-100";
      case "goal": return "bg-blue-50 border-blue-400 hover:bg-blue-100";
      case "mainIndicator": return "bg-green-50 border-green-400 hover:bg-green-100";
      case "subIndicator": return "bg-orange-50 border-orange-400 hover:bg-orange-100";
    }
  };

  const getLabel = () => {
    switch (node.type) {
      case "perspective": return "منظور";
      case "goal": return "هدف";
      case "mainIndicator": return "مؤشر رئيسي";
      case "subIndicator": return "مؤشر فرعي";
    }
  };

  return (
    <div className="space-y-2">
      <div
        className={`p-3 rounded-lg border-2 ${getColors()} cursor-pointer transition-all`}
        style={{ marginRight: `${level * 28}px` }}
        onClick={() => node.children && setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          {node.children ? (
            isOpen ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronLeft className="h-4 w-4 text-muted-foreground" />
          ) : (
            <div className="w-4" />
          )}
          {getIcon()}
          <span className="text-xs text-muted-foreground px-2 py-0.5 bg-white/50 rounded">
            {getLabel()}
          </span>
          <span className="font-medium">{node.name}</span>
        </div>
      </div>
      {isOpen && node.children && (
        <div className="space-y-2">
          {node.children.map((child) => (
            <TreeNodeComponent key={child.id} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const StrategicPlanTreePage = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [showTree, setShowTree] = useState(false);

  const handleShowTree = () => {
    if (selectedPlan) {
      setShowTree(true);
    }
  };

  const selectedPlanName = plansData.find(p => p.id === selectedPlan)?.name || "";

  return (
    <InnerPageLayout
      moduleId="excellence"
      itemSlug="strategic-plan-tree"
      moduleTitle="إدارة التميز المؤسسي"
      sectionTitle="إدارة الخطة الإستراتيجية"
      title="شجرة الخطة الإستراتيجية"
    >
      <div className="space-y-6">
        {!showTree ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderTree className="h-5 w-5" />
                اختيار الخطة الإستراتيجية
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="max-w-md mx-auto space-y-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-1">
                    الخطة الإستراتيجية
                    <span className="text-destructive">*</span>
                  </Label>
                  <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                    <SelectTrigger>
                      <SelectValue placeholder="-- اختر --" />
                    </SelectTrigger>
                    <SelectContent>
                      {plansData.map((plan) => (
                        <SelectItem key={plan.id} value={plan.id}>
                          {plan.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-center pt-4">
                  <Button 
                    onClick={handleShowTree}
                    disabled={!selectedPlan}
                    className="bg-green-600 hover:bg-green-700 px-8"
                  >
                    عرض الخارطة
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">{selectedPlanName}</h2>
                  <div className="flex gap-2">
                    <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive/10">
                      <Pencil className="h-4 w-4 ml-2" />
                      تعديل
                    </Button>
                    <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                      <Eye className="h-4 w-4 ml-2" />
                      معاينة
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Network className="h-5 w-5" />
                  شجرة الخطة الإستراتيجية - قم باختيار عنصر من الشجرة بالأسفل
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-6 mb-6 flex-wrap border-b pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-purple-600" />
                    <span className="text-sm">منظور</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">هدف</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Gauge className="h-4 w-4 text-green-600" />
                    <span className="text-sm">مؤشر رئيسي</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-orange-500" />
                    <span className="text-sm">مؤشر فرعي</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {treeData.map((node) => (
                    <TreeNodeComponent key={node.id} node={node} />
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <Button 
                variant="outline" 
                onClick={() => setShowTree(false)}
              >
                العودة لاختيار خطة أخرى
              </Button>
            </div>
          </>
        )}
      </div>
    </InnerPageLayout>
  );
};

export default StrategicPlanTreePage;

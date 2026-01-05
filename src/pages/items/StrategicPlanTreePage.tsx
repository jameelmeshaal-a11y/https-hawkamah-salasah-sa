import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Network, ChevronDown, ChevronLeft, Target, Gauge, Lightbulb } from "lucide-react";
import { useState } from "react";

interface TreeNode {
  id: string;
  name: string;
  type: "perspective" | "goal" | "indicator" | "initiative";
  progress?: number;
  children?: TreeNode[];
}

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
        progress: 75,
        children: [
          { id: "i1", name: "نسبة نمو الإيرادات", type: "indicator", progress: 80 },
          { id: "i2", name: "نسبة تنويع مصادر الدخل", type: "indicator", progress: 65 },
        ],
      },
      {
        id: "g2",
        name: "ضبط المصروفات",
        type: "goal",
        progress: 85,
        children: [
          { id: "i3", name: "نسبة المصروفات الإدارية", type: "indicator", progress: 90 },
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
        progress: 70,
        children: [
          { id: "i4", name: "نسبة رضا المستفيدين", type: "indicator", progress: 85 },
          { id: "i5", name: "عدد الشكاوى", type: "indicator", progress: 60 },
          { id: "init1", name: "مبادرة تحسين تجربة المستفيد", type: "initiative", progress: 50 },
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
        id: "g4",
        name: "أتمتة العمليات",
        type: "goal",
        progress: 45,
        children: [
          { id: "i6", name: "نسبة الأتمتة", type: "indicator", progress: 45 },
          { id: "init2", name: "مشروع التحول الرقمي", type: "initiative", progress: 40 },
        ],
      },
    ],
  },
];

const TreeNodeComponent = ({ node, level = 0 }: { node: TreeNode; level?: number }) => {
  const [isOpen, setIsOpen] = useState(level < 2);

  const getIcon = () => {
    switch (node.type) {
      case "perspective": return <div className="w-4 h-4 rounded-full bg-primary" />;
      case "goal": return <Target className="h-4 w-4 text-blue-500" />;
      case "indicator": return <Gauge className="h-4 w-4 text-green-500" />;
      case "initiative": return <Lightbulb className="h-4 w-4 text-orange-500" />;
    }
  };

  const getColors = () => {
    switch (node.type) {
      case "perspective": return "bg-primary/10 border-primary";
      case "goal": return "bg-blue-50 border-blue-300";
      case "indicator": return "bg-green-50 border-green-300";
      case "initiative": return "bg-orange-50 border-orange-300";
    }
  };

  return (
    <div className="space-y-2">
      <div
        className={`p-3 rounded-lg border-2 ${getColors()} cursor-pointer transition-all hover:shadow-md`}
        style={{ marginRight: `${level * 24}px` }}
        onClick={() => node.children && setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {node.children && (
              isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />
            )}
            {getIcon()}
            <span className="font-medium">{node.name}</span>
          </div>
          {node.progress !== undefined && (
            <div className="flex items-center gap-2">
              <div className="w-20 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${node.progress}%` }}
                />
              </div>
              <span className="text-sm font-medium">{node.progress}%</span>
            </div>
          )}
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
  return (
    <InnerPageLayout
      moduleId="excellence"
      itemSlug="strategic-plan-tree"
      moduleTitle="إدارة التميز المؤسسي"
      sectionTitle="إدارة الخطة الإستراتيجية"
      title="شجرة الخطة الإستراتيجية"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Network className="h-5 w-5" />
              شجرة الخطة الإستراتيجية التفاعلية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-primary" />
                <span className="text-sm">منظور</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-500" />
                <span className="text-sm">هدف</span>
              </div>
              <div className="flex items-center gap-2">
                <Gauge className="h-4 w-4 text-green-500" />
                <span className="text-sm">مؤشر</span>
              </div>
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-orange-500" />
                <span className="text-sm">مبادرة</span>
              </div>
            </div>
            <div className="space-y-3">
              {treeData.map((node) => (
                <TreeNodeComponent key={node.id} node={node} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </InnerPageLayout>
  );
};

export default StrategicPlanTreePage;

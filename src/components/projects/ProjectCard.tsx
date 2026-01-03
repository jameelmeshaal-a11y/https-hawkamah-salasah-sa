import { Eye, MapPin, Heart, Settings, Layers } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ProjectCardProps {
  projectNumber: string;
  projectName: string;
  description: string;
  status: "جاري" | "مكتمل" | "جديد";
  sector: string;
  province: string;
  category: string;
  district: string;
  targetCategory: string;
  supportType: string;
  daysOverdue: number;
  remainingBudget: number;
  onPreview?: () => void;
}

const ProjectCard = ({
  projectNumber,
  projectName,
  description,
  status,
  sector,
  province,
  category,
  district,
  targetCategory,
  supportType,
  daysOverdue,
  remainingBudget,
  onPreview,
}: ProjectCardProps) => {
  const getStatusColor = () => {
    switch (status) {
      case "جاري":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "مكتمل":
        return "bg-green-100 text-green-800 border-green-300";
      case "جديد":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600">#{projectNumber}</span>
            <Badge className={`${getStatusColor()} border`}>{status}</Badge>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-500 hover:text-primary"
            onClick={onPreview}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>

        {/* Project Name */}
        <div>
          <h3 className="font-semibold text-gray-900">{projectName}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>

        {/* Project Info Grid */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{sector} &gt; {province}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Layers className="h-4 w-4 text-primary" />
            <span>{category} / {district}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Heart className="h-4 w-4 text-primary" />
            <span>{targetCategory}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Settings className="h-4 w-4 text-primary" />
            <span>{supportType}</span>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">المخطط الزمني</span>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>المصروفات</span>
            <span className="text-red-600">تخطى الوقت منذ {daysOverdue} يوم</span>
          </div>
          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="absolute inset-0 h-full rounded-full"
              style={{
                background: "repeating-linear-gradient(45deg, #ef4444, #ef4444 10px, #dc2626 10px, #dc2626 20px)",
                width: "100%"
              }}
            />
          </div>
        </div>

        {/* Budget Info */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className="text-sm text-gray-600">متبقي بالميزانية:</span>
          <span className="font-semibold text-primary">{remainingBudget.toLocaleString()} ريال</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;

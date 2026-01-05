import { useState } from "react";
import { Filter, Search, Circle, CircleDot, X, Check, ClipboardList, ChevronDown, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

interface Task {
  id: string;
  title: string;
  date: string;
  assignee: string;
  progress: number;
  department: string;
}

const tasksData: Record<string, Task[]> = {
  new: [
    { id: "1", title: "مراجعة تقرير الربع الأول", date: "1446/06/15", assignee: "أحمد محمد", progress: 0, department: "المالية" },
    { id: "2", title: "تحديث بيانات المستفيدين", date: "1446/06/18", assignee: "سارة علي", progress: 0, department: "خدمة المستفيدين" },
    { id: "3", title: "إعداد خطة التدريب", date: "1446/06/20", assignee: "خالد عبدالله", progress: 0, department: "الموارد البشرية" },
  ],
  ongoing: [
    { id: "4", title: "تطوير نظام الحضور", date: "1446/05/10", assignee: "محمد أحمد", progress: 45, department: "التقنية" },
    { id: "5", title: "مراجعة الميزانية السنوية", date: "1446/05/25", assignee: "فاطمة حسن", progress: 70, department: "المالية" },
  ],
  stuck: [
    { id: "6", title: "تحديث الموقع الإلكتروني", date: "1446/04/01", assignee: "عمر سعيد", progress: 30, department: "التقنية" },
  ],
  finished: [
    { id: "7", title: "إعداد التقرير الشهري", date: "1446/05/01", assignee: "نورة محمد", progress: 100, department: "الإدارة" },
    { id: "8", title: "تدقيق الحسابات", date: "1446/04/20", assignee: "يوسف علي", progress: 100, department: "المالية" },
    { id: "9", title: "تحديث السياسات", date: "1446/04/15", assignee: "هند خالد", progress: 100, department: "الموارد البشرية" },
    { id: "10", title: "مراجعة العقود", date: "1446/04/10", assignee: "سعد أحمد", progress: 100, department: "القانونية" },
  ],
};

const getProgressColor = (tabId: string) => {
  switch (tabId) {
    case "new": return "bg-blue-500";
    case "ongoing": return "bg-blue-500";
    case "stuck": return "bg-red-500";
    case "finished": return "bg-green-500";
    default: return "bg-primary";
  }
};

const TaskItem = ({ task, tabId }: { task: Task; tabId: string }) => {
  const progressColor = getProgressColor(tabId);
  
  return (
    <div className="p-3 border-b last:border-b-0 hover:bg-gray-50 transition-colors">
      <div className="flex items-start gap-2">
        <div className={`mt-1.5 h-2 w-2 rounded-full ${progressColor}`} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{task.title}</p>
          <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {task.date}
            </span>
            <span className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {task.assignee}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${progressColor} transition-all`}
                style={{ width: `${task.progress}%` }}
              />
            </div>
            <span className="text-xs text-gray-500 min-w-[32px] text-left">{task.progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const TasksPopover = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("new");

  const tabs = [
    { id: "new", label: "جديدة", icon: Circle, count: tasksData.new.length, color: "text-blue-500", bgColor: "bg-blue-500" },
    { id: "ongoing", label: "جارية", icon: CircleDot, count: tasksData.ongoing.length, color: "text-blue-500", bgColor: "bg-blue-500" },
    { id: "stuck", label: "متعثرة", icon: X, count: tasksData.stuck.length, color: "text-red-500", bgColor: "bg-red-500" },
    { id: "finished", label: "منتهية", icon: Check, count: tasksData.finished.length, color: "text-green-500", bgColor: "bg-green-500" },
  ];

  const getFilteredTasks = (tabId: string) => {
    const tasks = tasksData[tabId] || [];
    if (!searchQuery.trim()) return tasks;
    
    const query = searchQuery.toLowerCase();
    return tasks.filter(
      task => task.title.includes(query) || task.assignee.includes(query)
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="text-header-foreground hover:bg-sidebar-hover gap-2 rounded-full px-3">
          <span className="text-sm">المهام</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0 overflow-hidden" sideOffset={8}>
        {/* Header */}
        <div className="bg-slate-700 p-3 flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-slate-600">
            <Filter className="h-4 w-4" />
          </Button>
          <span className="text-white font-medium text-sm">المهام</span>
          <div className="flex-1 relative">
            <Input
              type="search"
              placeholder="بحث..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8 bg-slate-600 border-0 text-white placeholder:text-slate-400 text-sm pr-8"
            />
            <Search className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} dir="rtl">
          <TabsList className="w-full h-auto p-1 bg-gray-100 rounded-none grid grid-cols-4 gap-1">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex flex-col items-center gap-1 py-2 px-1 text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md"
              >
                <div className="flex items-center gap-1">
                  <tab.icon className={`h-3.5 w-3.5 ${tab.color}`} />
                  <span className="text-gray-700">{tab.label}</span>
                </div>
                <span className={`text-white text-xs px-1.5 py-0.5 rounded ${tab.bgColor} min-w-[20px]`}>
                  {tab.count}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Content */}
          {tabs.map((tab) => {
            const filteredTasks = getFilteredTasks(tab.id);
            return (
              <TabsContent key={tab.id} value={tab.id} className="m-0 max-h-[280px] overflow-y-auto">
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => (
                    <TaskItem key={task.id} task={task} tabId={tab.id} />
                  ))
                ) : (
                  <div className="min-h-[150px] flex flex-col items-center justify-center bg-gray-50 p-6">
                    <ClipboardList className="h-12 w-12 text-gray-300 mb-3" />
                    <p className="text-gray-500 text-sm">
                      {searchQuery ? "لا توجد نتائج مطابقة" : "لا يوجد لديك مهام بهذه الحالة"}
                    </p>
                  </div>
                )}
              </TabsContent>
            );
          })}
        </Tabs>

        {/* Footer */}
        <div className="border-t bg-gray-50 p-3 text-center">
          <Link 
            to="/module/office/tasks-database" 
            className="text-primary hover:underline text-sm font-medium"
          >
            معاينة كافة المهام
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TasksPopover;

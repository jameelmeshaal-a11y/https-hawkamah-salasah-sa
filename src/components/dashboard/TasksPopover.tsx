import { useState } from "react";
import { Filter, Search, Circle, CircleDot, X, Check, ClipboardList, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

const TasksPopover = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("new");

  const tabs = [
    { id: "new", label: "جديدة", icon: Circle, count: 0, color: "text-blue-500", bgColor: "bg-blue-500" },
    { id: "ongoing", label: "جارية", icon: CircleDot, count: 0, color: "text-blue-500", bgColor: "bg-blue-500" },
    { id: "stuck", label: "متعثرة", icon: X, count: 0, color: "text-red-500", bgColor: "bg-red-500" },
    { id: "finished", label: "منتهية", icon: Check, count: 0, color: "text-green-500", bgColor: "bg-green-500" },
  ];

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
          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="m-0">
              <div className="min-h-[200px] flex flex-col items-center justify-center bg-gray-50 p-6">
                <ClipboardList className="h-16 w-16 text-gray-300 mb-4" />
                <p className="text-gray-500 text-sm">لا يوجد لديك مهام بهذه الحالة</p>
              </div>
            </TabsContent>
          ))}
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

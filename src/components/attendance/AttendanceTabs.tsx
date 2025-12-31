import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WeeklyRecordTable from "./WeeklyRecordTable";
import DailyRecordTable from "./DailyRecordTable";

const AttendanceTabs = () => {
  return (
    <Tabs defaultValue="weekly" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-4">
        <TabsTrigger value="weekly" className="text-base">السجل الأسبوعي</TabsTrigger>
        <TabsTrigger value="daily" className="text-base">السجل اليومي</TabsTrigger>
      </TabsList>
      
      <TabsContent value="weekly">
        <WeeklyRecordTable />
      </TabsContent>
      
      <TabsContent value="daily">
        <DailyRecordTable />
      </TabsContent>
    </Tabs>
  );
};

export default AttendanceTabs;

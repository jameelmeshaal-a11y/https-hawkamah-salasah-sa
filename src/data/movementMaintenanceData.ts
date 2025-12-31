import { Car, CarFront, UserCheck, UserMinus, Database, Wrench, Settings } from "lucide-react";
import type { SubSection } from "./electronicOfficeData";

export const movementMaintenanceSections: SubSection[] = [
  {
    title: "إدارة الحركة",
    items: [
      { title: "إدارة السيارات", icon: Car },
      { title: "طلبات توفير السيارات", icon: CarFront },
      { title: "تسليم سيارة لموظف", icon: UserCheck },
      { title: "استلام سيارة من موظف", icon: UserMinus },
      { title: "قاعدة بيانات حركة السيارات", icon: Database },
      { title: "إدارات طلبات صيانة السيارات", icon: Wrench },
    ],
  },
  {
    title: "إدارة الصيانة",
    items: [
      { title: "إدارة طلبات الصيانة", icon: Settings },
    ],
  },
];

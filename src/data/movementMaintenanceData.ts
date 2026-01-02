import { Car, CarFront, UserCheck, UserMinus, Database, Wrench, Settings } from "lucide-react";
import type { SubSection } from "./electronicOfficeData";

export const movementMaintenanceSections: SubSection[] = [
  {
    title: "إدارة الحركة",
    items: [
      { title: "إدارة السيارات", icon: Car, slug: "manage-vehicles" },
      { title: "طلبات توفير السيارات", icon: CarFront, slug: "vehicle-provision-requests" },
      { title: "تسليم سيارة لموظف", icon: UserCheck, slug: "deliver-vehicle-to-employee" },
      { title: "استلام سيارة من موظف", icon: UserMinus, slug: "receive-vehicle-from-employee" },
      { title: "قاعدة بيانات حركة السيارات", icon: Database, slug: "vehicle-movement-database" },
      { title: "إدارات طلبات صيانة السيارات", icon: Wrench, slug: "vehicle-maintenance-requests" },
    ],
  },
  {
    title: "إدارة الصيانة",
    items: [
      { title: "إدارة طلبات الصيانة", icon: Settings, slug: "manage-maintenance-requests" },
    ],
  },
];

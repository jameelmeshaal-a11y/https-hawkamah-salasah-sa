import {
  Users,
  Droplets,
  Building2,
  Landmark,
  Building,
  BookOpen,
  Plus,
  Inbox,
  Edit,
  FileInput,
  ClipboardCheck,
  FileCheck,
  Droplet,
  Heart,
  Shovel,
  FileText,
  Files,
  Truck,
  Route,
  BarChart3,
} from "lucide-react";
import type { SubSection } from "./electronicOfficeData";

export const deceasedCareSections: SubSection[] = [
  {
    title: "إعدادات إدارة إكرام الموتى",
    items: [
      { title: "إدارة حسابات الموظفين", icon: Users },
      { title: "إدارة المغاسل", icon: Droplets },
      { title: "إدارة المستشفيات", icon: Building2 },
      { title: "إدارة المقابر", icon: Landmark },
      { title: "إدارة المساجد", icon: Building },
      { title: "إدارة الأدعية", icon: BookOpen },
    ],
  },
  {
    title: "إدارة البلاغات",
    items: [
      { title: "تسجيل بلاغ جديد", icon: Plus },
      { title: "إدارة البلاغات المستلمة", icon: Inbox },
      { title: "تعديل بلاغ", icon: Edit },
      { title: "تسجيل جنازات خارج النظام", icon: FileInput },
    ],
  },
  {
    title: "إدارة إجراءات إكرام الموتى",
    items: [
      { title: "إجراءات استلام الجثمان", icon: ClipboardCheck },
      { title: "إجراءات تصاريح الدفن", icon: FileCheck },
      { title: "إجراءات الغسل", icon: Droplet },
      { title: "إجراءات صلاة الجنازة", icon: Heart },
      { title: "إجراءات الدفن", icon: Shovel },
    ],
  },
  {
    title: "إدارة النعي",
    items: [
      { title: "نعي المتوفى", icon: FileText },
      { title: "إدارة النعايا", icon: Files },
    ],
  },
  {
    title: "تقارير و إحصائيات إكرام الموتى",
    items: [
      { title: "مسار حركة الإنتقالات", icon: Truck },
      { title: "مسار حركة الجنازة", icon: Route },
      { title: "التقارير الختامية", icon: BarChart3 },
    ],
  },
];

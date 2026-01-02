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
      { title: "إدارة حسابات الموظفين", icon: Users, slug: "deceased-care-employees" },
      { title: "إدارة المغاسل", icon: Droplets, slug: "manage-washing-facilities" },
      { title: "إدارة المستشفيات", icon: Building2, slug: "manage-hospitals" },
      { title: "إدارة المقابر", icon: Landmark, slug: "manage-cemeteries" },
      { title: "إدارة المساجد", icon: Building, slug: "manage-mosques" },
      { title: "إدارة الأدعية", icon: BookOpen, slug: "manage-prayers" },
    ],
  },
  {
    title: "إدارة البلاغات",
    items: [
      { title: "تسجيل بلاغ جديد", icon: Plus, slug: "register-new-report" },
      { title: "إدارة البلاغات المستلمة", icon: Inbox, slug: "manage-received-reports" },
      { title: "تعديل بلاغ", icon: Edit, slug: "edit-report" },
      { title: "تسجيل جنازات خارج النظام", icon: FileInput, slug: "register-external-funerals" },
    ],
  },
  {
    title: "إدارة إجراءات إكرام الموتى",
    items: [
      { title: "إجراءات استلام الجثمان", icon: ClipboardCheck, slug: "body-receiving-procedures" },
      { title: "إجراءات تصاريح الدفن", icon: FileCheck, slug: "burial-permit-procedures" },
      { title: "إجراءات الغسل", icon: Droplet, slug: "washing-procedures" },
      { title: "إجراءات صلاة الجنازة", icon: Heart, slug: "funeral-prayer-procedures" },
      { title: "إجراءات الدفن", icon: Shovel, slug: "burial-procedures" },
    ],
  },
  {
    title: "إدارة النعي",
    items: [
      { title: "نعي المتوفى", icon: FileText, slug: "deceased-obituary" },
      { title: "إدارة النعايا", icon: Files, slug: "manage-obituaries" },
    ],
  },
  {
    title: "تقارير و إحصائيات إكرام الموتى",
    items: [
      { title: "مسار حركة الإنتقالات", icon: Truck, slug: "transfers-route" },
      { title: "مسار حركة الجنازة", icon: Route, slug: "funeral-route" },
      { title: "التقارير الختامية", icon: BarChart3, slug: "final-reports" },
    ],
  },
];

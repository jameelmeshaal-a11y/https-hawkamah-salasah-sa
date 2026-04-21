

# خطة حجب أرقام الجوالات وحماية الخصوصية

## الفكرة العامة
كل رقم سعودي (يبدأ بـ `05` ويتكون من 10 أرقام) سيُحجب تلقائياً في كل أنحاء النظام (جداول، حوارات، تقارير، نماذج العرض)، ويظهر كشريط أسود مع رسالة "ليس لديك صلاحية الاطلاع على رقم التواصل".  
الاستثناء الوحيد: مستخدم يملك صلاحية خاصة جديدة اسمها **`view_phone_numbers`** يمنحها الـ System Admin.

## 1) تعديل قاعدة البيانات (Migration)

**أ — إضافة الصلاحية الجديدة في جدول `permissions`:**
```sql
INSERT INTO permissions (action, module_id) 
SELECT 'view_phone_numbers', id FROM modules WHERE key = 'system';
```

**ب — منحها فقط للـ system_admin افتراضياً:**
```sql
INSERT INTO role_permissions (role, permission_id) ...
```
أي مستخدم آخر (admin / manager / user...) لن يحصل عليها افتراضياً → الأرقام محجوبة.

## 2) Hook جديد: `usePhonePermission`
ملف: `src/hooks/usePhonePermission.ts`
- يُرجع `canViewPhones: boolean`
- `system_admin` → دائماً `true`
- باقي المستخدمين → يستعلم عن `view_phone_numbers` من `role_permissions`

## 3) مكوّن `MaskedPhone` (الحاجب الأمني)
ملف: `src/components/shared/MaskedPhone.tsx`

**السلوك عند عدم وجود الصلاحية:**
- يطابق Regex: `/05\d{8}/g` ويستبدل كل تطابق بشريط أسود
- الشريط يحتوي على نص الرقم بنفس عرضه لكن:
  - `color: black; background: black;` (لون النص = الخلفية)
  - `user-select: none` + `pointer-events: none`
  - `onCopy={e => e.preventDefault()}`
  - `onContextMenu={e => e.preventDefault()}`
  - يُعرض النص كـ pseudo-element عبر CSS `content` في DOM منفصل (لا يدخل في clipboard)
  - Tooltip عند hover: "ليس لديك صلاحية الاطلاع على رقم التواصل لحفظ الخصوصية"

**السلوك مع الصلاحية:** يعرض الرقم عادياً مع `dir="ltr"`.

## 4) منع النسخ على مستوى الصفحة
إضافة CSS عام `.phone-masked { user-select: none; -webkit-user-select: none; }` في `src/index.css` + معالج `copy` يفلتر أي نص يحتوي رقم 05 من الـ clipboard إذا لم تكن الصلاحية متوفرة.

## 5) استبدال عرض الأرقام في كل الشاشات
التعديل عبر **بحث وتطبيق** على الجداول والحوارات الحساسة:

| الملف | الحقل |
|------|------|
| `BeneficiariesDatabasePage` + `useBeneficiaries` | `phone` |
| `DonorsListPage` / `useDonors` | `phone` |
| `GuardiansDatabasePage` / `useGuardians` | `phone` |
| `AssemblyMembersDatabasePage` | `phone` |
| `BoardMembersDatabasePage` | `phone` |
| `SuppliersDatabasePage` + `SuppliersTable` | `phone` |
| `EmployeesListPage` / `useEmployees` | `phone` |
| `ShareholdersAccountsPage` | `phone` |
| `ManageRepresentativesAccountsPage` | `phone` |
| `ManageGuardiansAccountsPage` | `phone` |
| `ManageSupplierAccountsPage` | `phone` |
| `ViewDetailsDialog` | يفحص أي قيمة تطابق Regex جوال |
| `ProfileCard` / `EmployeeCard` | `phone` |

**الاستراتيجية:** تعديل `ViewDetailsDialog` ليفحص كل `value` تلقائياً → يغطي معظم الحوارات بدون تعديل فردي. للجداول، استبدال `<TableCell>{x.phone}</TableCell>` بـ `<TableCell><MaskedPhone value={x.phone} /></TableCell>`.

## 6) واجهة الإدارة
في `AdminPermissionsPage`:
- ستظهر صلاحية جديدة باسم **"الاطلاع على أرقام التواصل"** ضمن صلاحيات النظام
- الأدمن يقدر يفعّلها لأي دور بنقرة واحدة
- التغيير يطبّق فوراً (RLS + UI re-fetch)

## 7) الفحص النهائي
- مستخدم بدون الصلاحية: يرى شريط أسود في كل مكان، لا يستطيع نسخ الرقم، لا يظهر في DOM inspector كنص واضح (مُخزّن في CSS attribute فقط).
- مستخدم بالصلاحية: يرى الأرقام طبيعية.
- النموذج (Input) عند الإدخال يبقى يعمل عادي لأن المستخدم يكتب رقمه بنفسه.

## الملفات المتأثرة
**جديدة:**
- `src/hooks/usePhonePermission.ts`
- `src/components/shared/MaskedPhone.tsx`
- Migration: إضافة `view_phone_numbers` لجدول permissions

**معدلة:**
- `src/index.css` (CSS الحماية)
- `src/components/dialogs/ViewDetailsDialog.tsx` (فحص تلقائي)
- ~12 صفحة جداول تعرض أرقام جوال
- `src/pages/AdminPermissionsPage.tsx` (إظهار الصلاحية الجديدة بالعربي)

## الناتج
خصوصية كاملة لأرقام التواصل + نظام صلاحيات مرن + حماية ضد النسخ والـ DevTools snooping البسيط.


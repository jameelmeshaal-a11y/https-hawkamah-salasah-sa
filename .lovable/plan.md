

# خطة الإصلاح الشاملة

## 1) مشكلة "تبديل المستخدمين" (الأهم)
**السبب الجذري:** يوجد 3 حسابات في قاعدة البيانات:
- `ceo@salasah.sa` (المدير التنفيذي) — محمي ✅
- `admin@salasa.sa` (مدير النظام) — system_admin غير محمي ❌
- `admin@salasah.sa` (م. خالد السعيد) — admin غير محمي ❌

عند تسجيل الدخول كـ CEO، الـ Session أحياناً يلتقط cache من حساب آخر بسبب عدم تنظيف الـ localStorage. كذلك صفحة "إدارة المستخدمين" تعرض حساب خالد لأنه ليس محمياً.

**الحل:**
- **تنظيف الجلسة بقوة** في `signOut`: استدعاء `supabase.auth.signOut({ scope: 'global' })` + مسح `localStorage` يدوياً لمفاتيح Supabase + إعادة تحميل الصفحة لمنع أي state عالق.
- **إصلاح `onAuthStateChange`:** عند `SIGNED_OUT` نمسح كل state ونعيد التوجيه لـ `/login`.
- **حماية حساب خالد السعيد:** تعيين `is_protected = true` في DB كي لا يظهر لباقي المستخدمين (بما فيهم الـ CEO).
- **حذف الحساب المكرر** `admin@salasa.sa` (مدير النظام) لأنه سبب الالتباس.
- **إخفاء حسابات system_admin** من قائمة المستخدمين تلقائياً (إخفاء مزدوج: `is_protected` + الدور `system_admin`).

## 2) صلاحية رؤية أرقام الجوال
- التأكد من أن `view_phone_numbers` ممنوحة لـ `system_admin` و `admin` فقط افتراضياً عبر migration (الإعدادات الحالية تمنحها لـ `system_admin` فقط — سنضيف `admin` كذلك حسب طلبك).
- باقي الأدوار (`supervisor`, `user`, `auditor`) → الأرقام محجوبة كاملاً.
- التحقق العملي: تسجيل دخول كـ user → فتح قاعدة المستفيدين → التأكد من ظهور الشريط الأسود.

## 3) زر اللوقو يعود للصفحة الرئيسية
في `DashboardHeader.tsx`: لف القسم اليميني (الأيقونة + النص "نظام حوكمة") بـ `<Link to="/">` مع cursor-pointer.

## 4) Breadcrumb قابل للنقر بالكامل
في `InnerPageLayout.tsx`:
- `sectionTitle` يصبح `<Link>` يرجّع لصفحة الموديول عند توفر `sectionSlug` اختياري — وإلا نستخدم `navigate(-1)`.
- إضافة prop جديد `sectionPath?: string` لربط القسم برابط فعلي عند الحاجة.
- صفحة الحضور: `الرئيسية ← المكتب الإلكتروني ← الخدمات المكتبية (clickable) ← تسجيل الحضور`.

## 5) إصلاح "تسجيل الحضور والانصراف"
**المشكلة:** `WeeklyRecordTable` و `DailyRecordTable` يستخدمان بيانات ثابتة (mock) ولا يقرآن من جدول `attendance` فعلياً.

**الحل:**
- تعديل `WeeklyRecordTable` و `DailyRecordTable` لاستخدام `useAttendance` وفلترة سجلات المستخدم الحالي (`employee_id = user.id`) لآخر 7 أيام / اليوم الحالي.
- `AttendanceButton` يميّز تلقائياً بين تسجيل **حضور** (إذا لم يوجد سجل اليوم) أو **انصراف** (تحديث `check_out` إذا يوجد check_in بدون check_out).
- إظهار toast واضح + إعادة جلب البيانات فوراً بعد التسجيل.
- حساب صافي ساعات العمل تلقائياً من `check_in` و `check_out`.

## الملفات المعدّلة
| الملف | التعديل |
|------|--------|
| `src/contexts/AuthContext.tsx` | تنظيف قوي للجلسة + معالجة SIGNED_OUT |
| `src/components/dashboard/AdminNavMenu.tsx` | إعادة توجيه إجبارية بعد signOut |
| `src/components/dashboard/DashboardHeader.tsx` | تحويل اللوقو إلى Link |
| `src/components/layout/InnerPageLayout.tsx` | breadcrumb قابل للنقر |
| `src/pages/AdminUsersPage.tsx` | إخفاء system_admin أيضاً |
| `src/components/attendance/WeeklyRecordTable.tsx` | ربط بـ useAttendance |
| `src/components/attendance/DailyRecordTable.tsx` | ربط بـ useAttendance |
| `src/components/attendance/AttendanceButton.tsx` | منطق حضور/انصراف ذكي |
| `src/pages/items/AttendancePage.tsx` | تمرير sectionPath لـ breadcrumb |

## Migration قاعدة البيانات
```sql
-- حماية حساب خالد السعيد (إخفاؤه)
UPDATE profiles SET is_protected = true 
WHERE email = 'admin@salasah.sa';

-- حذف الحساب المكرر admin@salasa.sa
DELETE FROM user_roles WHERE user_id = (SELECT user_id FROM profiles WHERE email='admin@salasa.sa');
DELETE FROM profiles WHERE email = 'admin@salasa.sa';
-- (auth.users سيُحذف عبر cascade أو يدوياً في Edge Function إن لزم)

-- منح admin صلاحية رؤية أرقام الجوال
INSERT INTO role_permissions (role, permission_id)
SELECT 'admin', id FROM permissions WHERE action='view_phone_numbers'
ON CONFLICT DO NOTHING;
```

## التحقق
1. تسجيل دخول كـ CEO → فتح "إدارة المستخدمين" → يجب ألا يظهر CEO ولا خالد السعيد ولا admin@salasa.sa.
2. تسجيل خروج ثم دخول → يجب ألا يحدث "قفز" بين الحسابات.
3. الضغط على اللوقو → يعود للرئيسية.
4. في صفحة الحضور: الضغط على "الخدمات المكتبية" في breadcrumb → يعود لصفحة المكتب الإداري.
5. الضغط على زر "تسجيل الحضور" → يُسجَّل في DB ويظهر فوراً في الجدول اليومي والأسبوعي.
6. تسجيل دخول كمستخدم عادي → الأرقام محجوبة بشريط أسود.


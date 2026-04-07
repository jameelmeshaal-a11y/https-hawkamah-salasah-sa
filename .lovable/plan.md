

# التحديث 1: إصلاحات حرجة + جداول + Hooks

## الشروط المتفق عليها — مفهومة وموافق عليها

- 3 تحديثات متتالية، كل تحديث يسلّم صفحات مكتملة
- بعد كل تحديث: قائمة محدّثة بحالة كل صفحة
- لا انتقال للتحديث التالي بدون اعتمادك
- كل صفحة مذكورة في الحصر ستُعالج ضمن أحد التحديثات الثلاثة

---

## التحديث 1 — المراحل 1+2+3

### المرحلة 1: إصلاح الأخطاء الحرجة (3 إصلاحات)

1. **useNotifications.ts** — إعادة ترتيب `.channel().on().subscribe()` لمنع الشاشة البيضاء
2. **EmptyState** — إضافة `asTableRow` في كل استخدام داخل `<TableBody>` (~48 ملف)
3. **hijriConverter.ts** — استبدال بـ `Intl.DateTimeFormat` مع `islamic-umalqura`

### المرحلة 2: إنشاء 17 جدول ناقص

Migration واحد ينشئ:
`attendance`, `personal_notes`, `tasks`, `transactions`, `projects`, `suppliers`, `guardians`, `dependents`, `strategic_plans`, `indicators`, `assembly_members`, `shareholders`, `cost_centers`, `bank_accounts`, `budgets`, `mail_messages`, `activities`

مع RLS + triggers + بيانات تجريبية واقعية لكل جدول.

### المرحلة 3: إنشاء 17 Hook جديد

`useAttendance`, `usePersonalNotes`, `useTasks`, `useTransactions`, `useProjects`, `useSuppliers`, `useGuardians`, `useDependents`, `useStrategicPlans`, `useIndicators`, `useAssemblyMembers`, `useShareholders`, `useCostCenters`, `useBankAccounts`, `useBudgets`, `useMailMessages`, `useActivities`

كل hook يوفر: fetch, add, update, delete + toast feedback + loading state.

### النتيجة المتوقعة بعد التحديث 1

- الشاشة البيضاء تختفي
- التاريخ الهجري صحيح
- 17 جدول جديد جاهز مع بيانات
- 17 hook جاهز للربط
- الصفحات الـ 6 العاملة تبقى تعمل
- البنية التحتية جاهزة للتحديث 2 (الربط الفعلي)


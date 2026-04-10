

# تشخيص جذري: لماذا لا تعمل الأزرار في النظام

## التشخيص — 5 أسباب جذرية

### السبب 1: GenericModulePage واجهة فارغة تماماً
الملف `src/pages/items/GenericModulePage.tsx` هو الصفحة الافتراضية لأي عنصر ليس له صفحة مخصصة في `itemRoutes.ts`. هذا الملف يعرض **جداول فارغة بلا أي ربط بقاعدة البيانات** — لا hooks، لا fetch، لا handlers. الأزرار (إضافة جديد، تصدير، فلترة) **لا تفعل شيئاً**. هذا وحده يؤثر على **120+ صفحة**.

### السبب 2: بيانات ثابتة (hardcoded) في 12+ صفحة مخصصة
الصفحات التالية تعرض بيانات مكتوبة يدوياً بدل جلبها من DB:
- `BoardMembersDatabasePage` — `demoData` ثابت
- `AssemblyMembersDatabasePage` — `demoData` ثابت
- `ManageMembersAccountsPage` — `demoData` ثابت
- `LateMembersPaymentPage` — `demoData` ثابت
- `CancelMemberSubscriptionPage` — `demoData` ثابت
- `UpdateBoardMemberPage` — `demoData` ثابت
- `AttendanceLogsPage` — `mockAttendanceLogs` ثابت
- `ManageCostCentersPage` — `costCenters` ثابت
- `ProjectsDatabaseWithFilterPage` — `allProjectsData` ثابت
- `GuardiansDatabasePage` — `mockGuardians` ثابت
- `ManageGuardiansAccountsPage` — `mockGuardians` ثابت
- `ConvertBeneficiaryToGuardianPage` — `mockRecords` ثابت
- `ConvertGuardianToBeneficiaryPage` — `mockRecords` ثابت

### السبب 3: 375 استخدام لـ console.log في 53 ملفاً
أزرار كثيرة مربوطة بـ `console.log` بدل عمليات حقيقية. أمثلة:
- `MailPage.tsx` — إنشاء/حذف/أرشفة بريد = console.log
- `AidCommitteeBalancePage` — إضافة سجل = console.log
- `CreateTaskPage` — فلترة = console.log
- `ProjectsDatabaseWithFilterPage` — إدارة/معاينة = console.log
- `ExportDropdown` — التصدير الفعلي = console.log
- `SubSectionGrid` — النقر على بطاقات القسم = console.log
- `DashboardSidebar` — النقر على عنصر جانبي = console.log
- 16 صفحة تقارير مالية — التصدير = console.log

### السبب 4: أزرار "عرض التفاصيل" في الصفحة الرئيسية لا تفعل شيئاً
في `KpiCards.tsx` السطر 24-26، زر "عرض التفاصيل" هو `<button>` بدون أي `onClick` handler — لا يفعل شيئاً عند الضغط.

### السبب 5: التاريخ الهجري
ملف `hijriConverter.ts` تم تحديثه لاستخدام `Intl.DateTimeFormat` مع `islamic-umalqura` — هذا **تم إصلاحه فعلاً** في التحديث 1. لكن `WelcomeCards.tsx` يستخدم `ar-SA-u-ca-islamic` (بدون `umalqura`)، مما قد يعطي نتائج مختلفة قليلاً عن التقويم الرسمي السعودي.

---

## خطة الإصلاح الجذري الشامل

### المرحلة 1: تحويل GenericModulePage إلى محرك CRUD ذكي (يغطي ~120 صفحة)

**الملف:** `src/pages/items/GenericModulePage.tsx`

**التعديل:**
1. إنشاء mapping بين `itemSlug` وجدول DB المناسب (مثلاً `beneficiaries-database` → `beneficiaries`)
2. جلب البيانات تلقائياً من الجدول عند فتح الصفحة
3. إضافة Dialog إضافة/تعديل ديناميكي يعرض حقول الجدول
4. إضافة ViewDetailsDialog وConfirmDeleteDialog
5. ربط أزرار التصدير بتصدير حقيقي (jsPDF + xlsx)
6. عرض loading spinner أثناء الجلب
7. عرض "لا توجد بيانات" عند فراغ الجدول

### المرحلة 2: استبدال البيانات الثابتة في 13 صفحة مخصصة

كل صفحة من الـ 13 المذكورة أعلاه:
- حذف `demoData` / `mockData` / `allProjectsData`
- استيراد Hook المناسب (`useBoardMembers`, `useAssemblyMembers`, `useAttendance`, `useCostCenters`, `useProjects`, `useGuardians`)
- جلب البيانات الحقيقية من DB
- ربط أزرار المعاينة/الحذف/التعديل بـ handlers حقيقية

### المرحلة 3: استبدال 375 console.log في 53 ملفاً

لكل console.log يتم تحديد نوع العملية:
- **تصدير** → ربط بـ jsPDF/xlsx client-side
- **إدارة/معاينة** → فتح ViewDetailsDialog أو navigate
- **حذف** → فتح ConfirmDeleteDialog → حذف من DB
- **فلترة** → تصفية فعلية للبيانات
- **إرسال نموذج** → حفظ في Supabase

### المرحلة 4: إصلاح KpiCards — أزرار "عرض التفاصيل"

تحويل كل زر "عرض التفاصيل" في بطاقات الصفحة الرئيسية إلى `<Link>` يوجه للصفحة المناسبة:
- المستفيدون → `/module/beneficiary-accounts/beneficiaries-database`
- المتطوعون → `/module/volunteering/volunteers-database`
- المتبرعون → `/module/financial-resources/sponsors-list`
- أعضاء مجلس الإدارة → `/module/members/board-members-database`
- الطلبات المعلقة → `/module/office/pending-requests`

### المرحلة 5: توحيد التاريخ الهجري

تحديث `WelcomeCards.tsx` لاستخدام `islamic-umalqura` بدل `islamic` لضمان التوافق مع التقويم السعودي الرسمي.

### المرحلة 6: إصلاح ExportDropdown — تصدير حقيقي

استبدال `console.log` في `ExportDropdown.tsx` بتصدير فعلي:
- Excel: استخدام مكتبة `xlsx`
- PDF: استخدام `jsPDF` مع `jspdf-autotable`

### المرحلة 7: إصلاح DashboardSidebar و SubSectionGrid

- `DashboardSidebar.tsx` السطر 147: استبدال `console.log` بـ navigation فعلي (الأقسام الفرعية تستخدم `SidebarSubItem` مع `<Link>` بالفعل — الـ console.log في callback غير ضروري)
- `SubSectionGrid.tsx` السطر 27: حذف `onClick={() => console.log(...)}` لأن `SubItemCard` يستخدم `<Link>` بالفعل عندما يوجد `slug`

### المرحلة 8: بيانات تجريبية في الجداول الفارغة

إدراج بيانات تجريبية واقعية بأسماء سعودية في كل الجداول الجديدة (17 جدول) التي لا تزال فارغة.

---

## ملخص الحجم

| العنصر | العدد |
|--------|-------|
| GenericModulePage (إعادة بناء) | 1 ملف يغطي ~120 صفحة |
| صفحات مخصصة ببيانات ثابتة | 13 ملف |
| ملفات بـ console.log | 53 ملف (375 استبدال) |
| KpiCards | 1 ملف |
| WelcomeCards | 1 ملف |
| ExportDropdown | 1 ملف |
| DashboardSidebar | 1 ملف |
| SubSectionGrid | 1 ملف |
| Migration بيانات تجريبية | 1 migration |

**النتيجة:** كل زر في النظام سيؤدي وظيفة حقيقية، كل جدول سيعرض بيانات من DB، وكل نموذج سيحفظ فعلياً.


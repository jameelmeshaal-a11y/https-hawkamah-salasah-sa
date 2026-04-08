

# التحديث 2: خطة التنفيذ الشاملة

## الحالة الفعلية بعد التحديث 1

**ما تم فعلاً:**
- useNotifications.ts — تم إصلاح ترتيب `.on()` قبل `.subscribe()` ✅
- hijriConverter.ts — تم الانتقال لـ `Intl.DateTimeFormat` مع `islamic-umalqura` ✅
- EmptyState — تم إضافة `asTableRow` في بعض الصفحات ✅
- 17 جدول جديد — موجودة في DB بالفعل ✅
- 17 Hook جديد — موجودة ومكتملة ✅

**ما لم يتم:**
- كل الـ 17 جدول الجديدة **فارغة تماماً** — صفر بيانات تجريبية
- `is_protected` غير موجود في جدول profiles — حماية الأدمن غير مطبقة
- Breadcrumb — `moduleTitle` و `sectionTitle` لا تزال `<span>` غير قابلة للنقر
- NoteForm — لا يزال يستخدم `console.log`
- AttendanceButton — لا يحفظ في DB (toast فقط)
- ExportDropdown — لا يزال `console.log`
- TransactionForm — لا يحفظ في DB
- SuppliersDatabasePage — بيانات hardcoded
- ProjectsDatabaseWithFilterPage — بيانات hardcoded
- GenericModulePage — واجهة فارغة بالكامل
- AdminUsersPage — لا يوجد زر "إضافة مستخدم جديد"

---

## خطة التنفيذ — مرتبة بالأولوية

### المرحلة أ: قاعدة البيانات (Migration + Seed Data)

**1. Migration — إضافة `is_protected` + trigger حماية الأدمن:**
```sql
ALTER TABLE profiles ADD COLUMN is_protected boolean DEFAULT false;
-- تعيين الأدمن الحالي كمحمي
-- Trigger يمنع DELETE/UPDATE على role لصفوف is_protected
```

**2. Seed Data — إدراج بيانات تجريبية واقعية:**
- attendance: 10 سجلات
- personal_notes: 5 مذكرات
- tasks: 8 مهام
- transactions: 6 معاملات
- projects: 5 مشاريع
- suppliers: 5 موردين
- strategic_plans: 2 خطة
- indicators: 6 مؤشرات
- assembly_members: 7 أعضاء
- shareholders: 5 مساهمين
- cost_centers: 4 مراكز
- bank_accounts: 3 حسابات
- budgets: 2 ميزانية
- mail_messages: 5 رسائل
- activities: 5 أنشطة
- guardians: 4 أوصياء
- dependents: 5 تابعين

### المرحلة ب: Edge Function — إنشاء مستخدم جديد

تعديل `bootstrap-admin/index.ts` لدعم إنشاء مستخدمين عاديين (ليس فقط admin) مع تحديد الدور والقسم والوظيفة.

### المرحلة ج: مكونات مشتركة جديدة (4 مكونات)

1. **AddUserDialog** — إنشاء مستخدم في Supabase Auth + profiles + user_roles
2. **ViewDetailsDialog** — عرض تفاصيل أي سجل (key-value pairs)
3. **ConfirmDeleteDialog** — تأكيد حذف مع نص مخصص
4. **CreateTaskDialog** — إنشاء مهمة لموظف مع اختيار من قائمة الموظفين

### المرحلة د: إصلاح المكونات المشتركة (4 ملفات)

| المكون | الإصلاح |
|--------|---------|
| NoteForm.tsx | ربط بـ `usePersonalNotes.addNote()` بدل console.log |
| AttendanceButton.tsx | ربط بـ `useAttendance.addRecord()` |
| ExportDropdown.tsx | تصدير فعلي باستخدام client-side (jsPDF + xlsx) |
| TransactionForm.tsx | ربط بـ `useTransactions.addTransaction()` |

### المرحلة هـ: صفحة إدارة المستخدمين (AdminUsersPage)

- إضافة زر "إضافة مستخدم جديد" يفتح AddUserDialog
- إضافة زر تعديل الصلاحية (موجود)
- إضافة زر تفعيل/تعطيل (موجود)
- حماية الأدمن المحمي:
  - UI: إخفاء أزرار الحذف/التعديل لحساب `is_protected`
  - Hook: فحص `is_protected` قبل أي mutation
  - DB: trigger يمنع الحذف

### المرحلة و: Breadcrumb قابل للنقر

تعديل `InnerPageLayout.tsx`:
- تحويل `moduleTitle` من `<span>` إلى `<Link to={/module/${moduleId}}>`
- `sectionTitle` يبقى نصاً (لا يوجد مسار مباشر للأقسام)

### المرحلة ز: ربط الصفحات الرئيسية (50+ صفحة ⚠️)

كل صفحة فيها console.log أو بيانات hardcoded — استبدالها بـ hooks + DB:

**المكتب الإلكتروني:**
- CreateTaskPage, CompleteTaskPage, DeleteTaskPage, ManageTasksPage → useTasks
- CurrentAttendancePage, AttendancePage → useAttendance
- PersonalNotesPage, NotesTable, NoteForm → usePersonalNotes
- MailPage → useMailMessages
- InternalTransactionPage → useTransactions
- PendingRequestsPage, ApprovedRequestsPage, etc. → useRequests (فلتر status)
- PermissionRequestPage, FinancialRequestPage, GeneralRequestPage, CarRequestPage → useRequests

**الإدارة الإشرافية:**
- CreateGeneralTaskPage → useTasks
- NotificationsManagementPage → useNotifications
- PaymentConfirmationsManagementPage → useTransactions

**الشؤون المالية (16 صفحة تقارير):**
- TrialBalancePage, JournalBookPage, AccountingBooksPage, etc. → تصدير فعلي PDF/Excel

**إدارة المشاريع:**
- ProjectsDatabaseWithFilterPage, AddNewProjectPage, etc. → useProjects

**الموردين:**
- SuppliersDatabasePage → useSuppliers (بدل hardcoded)

**الخطط الاستراتيجية:**
- StrategicPlansManagementPage, StrategicGoalsManagementPage → useStrategicPlans

**الأعضاء:**
- AssemblyMembersDatabasePage → useAssemblyMembers
- ShareholdersAccountsPage → useShareholders
- BoardMembersDatabasePage → useBoardMembers (موجود)

### المرحلة ح: ربط الصفحات الثانوية (182 صفحة ❌)

أغلب هذه الصفحات تستخدم `GenericModulePage` — سيتم تحويلها:

**الاستراتيجية:** بدلاً من تعديل 182 ملف منفصل، سيتم:
1. تحسين `GenericModulePage` ليصبح ذكياً — يربط تلقائياً بالجدول المناسب حسب `itemSlug`
2. إضافة mapping بين slugs والجداول
3. إضافة CRUD حقيقي داخل GenericModulePage (add dialog + view + edit + delete)
4. الصفحات المخصصة (التي لها ملف خاص) تُعدّل يدوياً

هذا يغطي ~120 صفحة تلقائياً عبر GenericModulePage المحسّن.

الصفحات الـ 60+ المتبقية التي لها ملفات مخصصة تُعدّل واحدة واحدة.

### المرحلة ط: NotesTable + AttendanceTabs

- NotesTable: جلب من DB + أزرار عرض/تعديل/حذف
- AttendanceTabs: جلب سجلات حقيقية من attendance

---

## ملخص الحجم

| العنصر | العدد |
|--------|-------|
| Migration SQL | 1 (is_protected + trigger + seed data) |
| مكونات مشتركة جديدة | 4 (AddUserDialog, ViewDetailsDialog, ConfirmDeleteDialog, CreateTaskDialog) |
| مكونات مشتركة معدّلة | 6 (NoteForm, AttendanceButton, ExportDropdown, TransactionForm, InnerPageLayout, GenericModulePage) |
| صفحات معدّلة يدوياً | ~60 |
| صفحات مغطاة عبر GenericModulePage المحسّن | ~120 |
| Edge Function معدّل | 1 (bootstrap-admin) |
| جداول مملوءة ببيانات | 17 |

---

## ملاحظة مهمة حول الحجم

هذا التحديث يشمل تعديل أو إنشاء **~70 ملف** مع migration وبيانات تجريبية. سأنفذه بالكامل في تحديث واحد مستمر. كل زر سيعمل فعلاً وكل console.log ستُزال.


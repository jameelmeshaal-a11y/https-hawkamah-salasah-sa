

# خطة إضافة أزرار "إضافة" لجميع الشاشات الناقصة

## التشخيص

بعد فحص الكود، تم اكتشاف أن:

1. **`GenericModulePage`** (محرك CRUD العام) يخدم ~120 صفحة عبر slug. حالياً قد لا يعرض زر "إضافة جديد" لكل الجداول، أو يظهر زراً لا يحفظ فعلياً.

2. **صفحات بجداول ثابتة بدون زر إضافة** — تعرض `<table>` أو `<EmptyState>` فقط:
   - `RestoreDeletedProjectPage`, `RestoreSupplierAccountPage` (إجراء استعادة فقط — صحيح)
   - `RegisterProjectExpensePage` — يحتاج "تسجيل مصروف" بدلاً من "إدارة"
   - `RegisterProjectRevenuePage` — يحتاج "تسجيل إيراد" بدلاً من "إدارة"
   - `MailPage` — `onNewMail` فيه `console.log` فقط (مخالف للسياسة)
   - `CancelledTransactionsPage`, `CompletedTransactionsPage`, `CancelTransactionPage` — صفحات عرض فقط (صحيح، لا تحتاج زر إضافة)
   - صفحات `Issue*`, `Add*`, `Create*`, `Manage*` المختلفة

3. **`InnerPageLayout`** يدعم خاصية `headerAction` لكنها غير مستخدمة في معظم الصفحات.

4. **سياسة Zero Placeholder** تمنع أي زر بدون handler حقيقي مرتبط بـ Supabase.

## النطاق المطلوب

### أ — إصلاح GenericModulePage (يغطي ~120 صفحة دفعة واحدة)
- التأكد من ظهور زر **"إضافة سجل جديد"** أعلى يسار كل جدول
- ربطه بـ Dialog ديناميكي يحفظ فعلياً في الجدول المُستهدف عبر `slug → table` mapping
- إضافة toast نجاح + إعادة تحميل البيانات

### ب — إصلاح صفحات المعاملات والمشاريع المالية
| الصفحة | الزر المطلوب | الإجراء |
|--------|-------------|---------|
| `RegisterProjectExpensePage` | "تسجيل مصروف" | فتح Dialog إدخال مبلغ + سبب + حفظ في `journal_entries` |
| `RegisterProjectRevenuePage` | "تسجيل إيراد" | نفس المنطق لكن للإيرادات |
| `MailPage` | "رسالة جديدة" | فتح Dialog إنشاء بريد + حفظ في `mail_messages` |

### ج — صفحات الإصدار (Issue Pages)
- `IssueGeneralPaymentPage`, `IssueGeneralReceiptPage`, `CollectGeneralDonationPage` — التحقق من وجود زر إضافة وأنه يحفظ في الجداول الصحيحة (`donations`, `journal_entries`)

### د — صفحات الإدارة (Manage Pages)
- `ManageBankAccountsPage`, `ManageCostCentersPage`, `ManageBudgetsPage`, `ManageContractsPaymentsPage`, إلخ — كلها تحتاج زر "إضافة" مرتبط بجدول DB

### هـ — صفحات الطلبات والمهام
- التأكد من أن جميع صفحات `*Request*Page` و`*Task*Page` تحتوي على زر "إضافة طلب جديد" / "إضافة مهمة جديدة" مرتبط بـ `requests` / `tasks`

## التنفيذ

| الملف | التعديل |
|-------|---------|
| `src/pages/items/GenericModulePage.tsx` | إضافة/تأكيد زر "إضافة سجل جديد" + Dialog ديناميكي يحفظ في الجدول المحدد بالـ slug |
| `src/pages/items/RegisterProjectExpensePage.tsx` | استبدال زر "إدارة" بزر "تسجيل مصروف" + Dialog حفظ في `journal_entries` |
| `src/pages/items/RegisterProjectRevenuePage.tsx` | استبدال زر "إدارة" بزر "تسجيل إيراد" + Dialog حفظ في `journal_entries` |
| `src/pages/items/MailPage.tsx` | ربط `onNewMail` بـ Dialog إنشاء بريد فعلي يحفظ في `mail_messages` |
| `src/components/dialogs/NewMailDialog.tsx` (جديد) | Dialog إرسال بريد داخلي |
| `src/components/dialogs/RegisterFinancialDialog.tsx` (جديد) | Dialog موحد لتسجيل مصروف/إيراد |
| `src/components/dialogs/GenericAddRecordDialog.tsx` (جديد إن لم يوجد) | Dialog ديناميكي يولد الحقول بناء على slug |
| `src/utils/slugToTable.ts` (جديد إن لم يوجد) | Mapping من slug → table name + حقول |

## النتيجة المتوقعة
- كل شاشة جدول تحتوي على زر "إضافة" واضح في الأعلى
- كل زر إضافة يفتح Dialog حقيقي يحفظ في DB
- toast نجاح + تحديث القائمة فوراً بعد الحفظ
- لا يوجد أي زر بدون وظيفة (التزام كامل بسياسة Zero Placeholder)
- صفحات العرض فقط (الملغاة/المكتملة/المؤرشفة) لا تحتوي على زر إضافة (سلوك صحيح)


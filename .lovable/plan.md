

# خطة إنشاء حساب الأدمن وإصلاح تسجيل الدخول/الخروج وإضافة المستخدمين

## التشخيص

1. **لا يوجد حساب بالبريد `ceo@salasah.sa`** — الحسابات الموجودة هي `admin@salasah.sa` و `admin@salasa.sa`
2. **Edge Function `bootstrap-admin` تعمل بشكل صحيح** من حيث الكود — تنشئ المستخدم في Auth + profile + role
3. **تسجيل الدخول يعمل تقنياً** عبر `supabase.auth.signInWithPassword` — المشكلة المحتملة أن الحسابات الحالية غير مؤكدة أو كلمات المرور خاطئة
4. **تسجيل الخروج يعمل** عبر `AdminNavMenu` → `signOut()`
5. **AddUserDialog يستدعي `bootstrap-admin`** بشكل صحيح

## المطلوب تنفيذه

### 1. إنشاء حساب الأدمن الرئيسي
- استدعاء Edge Function `bootstrap-admin` لإنشاء حساب `ceo@salasah.sa` بكلمة مرور `Admin@2026!` مع دور `system_admin` وتفعيل `is_protected`
- يجب تنفيذ هذا عبر `curl` مباشرة للـ Edge Function (بدون auth header لأنه أول system_admin — لكن يوجد بالفعل system_admin، لذلك يجب إما حذف الحسابات القديمة أو استدعاء الـ function بصلاحيات admin موجود)
- الحل الأفضل: استخدام migration لإنشاء المستخدم مباشرة عبر `auth.users` ثم إضافة profile + role

### 2. إصلاح AuthContext — race condition
- `fetchProfile` يستخدم `.single()` بدون error handling — إذا لم يوجد profile يعلق
- إضافة error handling وضمان `setLoading(false)` في كل الحالات

### 3. إصلاح عملية تسجيل الخروج
- بعد `signOut()` يجب التأكد من إعادة التوجيه لـ `/login`
- حالياً `signOut` تمسح الحالة لكن لا تعيد التوجيه — `ProtectedRoute` يتكفل بذلك عبر `Navigate`

### 4. إصلاح AddUserDialog
- التأكد من أن `bootstrap-admin` Edge Function منشورة وتعمل
- إعادة نشر الـ function إذا لزم الأمر

## التنفيذ

| الملف | التعديل |
|-------|---------|
| Edge Function call (curl) | إنشاء حساب `ceo@salasah.sa` |
| `src/contexts/AuthContext.tsx` | إضافة error handling لـ fetchProfile/fetchRoles |
| `supabase/functions/bootstrap-admin/index.ts` | إعادة نشر + تأكيد أنها تعمل |
| `src/pages/LoginPage.tsx` | تحسين رسائل الخطأ |

## النتيجة المتوقعة
- حساب `ceo@salasah.sa` يعمل ويمكن تسجيل الدخول به
- تسجيل الخروج يعيد لصفحة الدخول
- إضافة مستخدم جديد من إدارة المستخدمين ينشئ حساب حقيقي يمكنه تسجيل الدخول


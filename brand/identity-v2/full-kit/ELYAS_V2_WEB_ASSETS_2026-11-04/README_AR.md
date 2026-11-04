# ملفات الويب المعتمدة — ELYAS AL SHAEBI V2

**المصدر الوحيد:** حزمة `ELYAS_Personal_Identity_v2_QA_REVIEWED` المبنية على آخر مرجع أقرّه المستخدم (شريط نحاسي داخل حرف E).
**الألوان:** بترولي `#0D4B52`، نحاسي `#B8734C`، عاجي `#F6EFE6`، ضبابي `#C9CED3`، أردوازي `#3E4A54`.

## طريقة التركيب
انسخ محتويات `public/brand/` إلى `public/brand/` في مشروع موقعك. أدخل محتويات `developer/HEAD_SNIPPET.html` في `<head>`، وصحح رابط الموقع داخل `og:image` و`twitter:image`. يمكن إدراج `developer/brand.css` للتوكنز.

## ما تستخدمه وأين؟
- **الشريط العلوي / Header:** `logo-primary.svg` للخلفيات الفاتحة، `logo-reverse.svg` للخلفيات الداكنة. الأفضل SVG لأنه متجهي وواضح على كل الشاشات.
- **الشاشة الصغيرة:** `logo-compact.svg`، أو `mark-transparent.svg` إذا المساحة ضيقة جدًا.
- **الفواصل / بطاقات الملف الشخصي:** `logo-horizontal-ar-en.svg`، ويوجد إصدار عكسي.
- **خلفية شفافة WebP:** `logo-primary-640.webp`، `logo-primary-960.webp`، `logo-reverse-640.webp`، ونسخ 320/1440. كل هذه لها قناة Alpha حقيقية.
- **خلفية شفافة PNG:** `logo-primary-960.png`، `logo-primary-1440.png`، والنسخ المعادلة العكسية، وأيقونات 256 و512.
- **رمز E فقط بشفافية:** `mark-transparent.svg` أو `mark-transparent-512.webp`/`.png`؛ العكسي `mark-reverse-transparent.*`.
- **Favicon/Chrome tabs:** `favicon.svg`، `favicon.ico`، `favicon-16.png` و`favicon-32.png` (هذه الأيقونات *بخلفية بترولية مقصودة*، وليست شفافة).
- **Apple/Android install:** `apple-touch-icon.png`، `pwa-192.png`، `pwa-512.png`، `pwa-maskable-192.png`، `pwa-maskable-512.png` مع `site.webmanifest`.
- **مشاركة واتساب/لينكدإن وغيرها:** `og-image.jpg` بقياس 1200×630؛ صورة المشاركة لها خلفية **غير شفافة** عمدًا.
- **الألوان والخطوط:** `developer/brand-tokens.json` و`developer/brand.css`.
- **الأنيميشن:** نسخ `motion/ELYAS_V2_MASTER_LAYERED.svg` و`ELYAS_V2_DETAILED_RIG.svg` و`layer-ids.json` تحافظ على المعرفات؛ لا تعتمد على صورة WebP/Png عند تحريك الحروف.

## مثال HTML
```html
<!-- شعار شفاف مع تبادل وفق وضع العرض الذي يحدده الموقع -->
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="/brand/logo-reverse.svg" />
  <img src="/brand/logo-primary.svg" alt="Elyas Al Shaebi" width="320" height="116" />
</picture>
```
لتجربة تسمح للمستخدم بتبديل الوضع داخل التطبيق، استخدم حالة الوضع الخاصة بالتطبيق بدل الاعتماد فقط على إعداد النظام.

## أحكام مهمة
1. **لم أغيّر الشكل الهندسي المعتمد.** ملفات WebP وPNG تم تصديرها من ملفات SVG المراجعة نفسها، وليس عبر توليد شعارات جديدة.
2. عند إدخال الشعار بتحريك طبقات SVG، استخدم SVG inline أو الاستيراد كمكوّن (وليس `<img>`) إذا أردت الوصول إلى مساراته الداخلية من JavaScript/GSAP.
3. لا ترفع رابط `YOUR_HTTPS_DOMAIN.example` كما هو عند النشر؛ استبدله بالرابط الفعلي.
4. ملف Manifest لا ينشئ PWA دون إعدادات التطبيق الأخرى كـService Worker إن أردت الاستخدام دون اتصال.
5. لا تتضمن الحزمة ملفات خطوط تجارية؛ خط Hind Modern يحتاج ترخيصًا أو استخدام بديل عربي مرخص.
6. النسخ التي بنيت من صورة مرجعية تبقى بحاجة إلى تدقيق نهائي لمنحنيات الحروف إن كان مطلوبًا تطابق مطلق مع الملف الأصلي غير المتاح.
7. ملفات الصور الشفافة تحتوي شفافية Alpha حقيقية؛ الملفات المملوءة خلفية هي favicon/PWA/المشاركة فقط.

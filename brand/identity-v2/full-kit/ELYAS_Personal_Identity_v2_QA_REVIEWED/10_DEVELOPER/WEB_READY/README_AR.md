# حزمة جاهزية الويب — ELYAS V2
انسخ مجلد `public/brand/` إلى مجلد `public/brand/` في مشروع الموقع، ثم الصق `HEAD_SNIPPET.html` داخل `<head>`.

**لا تنسَ** استبدال `PUBLIC_SITE_URL` بالرابط الرسمي الكامل للموقع مع `https://` قبل النشر. مثال قالب: `https://YOUR-REAL-DOMAIN/brand/og-image.jpg` (هذا ليس دومينًا فعليًا).

- `wordmark-primary.svg`: الشعار القياسي.
- `wordmark-reverse.svg`: النسخة العكسية (يجب توفير خلفية داكنة مناسبة).
- `lockup-ar-en-outlined.svg`: النسخة الثانوية العربية/الإنجليزية المحوّلة إلى مسارات؛ لا تعتمد على توفر الخطوط.
- `favicon.svg/.ico`, `favicon-16.png`, `favicon-32.png`: المتصفح.
- `apple-touch-icon.png`: اختصار iOS.
- `icon-192.png`, `icon-512.png`: أيقونات PWA.
- `maskable-icon-512.png`: نسخة بأمان إضافي لأشكال أيقونات Android المقصوصة.
- `site.webmanifest`: يبدأ من جذر الموقع (عدّل الاسم أو start_url عندما يتم ضبط النشر).
- `og-image.jpg`: صورة مشاركة 1200×630.

**تنبيه:** ملف manifest لا يعني أن الموقع PWA كامل؛ التشغيل دون إنترنت يحتاج إعداد Service Worker/التنقلات وهذا خارج حزمة الهوية.

**الخطوط:** لا تُوزع أي ملفات خطوط هنا. الخط العربي الموافق لهوية اللوحة Hind Modern يتطلب ترخيصًا، واستخدم Noto Sans Arabic بديلًا. خط الشعار الأصلي مرسوم كمسارات لا يحتاج خطوطًا.

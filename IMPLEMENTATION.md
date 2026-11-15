# Reference-based portfolio — 13 Nov 2026

The homepage is implemented from the approved single long screenshot in the conversation. Preserve layout, section order, color language, and portrait-first hero while adapting spacing to real viewports.

Sections: Navigation → Hero → About → Skills → Services → Process → Selected Projects → Featured Himma → Reasons to Work Together → Contact → Footer.

The official ELYAS AL SHAEBI brand assets under brand/identity are **reused, not redrawn**. Color tokens correspond to the approved identity: deep petrol #0D4B52, copper #B8734C, warm ivory #F6EFE6, fog gray #C9CED3.

The hero portrait, contact desk photo and identity artwork under assets/ were replaced on 16 Nov 2026 using the exact three user-supplied visual references, encoded as optimized WebP copies. The remaining project and featured previews are temporary artwork and should be replaced later with approved actual screenshots. Project previews do not assert that they are real screenshots. The counts and metrics reproduced from the reference are **unverified marketing placeholders**; confirm them before treating as actual case study data.

This is a dependency-free static site with mobile menu, theme toggle, accessible anchor navigation, reduced motion support, RTL semantics and responsive 390px/mobile breakpoints. No APIs or build pipeline are needed. To preview run: python3 -m http.server 8080

Manual review should cover 360/390/430/768/1024/1440 viewports, link destinations, image cropping, HTML validation, browser console, contrast, Arabic wrapping and final project data.

## Image layout pass

- Each user-provided image now uses the correct intrinsic 4:5 / 1:1 / 2:1 dimensions in the markup to prevent layout shifts.
- Hero portrait: capped height, facial focal point and softened edges on desktop and phone; the now-redundant extra watermark is hidden.
- Brand beside stats: square media card, balanced stats column and controlled badge overflow.
- Contact desk: dedicated 2:1 framed media surface that keeps the laptop, mug and copper mark visible instead of stretching the image.
- Additional responsive composition for tablet, mobile and narrow phones. Reduced-motion and the existing semantic HTML/links remain intact.

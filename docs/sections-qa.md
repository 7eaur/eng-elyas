# Scroll-driven About and Workflow

About is a three-paper dossier: the introduction stays beside the scene on desktop, and native vertical scroll peels away the foreground paper to reveal clarity, connection and continuity. On phones the introduction precedes a smaller sticky paper scene. Each principle has a reading hold before its paper turns. The principle buttons also navigate the sequence.

Workflow adapts the graphic-design gallery motion from https://therishithakor.com/graphic-designer/: a sticky scene, a wire, brass pegs, horizontal prints driven by vertical scroll, and damped angular movement based on track velocity. The direction is mirrored for Arabic RTL. Four illustrated text cards replace the reference photos. Previous/next controls, keyboard arrows and the existing contact dialog remain available.

Motion uses transforms and a finite settling loop, without intercepting wheel/touch events. Reduced-motion users receive ordinary content and a native horizontally scrollable workflow. Very short screens also use native scrolling instead of a cramped pinned workflow. Diagrams and controls are inline SVG; no new external dependency or raster assets.

Browser checks:

- 1363px desktop: paper sequence and pinned workflow; native scroll changes the transforms.
- 390×844: workflow moved from progress 0.0008 to 0.4931 with translateX 468.95px while pin top remained 94px; document width stayed 390px.
- A physical-position click on Next moved 01 to 02 at progress 0.3335. Native scrolling reached 04 at progress 1; the final print remained within the viewport.
- Workflow CTA opens the existing enquiry dialog.
- 390×568: second About principle remains fully readable with no internal card overflow.
- 320×568, 320×844, 768×844: workflow enabled, document width equals viewport, and no text-card overflow.
- 390×400: native workflow fallback, no document or card overflow.
- No application console errors observed; browser extension metadata errors are outside the app.
- Build and JavaScript syntax checks passed.

Evidence: `qa/sections/about-desktop.jpg`, `process-desktop.jpg`, `about-mobile.jpg`, `process-mobile.jpg`.

Phone checks use browser iframe viewports with native input, not physical iOS/Android devices. Reduced-motion fallback is implemented; OS preference switching was not available in this browser.

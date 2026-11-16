# Workflow motion and approved identity — 2026-11-16

Merged `preview/petrol-copper-identity-20261116` (b913827) into main (58aae09) using their common ancestor 45d73b8. Kept the newer About/Workflow/Journey sections, anchors, local Arabic font, native contact-panel scrolling and viewport handling. Applied petrol/copper tokens, approved SVG logos, compact social footer and header across the homepage and all five room pages. Preview history remains accessible.

## Motion fixes

- Cache section geometry during layout; no geometry reads in the section animation frame. Skip unchanged writes and offscreen About animation. Update step labels only when the step changes.
- Stable 100svh viewport measurement prevents mobile browser toolbar changes from rebuilding the scene. Width, orientation, font/header changes still recalculate it.
- Keep hanging paper angles on phones and move one composited horizontal track; desktop spring swing remains. Use elapsed-time interpolation and stop RAF when settled instead of 80 trailing frames.
- Stop offscreen Journey scroll updates. Batch floating back-to-top reads before writes; remove pointer-event toggling for hit testing.
- Initialize sections before the experience and resolve deep links after font/layout completion.

## Validation

- `node --test tests/section-motion.test.mjs`: 4 passing (stage bounds, bidirectional no-overshoot, frame-rate independence, stable toolbar sizing/orientation change).
- `npm run build`: passed, 37 modules.
- Browser native scroll tested forward through 01–04 and reverse; entering/exiting the workflow works. Contact final step scroll reaches the bottom: panel scrollTop 255, clientHeight 809, scrollHeight 1065; no submission made.
- 320×640 and 390×844: document width equals viewport, all four paper contents fit their cards. 390×400: native horizontal gallery fallback. 1363 desktop: contents fit, desktop hanging motion retained.
- Checked approved header logo, About styling and phone footer, including quick links and WhatsApp. Instagram/LinkedIn placeholders remain noninteractive as on the preview branch.
- Direct desktop #process link rechecked after initialization fix.

The remote browser throttled RAF to roughly 1 Hz in both comparison runs. Those FPS readings are invalid as device performance evidence; no physical iPhone/Safari frame-rate claim is made. Screenshots and geometry checks confirm layout/functionality; physical-device smoothness remains a user-device check.

Screenshots: `qa/workflow-phone-20261116.jpg`, `qa/footer-phone-20261116.jpg`.

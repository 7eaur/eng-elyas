# About and workflow sections

Adds an Arabic personal introduction with a paper-style values card and a four-stage workflow using the established door colours, neutral surfaces, local font and existing light/dark tokens. Existing journey remains at `#journey`; `#about` now targets the new introduction. Footer links and project-room About navigation follow the new anchor.

Verified in browser at 320, 390, 768 and 1363 CSS pixels: document width equals viewport width, four workflow stages present, and text wraps without horizontal overflow. Workflow switches from a four-column rail to two columns on intermediate screens and a vertical rail on phones. Verified the About navigation, the inline workflow link, and the workflow CTA opening the existing contact dialog. Checked the desktop dark theme. One-time IntersectionObserver reveals respect reduced motion; content is readable without animation or JavaScript.

Evidence in `qa/sections/`: `about-desktop.jpg`, `process-desktop.jpg`, `about-mobile.jpg`, `process-mobile.jpg`.

Build: npm run build passed. Browser mobile checks use real iframe viewports, not physical iOS/Android devices.

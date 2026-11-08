# ELYAS AL SHAEBI — interactive website preview

Light-first, fully responsive portfolio hero plus a real navigable homepage preview. The official brand identity remains in `brand/identity/`, untouched.

## Try locally

Run a static file server in the repository root, for example `python3 -m http.server 8080`, and open `http://localhost:8080`.

## Scope

- Official primary and icon SVG referenced without changing source paths.
- Ivory / petrol / copper styling with a persistent dark/light toggle.
- Animated copper signature, layered 3D-like icon presentation with small pointer tilt, accessible mobile navigation, scroll reveals, project overview, about, approach, contact.
- `prefers-reduced-motion` respected, semantic sections, skip link and visible focus.
- Project preview tiles are **conceptual artwork**, not actual product screenshots. Replace with verified screenshots for the final release.

## Implementation note

This is a dependency-free motion/design validation prototype. It is not yet the final Next.js/TypeScript implementation, a physically modeled 3D object, or a production deployment. After visual review the approved interactions can be migrated to the chosen production stack, with a real 3D model if performance testing justifies it.
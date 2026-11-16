export const clamp01 = value => Math.max(0, Math.min(1, value));
export function workflowProgress(y, top, nav, travel) {
  return clamp01((y + nav - top) / Math.max(1, travel));
}
// Time-based easing has the same response at 60/120Hz and never overshoots.
export function followPosition(current, target, milliseconds, tau = 45) {
  if (!Number.isFinite(current) || Math.abs(target - current) < .08) return target;
  return current + (target - current) * -Math.expm1(-Math.min(64, Math.max(0, milliseconds)) / tau);
}
export function layoutChanged(previous, next) {
  return !previous || ['width','height','nav','head','foot'].some(key => Math.abs(previous[key] - next[key]) > 1);
}

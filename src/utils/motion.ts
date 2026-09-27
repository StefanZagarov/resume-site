// Scripted smooth scrolling ignores the CSS reduced-motion rule, so callers ask here first
export function scrollBehavior(): ScrollBehavior {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
}

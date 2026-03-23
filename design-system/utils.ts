/**
 * Convert camelCase token key to CSS custom property name.
 * e.g. "cardForeground" → "--card-foreground"
 */
export function tokenKeyToCssVar(key: string): string {
  const kebab = key.replace(/([A-Z])/g, "-$1").toLowerCase();
  // Handle number prefixes like "chart1" → "chart-1"
  const withNumberDash = kebab.replace(/(\D)(\d)/g, "$1-$2");
  return `--${withNumberDash}`;
}

/**
 * Convert sidebar token key to CSS custom property name.
 * e.g. "primary" → "--sidebar-primary"
 * e.g. "primaryForeground" → "--sidebar-primary-foreground"
 */
export function sidebarKeyToCssVar(key: string): string {
  const kebab = key.replace(/([A-Z])/g, "-$1").toLowerCase();
  return `--sidebar-${kebab}`;
}

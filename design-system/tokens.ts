export interface DesignTokens {
  colors: {
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    popover: string;
    popoverForeground: string;
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    muted: string;
    mutedForeground: string;
    accent: string;
    accentForeground: string;
    destructive: string;
    border: string;
    input: string;
    ring: string;
    chart1: string;
    chart2: string;
    chart3: string;
    chart4: string;
    chart5: string;
    radius: string;
  };
  sidebar: {
    background: string;
    foreground: string;
    primary: string;
    primaryForeground: string;
    accent: string;
    accentForeground: string;
    border: string;
    ring: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    "2xl": string;
    "3xl": string;
  };
  typography: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    "2xl": string;
    "3xl": string;
    "4xl": string;
    "5xl": string;
  };
}

/**
 * MudaFácil Design Tokens
 *
 * Primária: #2563EB (azul confiança)
 * Fundo: #F8FAFC (cinza quase branco)
 * Acento: #F59E0B (amarelo/âmbar — remete a caminhão de mudança)
 */
export const tokens: DesignTokens = {
  colors: {
    background: "oklch(0.985 0.002 247)",       // #F8FAFC
    foreground: "oklch(0.145 0 0)",              // quase preto
    card: "oklch(1 0 0)",                        // branco
    cardForeground: "oklch(0.145 0 0)",
    popover: "oklch(1 0 0)",
    popoverForeground: "oklch(0.145 0 0)",
    primary: "oklch(0.546 0.245 264)",           // #2563EB azul confiança
    primaryForeground: "oklch(0.985 0 0)",       // branco
    secondary: "oklch(0.97 0.002 247)",          // cinza claro
    secondaryForeground: "oklch(0.205 0 0)",
    muted: "oklch(0.97 0.002 247)",
    mutedForeground: "oklch(0.556 0 0)",
    accent: "oklch(0.769 0.188 70.08)",          // #F59E0B amarelo/âmbar
    accentForeground: "oklch(0.205 0 0)",
    destructive: "oklch(0.577 0.245 27.325)",
    border: "oklch(0.922 0.004 247)",
    input: "oklch(0.922 0.004 247)",
    ring: "oklch(0.546 0.245 264)",              // igual ao primary
    chart1: "oklch(0.546 0.245 264)",            // azul
    chart2: "oklch(0.769 0.188 70.08)",          // amarelo
    chart3: "oklch(0.398 0.07 227.334)",         // azul escuro
    chart4: "oklch(0.828 0.189 84.429)",         // amarelo claro
    chart5: "oklch(0.769 0.188 70.08)",          // âmbar
    radius: "0.625rem",
  },
  sidebar: {
    background: "oklch(0.985 0.002 247)",
    foreground: "oklch(0.145 0 0)",
    primary: "oklch(0.546 0.245 264)",
    primaryForeground: "oklch(0.985 0 0)",
    accent: "oklch(0.97 0.002 247)",
    accentForeground: "oklch(0.205 0 0)",
    border: "oklch(0.922 0.004 247)",
    ring: "oklch(0.546 0.245 264)",
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
    "3xl": "4rem",
  },
  typography: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
  },
};

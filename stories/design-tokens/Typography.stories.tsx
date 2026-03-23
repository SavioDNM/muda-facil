import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { tokens } from "../../design-system/tokens";

function TypographyScale() {
  return (
    <div>
      <h2 style={{ fontFamily: "sans-serif", marginBottom: 24 }}>Design Tokens: Typography</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {Object.entries(tokens.typography).map(([key, value]) => (
          <div key={key} style={{ display: "flex", alignItems: "baseline", gap: 24 }}>
            <span style={{ fontFamily: "monospace", fontSize: 13, color: "#6b7280", width: 60 }}>
              {key}
            </span>
            <span style={{ fontFamily: "monospace", fontSize: 11, color: "#9ca3af", width: 80 }}>
              {value}
            </span>
            <span style={{ fontSize: value, fontFamily: "sans-serif" }}>
              MudaFácil — Planejamento de mudanças
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const meta: Meta = {
  title: "Design Tokens/Typography",
  component: TypographyScale,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Scale: Story = {};

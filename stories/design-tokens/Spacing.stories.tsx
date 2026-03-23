import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { tokens } from "../../design-system/tokens";

function SpacingBars() {
  return (
    <div>
      <h2 style={{ fontFamily: "sans-serif", marginBottom: 24 }}>Design Tokens: Spacing</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {Object.entries(tokens.spacing).map(([key, value]) => (
          <div key={key} style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontFamily: "monospace", fontSize: 13, color: "#6b7280", width: 40 }}>
              {key}
            </span>
            <span style={{ fontFamily: "monospace", fontSize: 11, color: "#9ca3af", width: 60 }}>
              {value}
            </span>
            <div
              style={{
                height: 24,
                width: value,
                minWidth: 4,
                backgroundColor: "oklch(0.546 0.245 264)",
                borderRadius: 4,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const meta: Meta = {
  title: "Design Tokens/Spacing",
  component: SpacingBars,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const AllSpacing: Story = {};

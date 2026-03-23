import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { tokens } from "../../design-system/tokens";

function ColorsGrid() {
  return (
    <div>
      <h2 style={{ fontFamily: "sans-serif", marginBottom: 24 }}>Design Tokens: Colors</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
        {Object.entries(tokens.colors).map(([key, value]) => (
          <div key={key} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 8,
                backgroundColor: value,
                border: "1px solid #e5e7eb",
                flexShrink: 0,
              }}
            />
            <div>
              <p style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 600, margin: 0 }}>
                {key}
              </p>
              <p style={{ fontFamily: "monospace", fontSize: 11, color: "#6b7280", margin: 0 }}>
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>
      <h3 style={{ fontFamily: "sans-serif", marginTop: 32, marginBottom: 16 }}>Sidebar Colors</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
        {Object.entries(tokens.sidebar).map(([key, value]) => (
          <div key={key} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 8,
                backgroundColor: value,
                border: "1px solid #e5e7eb",
                flexShrink: 0,
              }}
            />
            <div>
              <p style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 600, margin: 0 }}>
                sidebar.{key}
              </p>
              <p style={{ fontFamily: "monospace", fontSize: 11, color: "#6b7280", margin: 0 }}>
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const meta: Meta = {
  title: "Design Tokens/Colors",
  component: ColorsGrid,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const AllColors: Story = {};

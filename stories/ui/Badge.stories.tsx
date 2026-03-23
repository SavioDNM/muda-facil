import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "../../components/ui/badge";

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "Badge" },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8 }}>
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  ),
};

export const Plans: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8 }}>
      <Badge variant="outline">FREE</Badge>
      <Badge variant="secondary">TRIAL</Badge>
      <Badge>PRO</Badge>
    </div>
  ),
};

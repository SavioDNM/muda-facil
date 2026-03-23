import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PaywallGate } from "../../components/paywall/PaywallGate";

const meta: Meta<typeof PaywallGate> = {
  title: "Components/PaywallGate",
  component: PaywallGate,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Blocked: Story = {
  args: {
    isAllowed: false,
    feature: "itens no canvas",
    limit: 15,
    children: <div>This content is blocked</div>,
  },
};

export const Allowed: Story = {
  args: {
    isAllowed: true,
    children: <div className="p-4 bg-green-50 rounded-lg">This content is visible!</div>,
  },
};

export const GenericBlock: Story = {
  args: {
    isAllowed: false,
    children: <div>Blocked content</div>,
  },
};

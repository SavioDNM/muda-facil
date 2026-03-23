import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TrialBanner } from "../../components/layout/TrialBanner";

const meta: Meta<typeof TrialBanner> = {
  title: "Components/TrialBanner",
  component: TrialBanner,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const FreshTrial: Story = {
  args: { daysLeft: 14 },
};

export const MidTrial: Story = {
  args: { daysLeft: 7 },
};

export const ExpiringSoon: Story = {
  args: { daysLeft: 1 },
};

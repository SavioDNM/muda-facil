import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: "Digite algo..." },
};

export const WithLabel: Story = {
  render: () => (
    <div className="space-y-2 w-80">
      <Label htmlFor="email">E-mail</Label>
      <Input id="email" type="email" placeholder="seu@email.com" />
    </div>
  ),
};

export const Search: Story = {
  render: () => (
    <div className="w-80">
      <Input placeholder="Buscar móvel..." className="pl-9" />
    </div>
  ),
};

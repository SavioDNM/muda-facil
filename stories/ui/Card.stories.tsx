import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here</p>
      </CardContent>
    </Card>
  ),
};

export const Feature: Story = {
  render: () => (
    <Card className="w-80">
      <CardContent className="p-6 space-y-3">
        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <span className="text-primary font-bold">D&D</span>
        </div>
        <h3 className="font-semibold">Canvas de carga interativo</h3>
        <p className="text-sm text-muted-foreground">
          Arraste ícones de móveis para dentro de um container virtual.
        </p>
      </CardContent>
    </Card>
  ),
};

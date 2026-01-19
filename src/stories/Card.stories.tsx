import type { Meta, StoryObj } from '@storybook/react-vite';
import { Cloud } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const meta = {
  title: 'Design System/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The Card component is a versatile container for grouping related content.
It comes with subcomponents for header, title, description, content, and footer.
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'interactive', 'glass'],
      description: 'Visual style of the card',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: 'w-80',
    children: (
      <>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>
            This is a description of the card content.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is the main content area of the card.</p>
        </CardContent>
      </>
    ),
  },
};

export const Interactive: Story = {
  args: {
    variant: 'interactive',
    className: 'w-80 cursor-pointer',
    children: (
      <>
        <CardHeader>
          <CardTitle>Interactive Card</CardTitle>
          <CardDescription>Hover over this card to see the effect.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card has hover animations and shadow effects.</p>
        </CardContent>
      </>
    ),
  },
};

export const Glass: Story = {
  args: {
    variant: 'glass',
    className: 'w-80',
    children: (
      <>
        <CardHeader>
          <CardTitle>Glass Card</CardTitle>
          <CardDescription>This card has a glassmorphism effect.</CardDescription>
        </CardHeader>
      </>
    ),
  },
  globals: {
    backgrounds: {
      value: "dark"
    }
  },
};

export const WithFooter: Story = {
  args: {
    className: 'w-80',
    children: (
      <>
        <CardHeader>
          <CardTitle>Card with Footer</CardTitle>
          <CardDescription>This card includes a footer with actions.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Main content goes here.</p>
        </CardContent>
        <CardFooter className="gap-2">
          <Button variant="outline" size="sm">
            Cancel
          </Button>
          <Button size="sm">Save</Button>
        </CardFooter>
      </>
    ),
  },
};

export const ServiceCard: Story = {
  render: () => (
    <Card variant="interactive" className="w-80 p-8">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange-500/10 text-brand-orange-500">
        <Cloud size={24} />
      </div>
      <CardTitle className="mb-3">Cloud Native</CardTitle>
      <CardDescription>
        Scalable infrastructure built on AWS/Azure/GCP with modern serverless patterns.
      </CardDescription>
    </Card>
  ),
};

export const CardGrid: Story = {
  render: () => (
    <div className="grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
      {['Feature 1', 'Feature 2', 'Feature 3'].map((title) => (
        <Card key={title} variant="interactive" className="p-6">
          <CardTitle className="mb-2">{title}</CardTitle>
          <CardDescription>
            A brief description of this feature and its benefits.
          </CardDescription>
        </Card>
      ))}
    </div>
  ),
};

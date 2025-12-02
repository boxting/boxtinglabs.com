import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '@/components/ui/Badge';

const meta = {
  title: 'Design System/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The Badge component is used for highlighting status, categories, or labels.
It comes in multiple variants to convey different meanings.
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'outline'],
      description: 'Visual style of the badge',
    },
    children: {
      control: 'text',
      description: 'Badge content',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Warning',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

export const WithIcon: Story = {
  args: {
    variant: 'primary',
    children: (
      <>
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-orange-500 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-orange-500" />
        </span>
        Accepting Clients
      </>
    ),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};

export const UseCases: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Status:</span>
        <Badge variant="success">Active</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Category:</span>
        <Badge variant="primary">Mobile App</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Priority:</span>
        <Badge variant="warning">High</Badge>
      </div>
    </div>
  ),
};

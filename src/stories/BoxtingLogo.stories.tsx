import type { Meta, StoryObj } from '@storybook/react';
import { BoxtingLogo } from '@/components/icons/BoxtingLogo';

const meta = {
  title: 'Design System/BoxtingLogo',
  component: BoxtingLogo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The BoxtingLogo component renders the brand logo in different variants.
It can be displayed as a full logo, icon only, or wordmark.
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['full', 'icon', 'wordmark'],
      description: 'Logo display variant',
    },
    colorScheme: {
      control: 'select',
      options: ['brand', 'light', 'dark'],
      description: 'Color scheme for the logo',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BoxtingLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Full: Story = {
  args: {
    variant: 'full',
    colorScheme: 'brand',
  },
};

export const Icon: Story = {
  args: {
    variant: 'icon',
  },
};

export const Wordmark: Story = {
  args: {
    variant: 'wordmark',
    colorScheme: 'light',
  },
};

export const DarkColorScheme: Story = {
  args: {
    variant: 'full',
    colorScheme: 'dark',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-8">
      <div className="text-center">
        <p className="mb-2 text-sm text-gray-500">Full Logo</p>
        <BoxtingLogo variant="full" />
      </div>
      <div className="text-center">
        <p className="mb-2 text-sm text-gray-500">Icon Only</p>
        <BoxtingLogo variant="icon" className="h-16 w-16" />
      </div>
      <div className="text-center">
        <p className="mb-2 text-sm text-gray-500">Wordmark</p>
        <BoxtingLogo variant="wordmark" />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-8">
      <BoxtingLogo variant="icon" className="h-8 w-8" />
      <BoxtingLogo variant="icon" className="h-12 w-12" />
      <BoxtingLogo variant="icon" className="h-16 w-16" />
      <BoxtingLogo variant="icon" className="h-24 w-24" />
    </div>
  ),
};

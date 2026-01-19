import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from '@/components/ui/Input';

const meta = {
  title: 'Design System/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The Input component is used for text input fields.
It supports labels, placeholders, error states, and all standard HTML input types.
        `,
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      description: 'Input type',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'jane@example.com',
    type: 'email',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'jane@example.com',
    error: 'Please enter a valid email address',
    defaultValue: 'invalid-email',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'Cannot edit this field',
    disabled: true,
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
  },
};

// Form Example
export const FormExample: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <Input label="Full Name" placeholder="Jane Doe" />
      <Input label="Email" type="email" placeholder="jane@example.com" />
      <Input label="Phone" type="tel" placeholder="+1 (555) 123-4567" />
    </div>
  ),
};

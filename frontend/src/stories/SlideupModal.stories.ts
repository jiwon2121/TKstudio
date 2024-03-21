import type { Meta, StoryObj } from '@storybook/react'

import SlideupModal from '@/components/SlideupModal'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Slideup Modal',
  component: SlideupModal,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'start',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
      description: '자식 컴포넌트(Required)',
    },
    isClose: {
      control: {
        type: 'boolean',
      },
      description: `닫힘 여부(Required)`,
      table: {
        type: { summary: 'boolean' },
      },
    },
  },
  args: {
    height: '300px',
    isClose: false,
    children: '닫기',
    handleClose: () => {}
  },
} satisfies Meta<typeof SlideupModal>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    isClose: false,
    children: '닫기',
  },
}

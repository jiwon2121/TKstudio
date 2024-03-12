import type { Meta, StoryObj } from '@storybook/react'

import ImageWrapper from '@/components/ImageWrapper'
import sampleImage from '@@/assets/images/sample.png'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'ImageWrapper',
  component: ImageWrapper,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    $width: {
      control: {
        type: 'text',
      },
      description: `너비
      \norigin=true 일 때 default='100vw', 입력 시 변경 가능`,
      table: {
        type: { summary: 'string' },
      },
    },
    $height: {
      control: {
        type: 'text',
      },
      description: `높이
      \norigin=true 일 때 'auto'로 고정`,
      table: {
        type: { summary: 'string' },
      },
    },
    $aspectRatio: {
      control: {
        type: 'text',
      },
      description: `종횡비
      \norigin=true 일 때 default='7/9' (입력 시 변경 가능)`,
      table: {
        type: { summary: 'string' },
      },
    },
    origin: {
      control: {
        type: 'boolean',
      },
      description: '원본 비율',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    src: {
      description: 'image url',
    },
    alt: {
      description: 'alt',
    },
  },
  args: {
    src: sampleImage.src,
    alt: 'sampleImage',
  },
} satisfies Meta<typeof ImageWrapper>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    $width: '300px',
    $height: '300px',
  },
}

export const Origin: Story = {
  args: {
    $width: '300px',
    origin: true,
  },
}

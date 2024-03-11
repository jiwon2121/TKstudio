import type { Meta, StoryObj } from '@storybook/react'

// import { Button } from './Button';
import Button from '../components/Button'
import {
  MainGreen,
  MainOrange,
  MainRed,
  MainYellow,
  White,
  Black,
} from '@@/assets/styles/pallete'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    $backgroundColor: {
      control: {
        type: 'color',
        presetColors: [
          { color: MainGreen, title: 'MainGreen' },
          { color: MainOrange, title: 'MainOrange' },
          { color: MainRed, title: 'MainRed' },
          { color: MainYellow, title: 'MainYellow' },
          { color: White, title: 'White' },
          { color: Black, title: 'Black' },
        ],
      },
      description: '버튼 배경색',
      table: {
        type: { summary: 'string'},
        defaultValue: { summary: 'MainGreen', detail: MainGreen},
      },
    },
    $color: {
      control: {
        type: 'color',
        presetColors: [
          { color: MainGreen, title: 'MainGreen' },
          { color: MainOrange, title: 'MainOrange' },
          { color: MainRed, title: 'MainRed' },
          { color: MainYellow, title: 'MainYellow' },
          { color: White, title: 'White' },
          { color: Black, title: 'Black' },
        ],
      },
      description: '글자색',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'White', detail: White},
      },
    },
  },
  args: {
    children: 'Button',
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: 'Button',
  },
}

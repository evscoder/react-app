import type { Meta, StoryObj } from '@storybook/react';
import {withRouter} from 'storybook-addon-react-router-v6';
import {FC} from 'react';
import UiButton  from './UiButton.tsx';
import '../../../styles.scss';
import {Colors} from '../../../types/types.ts';

interface Props {
    color: Colors;
}

const UiButtonStories: FC<Props> = ({color})  => {
    return (
        <>
            <UiButton color={color && 'primary'}>Primary Button</UiButton>
        </>
    );
};

const meta = {
    title: 'Example/Button',
    component: UiButtonStories,
    decorators: [withRouter],
    tags: ['autodocs'],
    parameters: {
    },
    argTypes: {
    }
} satisfies Meta<typeof UiButtonStories>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ButtonCollection: Story = {
    args: {
        color: 'purple'
    }
};

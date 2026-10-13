import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import UiButton from './shared/ui/Button/UiButton';
import UiLoader from './shared/ui/Loader/UiLoader';

describe('shared UI', () => {
    it('calls the button handler when clicked', () => {
        const onClick = vi.fn();

        render(<UiButton onClick={onClick}>Save title</UiButton>);
        fireEvent.click(screen.getByRole('button', { name: 'Save title' }));

        expect(onClick).toHaveBeenCalledOnce();
    });

    it('prevents clicks on a disabled button', () => {
        const onClick = vi.fn();

        render(<UiButton disabled onClick={onClick}>Save title</UiButton>);
        fireEvent.click(screen.getByRole('button', { name: 'Save title' }));

        expect(screen.getByRole('button')).toBeDisabled();
        expect(onClick).not.toHaveBeenCalled();
    });

    it('renders a navigation link', () => {
        render(
            <MemoryRouter>
                <UiButton link href="/sign-in">Sign in</UiButton>
            </MemoryRouter>
        );

        expect(screen.getByRole('link', { name: 'Sign in' })).toHaveAttribute('href', '/sign-in');
    });

    it('announces the current loading action', () => {
        render(<UiLoader label="Saving title..." />);

        expect(screen.getByRole('status')).toHaveTextContent('Saving title...');
        expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
    });
});

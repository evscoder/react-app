import { describe, expect, it } from 'vitest';
import reducer, {
    closeModal,
    closeSidebar,
    openModal,
    openSidebar,
    setTheme,
    toggleSidebar
} from './slice';

describe('UI state', () => {
    it('starts with a closed sidebar and modal and a light theme', () => {
        expect(reducer(undefined, { type: 'init' })).toEqual({
            isSidebarOpen: false,
            activeModal: null,
            theme: 'light'
        });
    });

    it('opens, closes and toggles the sidebar', () => {
        let state = reducer(undefined, openSidebar());
        expect(state.isSidebarOpen).toBe(true);

        state = reducer(state, closeSidebar());
        expect(state.isSidebarOpen).toBe(false);

        state = reducer(state, toggleSidebar());
        expect(state.isSidebarOpen).toBe(true);

        state = reducer(state, toggleSidebar());
        expect(state.isSidebarOpen).toBe(false);
    });

    it('replaces and closes the active modal', () => {
        let state = reducer(undefined, openModal('settings'));
        expect(state.activeModal).toBe('settings');

        state = reducer(state, openModal('confirmation'));
        expect(state.activeModal).toBe('confirmation');

        expect(reducer(state, closeModal()).activeModal).toBeNull();
    });

    it('changes the theme without changing other UI state', () => {
        const state = reducer(undefined, openSidebar());

        expect(reducer(state, setTheme('dark'))).toEqual({ ...state, theme: 'dark' });
        expect(reducer(reducer(state, setTheme('dark')), setTheme('light')).theme).toBe('light');
    });
});

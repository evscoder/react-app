import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Theme = 'light' | 'dark';

interface UiState {
    isSidebarOpen: boolean;
    activeModal: string | null;
    theme: Theme;
}

const initialState: UiState = {
    isSidebarOpen: false,
    activeModal: null,
    theme: 'light'
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        openSidebar: state => {
            state.isSidebarOpen = true;
        },
        closeSidebar: state => {
            state.isSidebarOpen = false;
        },
        toggleSidebar: state => {
            state.isSidebarOpen = !state.isSidebarOpen;
        },
        openModal: (state, { payload }: PayloadAction<string>) => {
            state.activeModal = payload;
        },
        closeModal: state => {
            state.activeModal = null;
        },
        setTheme: (state, { payload }: PayloadAction<Theme>) => {
            state.theme = payload;
        }
    }
});

export const {
    openSidebar,
    closeSidebar,
    toggleSidebar,
    openModal,
    closeModal,
    setTheme
} = uiSlice.actions;

export default uiSlice.reducer;

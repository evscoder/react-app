import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import isError from '../../../utils/isError.ts';
import { getAuthData } from '../../../modules/api/auth';
import { IAuthState } from '../../../types/auth';

interface Props {
    data: IAuthState
    loading: boolean | null
    error: string
}

const initialState: Props = {
    data: {
        title: ''
    },
    loading: null,
    error: ''
};

const index = createSlice({
    name: 'slice',
    initialState: initialState,
    reducers: {
        sliceAction: (state, { payload }) => {
            state.loading = payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getAuthData.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(getAuthData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.error = action.payload;
                state.loading = false;
            });
    }
});

export const {
    sliceAction
} = index.actions;

export default index.reducer;

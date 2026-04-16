import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { paths } from '../root.ts';
import { IAuthState } from '../../../types/auth';

export const appApi = createApi({
    reducerPath: 'appApi',
    baseQuery: fetchBaseQuery({
        baseUrl: paths.api
    }),
    endpoints: builder => ({
        getAppData: builder.query<IAuthState, void>({
            query: () => 'app'
        })
    })
});

export const {
    useGetAppDataQuery
} = appApi;

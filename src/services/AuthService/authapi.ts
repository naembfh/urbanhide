import { createApi, fetchBaseQuery, BaseQueryFn, FetchBaseQueryError, FetchArgs } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../redux/store';
import { logout, setTokens } from '@/redux/features/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const refreshToken = (api.getState() as RootState).auth.refreshToken;
    if (refreshToken) {
      const refreshResult = await api.dispatch(
        authApi.endpoints.refreshToken.initiate({ refreshToken })
      );

      if (refreshResult.data) {
        // Save new tokens in the state and cookies
        api.dispatch(setTokens({
          accessToken: refreshResult.data.accessToken,
          refreshToken: refreshResult.data.refreshToken,
        }));

        // Retry the original request with the new access token
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setTokens({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          }));
        } catch (error) {
          console.error('Login error:', error);
        }
      },
    }),
    signUp: builder.mutation({
      query: (userData) => ({
        url: 'auth/signup',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
    refreshToken: builder.mutation({
      query: ({ refreshToken }) => ({
        url: 'auth/refresh-token',
        method: 'POST',
        body: { refreshToken },
      }),
    }),
  }),
});

export const { useLoginMutation, useSignUpMutation, useRefreshTokenMutation } = authApi;

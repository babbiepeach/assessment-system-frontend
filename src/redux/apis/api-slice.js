import axios from "axios";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setError, setSuccess } from '../slices/message-slice';
import { setCredentials } from '../slices/auth-slice';
import { backendBaseUrl } from "../base-url";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: backendBaseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.auth?.user?.accessToken
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
      return headers
    }
  },
});

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: rawBaseQuery,
  keepUnusedDataFor: 10,
  refetchOnMountOrArgChange: 5,
  refetchOnReconnect: true,
  tagTypes: [],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ username, authCode }) => ({
        url: '/auth/login',
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          authCode: authCode,
        }),
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { meta, data } = await queryFulfilled;
          const { data: savedData, message, status } = data || {};

          if (status === 200 && !savedData.code) {
            dispatch(setCredentials(savedData))
            dispatch(setSuccess(message));
          }
        } catch (error) {
          dispatch(
            setError(
              error?.message
              || error?.error?.data?.message
              || 'Something went wrong')
          );
        }
      },
    }),
    logout: builder.query({
      query: () => ({
        url: '/auth/logout',
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        },
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { meta, data } = await queryFulfilled;
          const { data: savedData, message, status } = data || {};

          if (status === 200) {
            dispatch(setSuccess(message))
          }
        } catch (error) {
          dispatch(
            setError(
              error?.message
              || error?.error?.data?.message
              || 'Something went wrong')
          );
        }
      },
    }),
  }),
});
export const { useLoginMutation, useLazyLogoutQuery } = apiSlice;
import axios from "axios";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setError, setSuccess } from '../slices/message-slice';
import { setCredentials, setUserDetails } from '../slices/auth-slice';
import { aiBaseUrl, backendBaseUrl } from "../base-url";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: backendBaseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.auth?.accessToken
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
    //authentication
    register: builder.mutation({
      query: ({ fullName, matricOrStaffId, email, password, role }) => ({
        url: '/auth/register',
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          fullName,
          matricOrStaffId,
          email,
          password,
          role
        }),
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { meta, data } = await queryFulfilled;
          const { data: savedData, message, status } = data || {};

          if (status === 201) {
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
    login: builder.mutation({
      query: ({ matricOrStaffId, password }) => ({
        url: '/auth/login',
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          matricOrStaffId,
          password,
        }),
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { meta, data } = await queryFulfilled;
          const { data: savedData, message, status } = data || {};

          if (status === 200 && !savedData.code) {
            dispatch(setCredentials(savedData))
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
    profile: builder.mutation({
      query: () => ({
        url: '/auth/profile',
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { meta, data } = await queryFulfilled;
          const { data: savedData, message, status } = data || {};

          if (status === 200 && !savedData.code) {
            dispatch(setUserDetails(savedData))
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

export const { 
  //authentication
  useRegisterMutation,
  useLoginMutation, 
  useProfileMutation,
} = apiSlice;


export const aiCheckSlice = createApi({
  reducerPath: 'aiCheckSlice',
  baseQuery: async ({ url, method, body, headers }) => {
    const fullUrl = `${aiBaseUrl}${url}`;
    try {
      const response = await axios({
        method,
        url: fullUrl,
        data: body,
        headers,
      });
      return { data: response.data };
    } catch (error) {
      throw { message: error?.response?.data?.message };
    }
  },
  tagTypes: ['aiCheckSlice'],
  endpoints: (builder) => ({}),
});
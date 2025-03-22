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
  tagTypes: ['users', 'class'],
  endpoints: (builder) => ({
    // auth-apis
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
          if (data) {
            dispatch(setSuccess(data?.message));
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
          
          if (data) {
            dispatch(setCredentials(data))
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
          
          if (data) {
            dispatch(setUserDetails(data))
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

    // user-apis for teacher
    getAllUsers: builder.query({
      query: () => ({
        url: '/users',
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        },
      }),
      providesTags: ['users']
    }),
    getUserById: builder.query({
      query: ({ id }) => ({
        url: `/users/${id}`,
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        },
        // params: {
        //   id
        // }
      }),
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/users/${id}`,
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        },
        // body: JSON.stringify({
        //   id
        // }),
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { meta, data } = await queryFulfilled;
          
          if (data) {
            dispatch(setSuccess(data?.message));
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
      invalidatesTag: ['users']
    }),

    // class-apis
    createClass: builder.mutation({ // for teacher
      query: ({ teacherId, className, classDesc }) => ({
        url: `/classes/create`,
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          teacherId,
          name: className,
          description: classDesc,
        }),
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { meta, data } = await queryFulfilled;

          if (data) {
            dispatch(setSuccess(data?.message));
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
      invalidatesTag: ['class']
    }),
    joinClass: builder.mutation({ // for student
      query: ({ studentId, classCode }) => ({
        url: `/classes/create`,
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          studentId,
          classCode,
        }),
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { meta, data } = await queryFulfilled;

          if (data) {
            dispatch(setSuccess(data?.message));
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
      invalidatesTag: ['class']
    }),
    getClassesForStudent: builder.query({
      query: () => ({
        url: '/classes/my-classes',
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        },
      }),
      providesTags: ['classes']
    }),
  }),
});

export const {
  // auth-apis
  useRegisterMutation,
  useLoginMutation,
  useProfileMutation,

  // user-apis for teacher
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useDeleteUserMutation,

  // class-apis
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
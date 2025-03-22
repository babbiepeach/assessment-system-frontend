import axios from "axios";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setError, setSuccess } from '../slices/message-slice';
import { logout, setCredentials, setUserDetails } from '../slices/auth-slice';
import { aiBaseUrl, backendBaseUrl } from "../base-url";
import { resetStorageSlice } from "../slices/storage-slice";

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
  tagTypes: [
    'users',
    'class', 'class-students',
    'notifications',
    'assignments,'
  ],
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
          if (error?.message == 'jwt token expired') {
            dispatch(logout())
            dispatch(resetStorageSlice())
          }

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
          // teacherId,
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
    getAllClasses: builder.query({
      query: () => ({
        url: '/classes/my-classes',
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        },
      }),
      providesTags: ['classes']
    }),
    getStudentsInClass: builder.query({ // for teacher
      query: ({ id }) => ({
        url: `/classes/${id}/students`,
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        },
      }),
      providesTags: ['class-students']
    }),
    deleteClass: builder.mutation({ // for teacher
      query: ({ id }) => ({
        url: `/classes/${id}`,
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
      invalidatesTag: ['class']
    }),
    deactivateClass: builder.mutation({ // for teacher
      query: ({ id }) => ({
        url: `/classes/${id}/deactivate`,
        method: 'POST',
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
      invalidatesTag: ['class']
    }),
    removeStudentFromClass: builder.mutation({ // for teacher
      query: ({ id, studentId }) => ({
        url: `/classes/${id}/remove-student/${studentId}`,
        method: 'POST',
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
      invalidatesTag: ['class']
    }),

    // notification-apis
    getNotifications: builder.query({
      query: () => ({
        url: '/notifications/my-notifications',
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      }),
      providesTags: ['notifications'],
    }),
    createNotification: builder.mutation({
      query: ({ userId, message }) => ({
        url: `/notifications/create`,
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          message,
        })
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
      invalidatesTag: ['notifications'],
    }),
    markNotificationAsRead: builder.mutation({
      query: ({ id }) => ({
        url: `/notifications/${id}/read`,
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
        },
      }),
      invalidatesTag: ['notifications'],
    }),
    sendNotificationToUser: builder.mutation({
      query: ({ userId, message }) => ({
        url: `/notifications/send-to-user/${userId}`,
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          message,
        })
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
      invalidatesTag: ['notifications'],
    }),
    sendNotificationToClass: builder.mutation({
      query: ({ classId, title, message }) => ({
        url: `/notifications/send-to-user/${classId}`,
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          classId,
          title,
          message,
        })
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
      invalidatesTag: ['notifications'],
    }),
    deleteNotifications: builder.mutation({
      query: ({ id }) => ({
        url: `/notifications/${id}`,
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
      invalidatesTag: ['notifications']
    }),

    // assignment-apis
    createAssignment: builder.mutation({
      query: ({
        teacherId, title, description, classId,
        assignmentType, markingGuide, testCases
      }) => ({
        url: `/assignments/create`,
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          teacherId,
          title,
          description,
          classId,
          type: assignmentType,
          markingGuide,
          testCases,
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
      invalidatesTag: ['assignments'],
    }),
    submitAssignment: builder.mutation({
      query: ({ assignmentId, file }) => {
        const formData = new FormData()
        formData.append('assignmentId', assignmentId)
        formData.append('file', file)

        return {
          url: `/assignments/${assignmentId}/submit`,
          method: 'POST',
          headers: {
            'content-type': 'multipart/form-data',
          },
          body: formData,
        }
      },
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
      invalidatesTag: ['assignments'],
    }),
    gradeAssignment: builder.mutation({
      query: ({ submissionId, grade }) => ({
        url: `/assignments/${submissionId}/grade`,
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ grade }),
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
      invalidatesTag: ['assignments'],
    }),
    checkAssignmentPlagiarism: builder.mutation({
      query: ({ submissionId }) => ({
        url: `/assignments/${submissionId}/check-plagiarism`,
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        // body: JSON.stringify({
        //   grade
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
      invalidatesTag: ['assignments'],
    }),
    getAllAssignmentSubmissions: builder.query({
      query: ({ assignmentId }) => ({
        url: `/classes/${assignmentId}/assignments`,
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      }),
      providesTags: ['assignments'],
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
  useCreateClassMutation,
  useJoinClassMutation,
  useGetAllClassesQuery,
  useGetStudentsInClassQuery,
  useDeleteClassMutation,
  useDeactivateClassMutation,
  useRemoveStudentFromClassMutation,

  // notification-apis
  useGetNotificationsQuery,
  useCreateNotificationMutation,
  useMarkNotificationAsReadMutation,
  useSendNotificationToUserMutation,
  useSendNotificationToClassMutation,
  useDeleteNotificationsMutation,

  // assignment-apis
  useCreateAssignmentMutation,
  useSubmitAssignmentMutation,
  useCheckAssignmentPlagiarismMutation,
  useGetAllAssignmentSubmissionsQuery,
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
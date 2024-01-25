import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../models/user.dto";
import { WsMessage } from "../models/error.dto";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/v1" }),
  tagTypes: ["user", "security"],
  endpoints: (builder) => ({
    createUser: builder.mutation<Partial<User> | WsMessage, User>({
      query: (user: User) => ({
        url: "user/create",
        method: "POST",
        body: user,
      }),

      invalidatesTags: ["user"],
    }),
    updateUser: builder.mutation<
      Partial<User> | WsMessage,
      { user: User; id: number }
    >({
      query: ({ user, id }) => ({
        url: `user/update/${id}`,
        method: "PUT",
        body: user,
      }),

      invalidatesTags: ["user"],
    }),
    getUser: builder.query<User[], string>({
      query: () => "user/all",
      providesTags: ["user"],
    }),
    getUserById: builder.query<User, number>({
      query: (id) => `user/by_id/${id}`,
      providesTags: ["user"],
    }),
    getUserRole: builder.query<User, string>({
      query: () => `user/profile`,
      providesTags: ["user", "security"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetUserQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useGetUserRoleQuery,
} = userApi;

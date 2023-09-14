import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../models/user.dto";
import { WsMessage } from "../models/error.dto";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/v1" }),
  tagTypes: ["user"],
  endpoints: (builder) => ({
    createUser: builder.mutation<Partial<User> | WsMessage, User>({
      query: (user: User) => ({
        url: "user",
        method: "POST",
        body: user,
      }),

      invalidatesTags: ["user"],
    }),
    updateUser: builder.mutation<Partial<User> | WsMessage, {user:User, id:number}>({
      query: ({user, id}) => ({
        url: `user/${id}`,
        method: "PUT",
        body: user,
      }),

      invalidatesTags: ["user"],
    }),
    getUser: builder.query<User[], string>({
      query: () => "user",
      providesTags: ["user"],
    }),
    getUserById:builder.query<User, number>({
      query: (id) => `user/${id}`,
      providesTags: ["user"],
    })
  }),
});

export const { useCreateUserMutation, useGetUserQuery , useGetUserByIdQuery, useUpdateUserMutation} = userApi;

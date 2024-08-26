import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../models/user.dto";
import { WsMessage } from "../models/error.dto";
import { BaseResponse } from "./base_response";
import { errorTrasform } from "./error_transformer";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/v1" }),
  tagTypes: ["user", "security"],
  
  endpoints: (builder) => ({
    createUser: builder.mutation< WsMessage, User>({
      query: (user: User) => ({
        url: "user/create",
        method: "POST",
        body: user,
      }),
      transformErrorResponse: errorTrasform,
      invalidatesTags: ["user","security"],
    }),
    updateUser: builder.mutation<
     WsMessage,
      { user: User; id: number }
    >({
      query: ({ user, id }) => ({
        url: `user/update/${id}`,
        method: "PUT",
        body: user,
      }),
      transformErrorResponse: errorTrasform,
      invalidatesTags: ["user"],
    }),
    getUser: builder.query<BaseResponse<User[]>, string>({
      query: () => "user/all",
      transformErrorResponse: errorTrasform,
      providesTags: ["user","security"],
    }),
    getUserById: builder.query<BaseResponse<User>, number>({
      query: (id) => `user/by_id/${id}`,
      transformErrorResponse: errorTrasform,
      providesTags: ["user","security"],
    }),
    getUserRole: builder.query<User, string>({
      query: () => `user/profile`,
      transformErrorResponse: errorTrasform,
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

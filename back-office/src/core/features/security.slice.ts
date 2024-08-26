import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { SignInDto } from "../models/login.dto";
import { User } from "../models/user.dto";
import { WsMessage } from "../models/error.dto";

export const securityApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/v1" }),
  reducerPath: "security",

  tagTypes: ["security", "user",'product'],
  endpoints: (builder) => ({
    login: builder.mutation<{ token: string }, SignInDto>({
      query: (item) => ({
        url: "security/login",
        method: "POST",
        body: item,
      }),
      invalidatesTags: ["security", "user",'product'],
    }),
    definePassword: builder.mutation<{ token: string },{token:string,password:string }>({
      query: (item) => ({
        url: "security/define_password",
        method: "POST",
        body: item,
      }),
      invalidatesTags: ["security", "user", 'product'],
    }),
    resetPasswordByEmail: builder.mutation<WsMessage,{email:string }>({
      query: (item) => ({
        url: "security/forgot_password",
        method: "POST",
        body: item,
      }),
      invalidatesTags: ["security", "user",'product'],
    }),
    signout: builder.mutation<undefined, string>({
      query: () => ({
        url: "security/logout",
        method: "GET",
      }),
      invalidatesTags: ["security",'product'],
    }),
    profile: builder.query<User, string>({
      query: () => "security/profile",
      providesTags: ["security","product"],
    }),
  }),
});

export const { useLoginMutation, useSignoutMutation, useProfileQuery ,useDefinePasswordMutation, useResetPasswordByEmailMutation} =
  securityApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { SignInDto } from "../models/login.dto";
import { User } from "../models/user.dto";

export const securityApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/v1" }),
  reducerPath: "securityApi",

  tagTypes: ["security", "user"],
  endpoints: (builder) => ({
    login: builder.mutation<{ token: string }, SignInDto>({
      query: (item) => ({
        url: "security/login",
        method: "POST",
        body: item,
      }),
      invalidatesTags: ["security", "user"],
    }),
    signout: builder.mutation<undefined, string>({
      query: () => ({
        url: "security/signout",
        method: "GET",
      }),
      invalidatesTags: ["security"],
    }),
    profile: builder.query<User, string>({
      query: () => "security/profile",
      providesTags: ["security"],
    }),
  }),
});

export const { useLoginMutation, useSignoutMutation, useProfileQuery } =
  securityApi;

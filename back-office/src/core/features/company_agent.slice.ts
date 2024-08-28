import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { User } from "../models/user.dto";
import { errorTrasform } from "./error_transformer";

export const companyAgentApi = createApi({
  reducerPath: "companyAgentApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/v1/" }),
  tagTypes: ["companyAgent","security"],
  endpoints: (builder) => ({
    getCompanyUser: builder.query<
      [
        {
          id: number;
          user: User;
          createdAt: string;
          updatedAt: string;
        }
      ],
      string
    >({
      query: () => "company_agent",
      transformErrorResponse: errorTrasform,
      providesTags: ["companyAgent",'security'],
    }),
    switchCompanyUserStatus: builder.mutation<
      { id: number; user: User },
      number
    >({
      query: (id) => ({
        url: `company_agent/${id}`,
        method: "PUT",
        body: {},
      }),
      transformErrorResponse: errorTrasform,
      invalidatesTags: ["companyAgent"],
    }),
  }),
});

export const { useGetCompanyUserQuery, useSwitchCompanyUserStatusMutation } =
  companyAgentApi;

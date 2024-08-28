import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { Customer } from "../models/customer";
import { BaseResponse } from "./base_response";
import { errorTrasform } from "./error_transformer";

export const customerApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/v1" }),
  reducerPath: "customer",
  tagTypes: ["customer",'security'],
  endpoints: (builder) => ({
    updateCustomer: builder.mutation<BaseResponse<Customer>,{ id:string, customer:Customer}>({
      query: ({id, customer}) => ({
        url: `customer/update/${id}`,
        method: "PUT",
        body: customer,
      }),
      transformErrorResponse: errorTrasform,
      invalidatesTags: ["customer"],
    }),
    getCustomer: builder.query<BaseResponse<Customer[]>, string>({
      query: () => "customer/all",
      transformErrorResponse: errorTrasform,
      providesTags: ["customer"],
    }),
    getCustomerById: builder.query<BaseResponse<Customer>, string>({
      query: (id) => `customer/by_id/${id}`,
      transformErrorResponse: errorTrasform,
      providesTags: ["customer"],
    }),
  }),
});

export const { useGetCustomerQuery, useGetCustomerByIdQuery, useUpdateCustomerMutation } = customerApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { Customer } from "../models/customer";
import { BaseResponse } from "./base_response";

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
      invalidatesTags: ["customer"],
    }),
    getCustomer: builder.query<BaseResponse<Customer[]>, string>({
      query: () => "customer/all",
      providesTags: ["customer"],
    }),
    getCustomerById: builder.query<BaseResponse<Customer>, string>({
      query: (id) => `customer/by_id/${id}`,
      providesTags: ["customer"],
    }),
  }),
});

export const { useGetCustomerQuery, useGetCustomerByIdQuery, useUpdateCustomerMutation } = customerApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { Customer } from "../models/customer";

export const customerApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/v1" }),
  reducerPath: "customer",
  tagTypes: ["customer"],
  endpoints: (builder) => ({
    updateCustomer: builder.mutation<Customer,{ id:number, customer:Customer}>({
      query: ({id, customer}) => ({
        url: `customer/${id}`,
        method: "PUT",
        body: customer,
      }),
      invalidatesTags: ["customer"],
    }),
    customer: builder.query<Customer[], string>({
      query: () => "customer",
      providesTags: ["customer"],
    }),
    customerById: builder.query<Customer, number>({
      query: (id) => `customer/${id}`,
      providesTags: ["customer"],
    }),
  }),
});

export const { useCustomerQuery, useCustomerByIdQuery, useUpdateCustomerMutation } = customerApi;

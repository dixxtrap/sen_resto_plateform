import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { PaymentType } from "../models/payment_type";
import { WsMessage } from "../models/error.dto";

export const paymentTypeApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/v1/" }),
  reducerPath: "payment_type",
  tagTypes: ["payment_type"],
  endpoints: (builder) => ({
    getPaymentType: builder.query<PaymentType[], string>({
      query: () => "payment_type/all",
      providesTags: ["payment_type"],
    }),
    getPaymentTypeById: builder.query<PaymentType, number>({
      query: (id) => "payment_type/by_id/" + id,
      providesTags: ["payment_type"],
    }),
    updatePaymentType: builder.mutation<
      PaymentType,
      { paymentType: PaymentType; id: number }
    >({
      query: ({ id, paymentType }) => ({
        url: `payment_type/by_id/${id}`,
        method: "PUT",
        body: paymentType,
      }),
      invalidatesTags: ["payment_type"],
    }),
    createPaymentType: builder.mutation<WsMessage, PaymentType>({
      query: (paymentType) => ({
        url: "payment_type/create",
        method: "POST",
        body: paymentType,
      }),
      invalidatesTags: ["payment_type"],
    }),
  }),
});

export const { useGetPaymentTypeQuery, useCreatePaymentTypeMutation, useGetPaymentTypeByIdQuery,useUpdatePaymentTypeMutation } = paymentTypeApi;

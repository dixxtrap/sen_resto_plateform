import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { PaymentType } from "../models/payment_type";
import { WsMessage } from "../models/error.dto";
import { BaseResponse } from "./base_response";
import { axiosBaseQuery } from "./axios_base_query";
import { errorTrasform } from "./error_transformer";

export const paymentTypeApi = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: "/v1/" }),
  reducerPath: "payment_type",
  tagTypes: ["payment_type", 'security'],
  endpoints: (builder) => ({
    getPaymentType: builder.query<BaseResponse<PaymentType[]>, string>({
      query: () =>({url: "payment_type/all"}),
      providesTags: ["payment_type",'security'],
      transformErrorResponse: errorTrasform,
    }),
    getPaymentTypeById: builder.query<BaseResponse<PaymentType>, string>({
      query: (id) => ({url:"payment_type/by_id/" + id}),
      providesTags: ["payment_type",'security'],
      transformErrorResponse: errorTrasform,
    }),
    updatePaymentType: builder.mutation<
      PaymentType,
      { paymentType: PaymentType; id: string, file:File }
    >({
      query: ({ id, paymentType, file }) => ({
        url: `payment_type/by_id/${id}`,
        method: "PUT",
        data: {...paymentType, file},
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: ["payment_type"],
      transformErrorResponse: errorTrasform,
    }),
    createPaymentType: builder.mutation<WsMessage, PaymentType>({
      query: (paymentType) => ({
        url: "payment_type/create",
        method: "POST",
        data: paymentType,
      }),
      invalidatesTags: ["payment_type"],
      transformErrorResponse: errorTrasform,
    }),
  }),
});

export const { useGetPaymentTypeQuery, useCreatePaymentTypeMutation, useGetPaymentTypeByIdQuery,useUpdatePaymentTypeMutation } = paymentTypeApi;

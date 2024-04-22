import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { Customer, OtpVerificationDto } from "../models/customer";
import { WsMessage } from "../models/error.dto";
import { BaseResponse } from "../models/base_response";

export const securityApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/v1" }),
  reducerPath: "security",
  tagTypes: ["security"],
  endpoints: (builder) => ({
    profile: builder.query<BaseResponse<Customer>, string>({
      query: () => "ws/customer/profile",
      providesTags: ["security"],
    }),
    sendOtp:builder.mutation<WsMessage, string>({
        query:(phone)=>`/ws/send_otp/${phone}`,
        invalidatesTags: ["security"],
    }),
    otpVerification:builder.mutation<WsMessage, OtpVerificationDto>({
        query:(body)=>({url:`/ws/otp_verification`,body:body, method:'POST'}),
        invalidatesTags: ["security"],
    }),
    updateProfile:builder.mutation<WsMessage, Customer>({
        query:(body)=>({url:`/ws/customer/profile`,body:body, method:'PUT'}),
        invalidatesTags: ["security"],
    }),
    login: builder.mutation<WsMessage, { username: string; password: string }>({
      query: (body) => ({
        url: `/ws/customer/login`,
        body: body,
        method: "POST",
      }),
      invalidatesTags: ["security"],
    }),
  }),
});


export const {useLoginMutation, useProfileQuery, useSendOtpMutation, useOtpVerificationMutation, useUpdateProfileMutation}=securityApi;
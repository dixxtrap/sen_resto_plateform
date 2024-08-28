import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { DeliverDto } from "../models/deliver.dto";
import { BaseResponse } from "./base_response";
import { errorTrasform } from "./error_transformer";

export const deliverApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/v1" }),
  reducerPath: "deliver",
  tagTypes: ["deliver",'security'],
  endpoints: (builder) => ({
    create: builder.mutation<DeliverDto,DeliverDto>({
      query: ( deliver) => ({
        url: `deliver/create`,
        method: "POST",
        body: deliver,
      }),
      transformErrorResponse: errorTrasform,
      invalidatesTags: ["deliver",'security'],
    }),
    updateDeliver: builder.mutation<DeliverDto,{ id:number, deliver:DeliverDto}>({
      query: ({id, deliver}) => ({
        url: `deliver/by_id/${id}`,
        method: "PUT",
        body: deliver,
      }),
      transformErrorResponse: errorTrasform,
      invalidatesTags: ["deliver",'security'],
    }),
    get: builder.query<BaseResponse<DeliverDto[]>, string>({
      query: () => "deliver/all",
      transformErrorResponse: errorTrasform,
      providesTags: ["deliver",'security'],
    }),
    deliverById: builder.query<DeliverDto, number>({
      query: (id) => `deliver/${id}`,
      transformErrorResponse: errorTrasform,
      providesTags: ["deliver",'security'],
    }),
  }),
});

export const {  useDeliverByIdQuery, useUpdateDeliverMutation } = deliverApi;

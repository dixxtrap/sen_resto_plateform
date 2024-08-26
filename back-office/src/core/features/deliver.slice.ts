import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { DeliverDto } from "../models/deliver.dto";
import { BaseResponse } from "./base_response";

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
      invalidatesTags: ["deliver",'security'],
    }),
    updateDeliver: builder.mutation<DeliverDto,{ id:number, deliver:DeliverDto}>({
      query: ({id, deliver}) => ({
        url: `deliver/by_id/${id}`,
        method: "PUT",
        body: deliver,
      }),
      invalidatesTags: ["deliver",'security'],
    }),
    get: builder.query<BaseResponse<DeliverDto[]>, string>({
      query: () => "deliver/all",
      providesTags: ["deliver",'security'],
    }),
    deliverById: builder.query<DeliverDto, number>({
      query: (id) => `deliver/${id}`,
      providesTags: ["deliver",'security'],
    }),
  }),
});

export const {  useDeliverByIdQuery, useUpdateDeliverMutation } = deliverApi;

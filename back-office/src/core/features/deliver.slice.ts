import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { DeliverDto } from "../models/deliver.dto";
import { BaseResponse } from "./base_response";
import { errorTrasform } from "./error_transformer";
import { WsMessage } from "../models/error.dto";

export const deliverApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/v1" }),
  reducerPath: "deliver",
  tagTypes: ["deliver",'security'],
  endpoints: (builder) => ({
    create: builder.mutation<WsMessage,DeliverDto>({
      query: ( deliver) => ({
        url: `deliver/create`,
        method: "POST",
        body: deliver,
      }),
      transformErrorResponse: errorTrasform,
      invalidatesTags: ["deliver",'security'],
    }),
    updateDeliver: builder.mutation<WsMessage,{ id:string, body:DeliverDto}>({
      query: ({id, body}) => ({
        url: `deliver/update/${id}`,
        method: "PUT",
        body: body,
      }),
      transformErrorResponse: errorTrasform,
      invalidatesTags: ["deliver",'security'],
    }),
    get: builder.query<BaseResponse<DeliverDto[]>, string>({
      query: () => "deliver/all",
      transformErrorResponse: errorTrasform,
      providesTags: ["deliver",'security'],
    }),
    getById: builder.query<BaseResponse<DeliverDto>, string>({
      query: (id) => `deliver/by_id/${id}`,
      transformErrorResponse: errorTrasform,
      providesTags: ["deliver",'security'],
    }),
  }),
});

export const {   useUpdateDeliverMutation } = deliverApi;

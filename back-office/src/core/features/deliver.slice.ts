import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { DeliverDto } from "../models/deliver.dto";

export const deliverApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/v1" }),
  reducerPath: "deliver",
  tagTypes: ["deliver"],
  endpoints: (builder) => ({
    updateDeliver: builder.mutation<DeliverDto,{ id:number, deliver:deliver}>({
      query: ({id, deliver}) => ({
        url: `deliver/by_id/${id}`,
        method: "PUT",
        body: deliver,
      }),
      invalidatesTags: ["deliver"],
    }),
    deliver: builder.query<DeliverDto[], string>({
      query: () => "deliver/all",
      providesTags: ["deliver"],
    }),
    deliverById: builder.query<DeliverDto, number>({
      query: (id) => `deliver/${id}`,
      providesTags: ["deliver"],
    }),
  }),
});

export const { useDeliverQuery, useDeliverByIdQuery, useUpdateDeliverMutation } = deliverApi;
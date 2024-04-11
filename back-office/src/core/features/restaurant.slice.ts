import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { CompanyDto } from "../models/company.dto";
import { WsMessage } from "../models/error.dto";
import { BaseResponse } from "./base_response";
import { axiosBaseQuery } from "./axios_base_query";

export const restaurantApi = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: "/v1" }),
  reducerPath: "restaurant",
  tagTypes: ["restaurant","security"],
  endpoints: (builder) => ({
    getResttaurant: builder.query<BaseResponse<CompanyDto[]>, string>({
      query: () => ({url:"/restaurant/all"}),
      providesTags: ["restaurant","security"],
    }),
    createRestaurant: builder.mutation<BaseResponse<CompanyDto>, CompanyDto>({
      query: (restaurant) => ({
        url: "/restaurant/create",
        method: "POST",
        body: restaurant,
      }),
      invalidatesTags: ["restaurant"],
    }),
    updateRestaurantById: builder.mutation<
    BaseResponse<CompanyDto> | WsMessage,
      { id: number; restos: CompanyDto }
    >({
      query: ({ id, restos }) => ({
        url: `/restaurant/update/${id}`,
        method: "PUT",
        body: restos,
      }),
      invalidatesTags: ["restaurant"],
    }),
    getRestaurantById: builder.query<BaseResponse<CompanyDto>, number>({
      query: (id) => ({url:`restaurant/byId/${id}`}),
      providesTags: ["restaurant","security"],
    }),
  }),
});

export const {
  useCreateRestaurantMutation,
  useGetResttaurantQuery,
  useGetRestaurantByIdQuery,
  useUpdateRestaurantByIdMutation,

} = restaurantApi;

import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { CompanyDto } from "../models/company.dto";
import { WsMessage } from "../models/error.dto";
import { BaseResponse } from "./base_response";
import { axiosBaseQuery } from "./axios_base_query";

export const restaurantApi = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: "/v1" }),
  reducerPath: "restaurant",
  tagTypes: ["restaurant", "security"],
  endpoints: (builder) => ({
    getResttaurant: builder.query<BaseResponse<CompanyDto[]>, string>({
      query: () => ({ url: "/restaurant/all" }),
      providesTags: ["restaurant", "security"],
    }),
    createRestaurant: builder.mutation<BaseResponse<CompanyDto>, {restos: CompanyDto; background?: File; file?: File}>({
      query: ({restos,background }) => ({
        url: "/restaurant/create",
        method: "POST",
        data: {...restos, background},
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: ["restaurant"],
    }),
    updateRestaurantById: builder.mutation<
      WsMessage,
      { id: number; restos: CompanyDto; background?: File; file?: File }
    >({
      query: ({ id, restos, background, file }) => ({
        url: `/restaurant/update/${id}`,
        method: "PUT",
        data: { ...restos, background, file: file },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),

      invalidatesTags: ["restaurant"],
    }),
    getRestaurantById: builder.query<BaseResponse<CompanyDto>, number>({
      query: (id) => ({ url: `/restaurant/byId/${id}` }),
      providesTags: ["restaurant", "security"],
    }),
  }),
});

export const {
  useCreateRestaurantMutation,
  useGetResttaurantQuery,
  useGetRestaurantByIdQuery,
  useUpdateRestaurantByIdMutation,
} = restaurantApi;

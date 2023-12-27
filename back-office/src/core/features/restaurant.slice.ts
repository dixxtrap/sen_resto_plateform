import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { CompanyDto } from "../models/company.dto";
import { WsMessage } from "../models/error.dto";

export const restaurantApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/v1" }),
  reducerPath: "restaurant",
  tagTypes: ["restaurant"],
  endpoints: (builder) => ({
    getResttaurant: builder.query<CompanyDto[], string>({
      query: () => `restaurant`,
      providesTags: ["restaurant"],
    }),
    createRestaurant: builder.mutation<CompanyDto, CompanyDto>({
      query: (restaurant) => ({
        url: "restaurant",
        method: "POST",
        body: restaurant,
      }),
      invalidatesTags: ["restaurant"],
    }),
    updateRestaurantById: builder.mutation<
      CompanyDto | WsMessage,
      { id: number; restos: CompanyDto }
    >({
      query: ({ id, restos }) => ({
        url: `restaurant/${id}`,
        method: "PUT",
        body: restos,
      }),
      invalidatesTags: ["restaurant"],
    }),
    getRestaurantById: builder.query<CompanyDto, number>({
      query: (id) => `restaurant/${id}`,
      providesTags: ["restaurant"],
    }),
  }),
});

export const {
  useCreateRestaurantMutation,
  useGetResttaurantQuery,
  useGetRestaurantByIdQuery,
  useUpdateRestaurantByIdMutation,

} = restaurantApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { RestaurantDto } from "../models/restaurant.dto";
import { WsMessage } from "../models/error.dto";

export const restaurantApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/v1/" }),
  reducerPath: "restaurant",
  tagTypes: ["restaurant", "company"],
  endpoints: (builder) => ({
    getResttaurant: builder.query<RestaurantDto[], any>({
      query: () => `restaurant`,
      providesTags: ["restaurant", "company"],
    }),
    createRestaurant: builder.mutation<RestaurantDto, WsMessage>({
      query: (restaurant) => ({
        url: "restaurant",
        method: "POST",
        body: restaurant,
      }),
      invalidatesTags: ["restaurant"],
    }),
    updateRestaurantById: builder.mutation<
      RestaurantDto | WsMessage,
      { id: number; restos: RestaurantDto }
    >({
      query: ({ id, restos }) => ({
        url: `restaurant/${id}`,
        method: "PUT",
        body: restos,
      }),
      invalidatesTags: ["restaurant"],
    }),
    getRestaurantById: builder.query<RestaurantDto , number>({
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

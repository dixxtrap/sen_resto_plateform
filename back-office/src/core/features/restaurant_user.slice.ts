import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { User } from "../models/user.dto";

export const restaurantUserApi=createApi({
        reducerPath: "restaurantAgentApi",
        baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/v1/" }),
        tagTypes: ["restaurantAgent"],
        endpoints: (builder) => ({
          getRestaurantUser: builder.query<
            [
              {
                id: number;
                user: User;
                createdAt: string;
                updatedAt: string;
                [x: string]: any;
              }
            ],
            any
          >({
            query: () => "restaurant_agent",
            providesTags: ["restaurantAgent"],
          }),
          switchRestaurantUserStatus: builder.mutation<
            { id: number; user: User },
           number 
          >({
            query: ( id ) => ({
              url: `restaurant_agent/${id}`,
              method: "PUT",
              body: {},
            }),
            invalidatesTags: ["restaurantAgent"],
          }),
        }),
      });

      export const {useGetRestaurantUserQuery, useSwitchRestaurantUserStatusMutation}=restaurantUserApi
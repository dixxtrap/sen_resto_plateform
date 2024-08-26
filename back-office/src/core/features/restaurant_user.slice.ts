import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { User } from "../models/user.dto";
import { axiosBaseQuery } from "./axios_base_query";

export const restaurantUserApi=createApi({
        reducerPath: "restaurantAgentApi",
        baseQuery: axiosBaseQuery({ baseUrl: "http://localhost:3001/v1/" }),
        tagTypes: ["restaurantAgent","security"],
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
            query: () =>({url: "restaurant_agent"}),
            providesTags: ["restaurantAgent","security"],
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
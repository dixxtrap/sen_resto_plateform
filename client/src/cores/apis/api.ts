import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Plate } from "../models/plate";
import { IPagination, IPaginationResult } from "../models/pagination.model";
import { Tag } from "../models/tag.dto";
import { CompanyDto } from "../models/company.dto";
import { RestaurantDto } from "../models/restaurant.dto";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/v1" }),
  reducerPath: "api",
  endpoints: (builder) => ({
    getPlates: builder.query<IPaginationResult<Plate>, IPagination>({
      query: (filter) =>
        `web/plate?page=${filter.page}&pageSize=${filter.pageSize}&search=${filter.search}&fromDate=${filter.fromDate}' `,
    }),
    getCompany: builder.query<[CompanyDto], string>({
      query: () =>
        `company`,
    }),
    getCompanyAndParticularRestaurant: builder.query<[CompanyDto], string>({
      query: () =>
        `company/companyAndparticularRestaurant`,
    }),
    getRestaurant: builder.query<[RestaurantDto], string>({
      query: () =>
        `restaurant/particulier`,
    }),
    getTags: builder.query<[Tag], string>({
        query: () =>
          `tag`,
      }),
  }),
});
export const { useGetPlatesQuery, useGetTagsQuery, useGetCompanyQuery, useGetRestaurantQuery , useGetCompanyAndParticularRestaurantQuery} = api;

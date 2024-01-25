import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Plate, ProductDto } from "../models/product";
import { IPagination, IPaginationResult } from "../models/pagination.model";
import { CompanyDto } from "../models/company.dto";


export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/v1" }),
  reducerPath: "api",
  endpoints: (builder) => ({
    getProduct: builder.query<ProductDto[],IPagination>({
      query: (filter) =>
        `ws/product/all?page=${filter.page}&pageSize=${filter.pageSize}&search=${filter.search}&fromDate=${filter.fromDate}' `,
    }),
    getCompany: builder.query<[CompanyDto], string>({
      query: () =>
        `ws/company/all`,
    }),
   
  }),
});
export const { useGetCompanyQuery, useGetProductQuery} = api;

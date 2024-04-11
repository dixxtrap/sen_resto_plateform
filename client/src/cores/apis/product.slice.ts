
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {  ProductDto } from "../models/product";
import { IPagination } from "../models/pagination.model";
import { CompanyDto } from "../models/company.dto";
import { BaseResponse } from "../models/base_response";

export const productApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "/v1" }),
    reducerPath: "productApi",
    endpoints: (builder) => ({
      getProduct: builder.query<BaseResponse<ProductDto[]>,IPagination>({
        query: (filter) =>
          `ws/product/all?page=${filter.page}&pageSize=${filter.pageSize}&search=${filter.search}&fromDate=${filter.fromDate}'`,
      }),
    getProductDistcounted: builder.query<BaseResponse<ProductDto[]>,IPagination>({
        query: (filter) =>
          `ws/product/discounted?page=${filter.page}&pageSize=${filter.pageSize}&search=${filter.search}&fromDate=${filter.fromDate}'`,
      }),
    }),
  });
  export const { useGetProductQuery, useGetProductDistcountedQuery} = productApi;
  
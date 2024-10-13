import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ProductDto } from "../models/product";
import { errorTrasform } from "./error_transformer";
import { WsMessage } from "../models/error.dto";
import { ProductManagementDto } from "../models/product_management";
import {
  DayDto,
  ProductManagementDayDto,
} from "../models/product_management_day";
import { BaseResponse } from "./base_response";
import { axiosBaseQuery } from "./axios_base_query";

export const productApi = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: "/v1" }),
  reducerPath: "product",
  tagTypes: ["product", "security"],
  endpoints: (builder) => ({
    getProduct: builder.query<BaseResponse<ProductDto[]>, string>({
      query: () => ({ url: "product/all" }),
      providesTags: ["product", "security"],
    }),

    getRestaurantProduct: builder.query<
      BaseResponse<ProductManagementDto[]>,
      string
    >({
      query: () => ({ url: `/product/protect/product_management` }),
      providesTags: ["product", "security"],
    }),
    getRestaurantProductById: builder.query<
      BaseResponse<ProductManagementDto[]>,
      number
    >({
      query: (id) => ({
        url: `/product/protect/by_id/available/product_management/${id}`,
      }),
      providesTags: ["product", "security"],
    }),
    updateProductManagementDay: builder.mutation<
      WsMessage,
      ProductManagementDayDto[]
    >({
      query: (body) => ({
        url: `/product/protect/product_management_day`,
        method: "PUT",
        data: body,
      }),
      invalidatesTags: ["product"],
    }),
    getRestaurantUserProduct: builder.query<BaseResponse<ProductDto[]>, string>(
      {
        query: () => ({ url: `/product/restaurant/user` }),
        providesTags: ["product", "security"],
      }
    ),
    getProductById: builder.query<BaseResponse<ProductDto>, number>({
      query: (id) => ({ url: "/product/by_id/" + id }),
      providesTags: ["product", "security"],
    }),
    getDay: builder.query<DayDto[], null>({
      query: () => ({ url: "/product/weekday" }),
      providesTags: ["product", "security"],
    }),
    getProductManagementById: builder.query<
      BaseResponse<ProductManagementDto>,
      number
    >({
      query: (id) => ({
        url: "/product/protect/by_id/product_management/" + id,
      }),
      providesTags: ["product", "security"],
    }),
    addProductManagementById: builder.mutation<
      WsMessage,
      { id: number; body: ProductDto[] }
    >({
      query: ({ id, body }) => ({
        url: "/product/protect/by_id/add_multiple_product_management/" + id,
        data: body,
        method: "POST",
      }),
      invalidatesTags: ["product"],
    }),
    getRefetch: builder.mutation<WsMessage, string>({
      query: () => ({
        url: `/product/refetch`,
        method: "GET",
      }),
      invalidatesTags: ["product"],
    }),
    updateProduct: builder.mutation<
      WsMessage,
      { product: ProductDto; id: number }
    >({
      query: ({ id, product }) => ({
        url: `/product/update/by_id/${id}`,
        method: "PUT",
        data: product,
      }),
      invalidatesTags: ["product"],
    }),

    createProduct: builder.mutation<
      WsMessage,
      { product: ProductDto; file: File }
    >({
      query: ({ product, file }) => ({
        url: "/product/create",
        method: "POST",
        data: { ...product, file },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: ["product"],
      transformErrorResponse: errorTrasform,
    }),
  }),
});
export const {
  useGetProductQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useGetRestaurantProductQuery,

  useGetRestaurantUserProductQuery,
  useGetProductManagementByIdQuery,

  useGetDayQuery,
  useGetRefetchMutation,
  useUpdateProductManagementDayMutation,
  useGetRestaurantProductByIdQuery,
  useAddProductManagementByIdMutation,
} = productApi;

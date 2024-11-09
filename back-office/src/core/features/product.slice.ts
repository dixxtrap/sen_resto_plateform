import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { ProductDto } from "../models/product";
import { errorTrasform } from "./error_transformer";
import { WsMessage } from "../models/error.dto";
import { ProductManagementDto } from "../models/product_management";

import { BaseResponse } from "./base_response";
import { axiosBaseQuery } from "./axios_base_query";

export const productApi = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: "/v1" }),
  reducerPath: "product",
  tagTypes: ["product", "security"],
  endpoints: (builder) => ({
    getProduct: builder.query<BaseResponse<ProductDto[]>, string>({
      query: () => ({ url: "/product/all" }),
      providesTags: ["product", "security"],
    }),
    getManagementByShop: builder.query<
      BaseResponse<ProductManagementDto[]>,
      string
    >({
      query: (id) => ({
        url: `/product/management_by_shop/${id}`,
        method: "GET",
      }),
      providesTags: ["product", "security"],
    }),
    updateManagmentByShop: builder.mutation<
      WsMessage,
      { id: string; body: { productIds: Array<number> } }
    >({
      query: ({ id, body }) => ({
        url: `/product/management_by_shop/${id}`,
        method: "PUT",
        data: body,
      }),
      invalidatesTags: ["product"],
    }),
    updateManagmentById: builder.mutation<
      WsMessage,
      { id: string; body: { isActive: boolean } }
    >({
      query: ({ id, body }) => ({
        url: `/product/management_by_id/${id}`,
        method: "PUT",
        data: body,
      }),
      invalidatesTags: ["product"],
    }),
    getProductById: builder.query<BaseResponse<ProductDto>, number>({
      query: (id) => ({ url: "/product/by_id/" + id }),
      providesTags: ["product", "security"],
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

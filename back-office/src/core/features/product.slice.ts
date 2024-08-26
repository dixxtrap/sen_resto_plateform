import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ProductDto } from "../models/product";
import { errorTrasform } from "./error_transformer";
import { WsMessage } from "../models/error.dto";
import { ProductManagementDto } from "../models/product_management";
import { DayDto, ProductManagementDayDto } from "../models/product_management_day";
import { BaseResponse } from "./base_response";

export const productApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/v1" }),
  reducerPath: "product",
  tagTypes: ["product","security"],
  endpoints: (builder) => ({
    getProduct: builder.query<BaseResponse<ProductDto[]>, string>({
      query: () => "product/all",
      providesTags:["product","security"],
    }),
   
    getRestaurantProduct: builder.query<BaseResponse<ProductManagementDto[]>, string>({
      query: () =>`product/protect/product_management`,
      providesTags: ["product","security"],
    }),
    getRestaurantProductById: builder.query<BaseResponse<ProductManagementDto[]>, number>({
      query: (id) =>`/product/protect/by_id/available/product_management/${id}`,
      providesTags: ["product","security"],
    }),
    updateProductManagementDay: builder.mutation< WsMessage, ProductManagementDayDto[]>({
      query: (body) =>({
        url:`product/protect/product_management_day`,
        method:"PUT",
body:body
      }),
      invalidatesTags: ["product"],
    }),
    getRestaurantUserProduct: builder.query<BaseResponse<ProductDto[]>, string>({
      query: () =>`product/restaurant/user`,
      providesTags: ["product","security"],
    }),
    getProductById: builder.query<BaseResponse<ProductDto>, number>({
      query: (id) => "product/by_id/" + id,
      providesTags:["product","security"],
    }),
    getDay: builder.query<DayDto[], null>({
      query: () => "product/weekday",
      providesTags: ["product","security"],
    }),
    getProductManagementById: builder.query<BaseResponse<ProductManagementDto>, number>({
      query: (id) => "product/protect/by_id/product_management/" + id,
      providesTags: ["product","security"],
    }),
    addProductManagementById: builder.mutation<WsMessage, {id:number, body:ProductDto[]}>({
      query: ({id, body}) => ({
        url:"product/protect/by_id/add_multiple_product_management/" + id,
        body:body,
        method:"POST"
        
      }),
    invalidatesTags:["product"]
    }),
    getRefetch: builder.mutation<WsMessage, string>({
      query: () => ({
        url: `product/refetch`,
        method: "GET",
      }),
      invalidatesTags: ["product"],
    }),
    updateProduct: builder.mutation<WsMessage, { product: ProductDto; id: number }>({
      query: ({ id, product }) => ({
        url: `product/update/by_id/${id}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ["product"],
    }),
   
   
    createProduct: builder.mutation<WsMessage, ProductDto >({
      query: (product) => ({
        url: "product/create",
        method: "POST",
        body: product,
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
  useUpdateProductManagementDayMutation
  ,useGetRestaurantProductByIdQuery
  , useAddProductManagementByIdMutation
} = productApi;

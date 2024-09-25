import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { BaseResponse } from "./base_response";
import { BannerDto } from "../models/banner.dto";
import { axiosBaseQuery } from "./axios_base_query";
import { WsMessage } from "../models/error.dto";
import { errorTrasform } from "./error_transformer";
import { EstablishmentTypeDto } from "../models/establishment_type.dto";

export const establishmentTypeApi = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: "/v1" }),
  reducerPath: "establishment_type",
  tagTypes: ["establishment_type", "security"],
  endpoints: (builder) => ({
    create: builder.mutation<WsMessage, { file: File; body: BannerDto }>({
      query: ({ file, body }) => ({
        url: "/establishment_type/create",
        data: { file: file, ...body },
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),

      invalidatesTags: ["establishment_type"],
    }),
   
    update: builder.mutation<
      WsMessage,
      { file: File; body: EstablishmentTypeDto; id: string }
    >({
      query: ({ file, body, id }) => ({
        url: `/establishment_type/update/${id}`,
        data: { file: file, ...body },
        method: "PUT",
        headers:file? {
          "Content-Type": "multipart/form-data",
        }:{},
      }),

      invalidatesTags: ["establishment_type"],
    }),
    getAll: builder.query<BaseResponse<EstablishmentTypeDto[]>, string>({
      query: () => ({
        url: "/establishment_type/all",
      }),
      transformErrorResponse: errorTrasform,
      providesTags: ["establishment_type", "security"],
    }),
   
  }),
});
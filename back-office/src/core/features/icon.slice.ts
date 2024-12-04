import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { BaseResponse } from "./base_response";
import { axiosBaseQuery } from "./axios_base_query";
import { WsMessage } from "../models/error.dto";
import { errorTrasform } from "./error_transformer";
import { IconDto } from "../models/icon.dto";

export const iconApi = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: "/v1" }),
  reducerPath: "icon",
  tagTypes: ["icon", "security"],
  endpoints: (builder) => ({
    create: builder.mutation<WsMessage, { file: File; body: IconDto }>({
      query: ({ file, body }) => ({
        url: "/icon/create",
        data: { file: file, ...body },
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),

      invalidatesTags: ["icon"],
    }),

    update: builder.mutation<
      WsMessage,
      { file: File; body: IconDto; id: number }
    >({
      query: ({ file, body, id }) => ({
        url: `/icon/update/${id}`,
        data: { file: file, ...body },
        method: "PUT",
        headers: file ? {
          "Content-Type": "multipart/form-data",
        } : {},
      }),

      invalidatesTags: ["icon"],
    }),
    getAll: builder.query<BaseResponse<IconDto[]>, string>({
      query: () => ({
        url: "/icon/all",
      }),
      transformErrorResponse: errorTrasform,
      providesTags: ["icon", "security"],
    }),

  }),
});
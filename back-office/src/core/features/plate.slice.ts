import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { Plate } from "../models/plate";
import { errorTrasform } from "./error_transformer";
import { WsMessage } from "../models/error.dto";

export const plateApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/v1" }),
  reducerPath: "plate",
  tagTypes: ["plate"],
  endpoints: (builder) => ({
    getPlate: builder.query<Plate[], string>({
      query: () => "plate",
      providesTags: ["plate"],
    }),
    getPlateById: builder.query<Plate, number>({
      query: (id) => "plate/" + id,
      providesTags: ["plate"],
    }),
    updatePlate: builder.mutation<Plate, { plate: Plate; id: number }>({
      query: ({ id, plate }) => ({
        url: `plate/${id}`,
        method: "PUT",
        body: plate,
      }),
      invalidatesTags: ["plate"],
    }),
    createPlate: builder.mutation<WsMessage, Plate >({
      query: (plate) => ({
        url: "plate",
        method: "POST",
        body: plate,
      }),
      invalidatesTags: ["plate"],
      transformErrorResponse: errorTrasform,
    }),
  }),
});
export const {
  useGetPlateQuery,
  useGetPlateByIdQuery,
  useCreatePlateMutation,
  useUpdatePlateMutation,
} = plateApi;

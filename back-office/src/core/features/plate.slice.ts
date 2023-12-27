import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { Plate } from "../models/plate";
import { errorTrasform } from "./error_transformer";
import { WsMessage } from "../models/error.dto";
import { PlateManagement } from "../models/plate_management";

export const plateApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/v1" }),
  reducerPath: "plate",
  tagTypes: ["plate"],
  endpoints: (builder) => ({
    getPlate: builder.query<Plate[], string>({
      query: () => "plate",
      providesTags: ["plate"],
    }),
    getRestaurantPlate: builder.query<PlateManagement[], string>({
      query: (id) =>`plate/validPlateForRestaurant/${id}`,
      providesTags: ["plate"],
    }),
    getRestaurantUserPlate: builder.query<Plate[], string>({
      query: () =>`plate/restaurant/user`,
      providesTags: ["plate"],
    }),
    getPlateById: builder.query<Plate, number>({
      query: (id) => "plate/" + id,
      providesTags: ["plate"],
    }),
    getPlateManagementById: builder.query<PlateManagement, number>({
      query: (id) => "plate/management/" + id,
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
    updatePlateManagement: builder.mutation<WsMessage, PlateManagement>({
      query: (body) => ({
        url: `plate/management/${body.plateId}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["plate"],
    }),
    addPlateToRestaurant:builder.mutation<PlateManagement, {companyId:number, plateId:number}>({
      query:(body)=>({
        url: "plate/addPlateToRestaurant",
        body:body,
        method:"POST",

      }),
      invalidatesTags: ["plate"],  
      // transformErrorResponse: errorTrasform,
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
  useGetRestaurantPlateQuery,
  useAddPlateToRestaurantMutation,
  useGetRestaurantUserPlateQuery,
  useGetPlateManagementByIdQuery,
  useUpdatePlateManagementMutation
} = plateApi;

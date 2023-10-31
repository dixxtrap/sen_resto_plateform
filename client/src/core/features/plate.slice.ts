


import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { Plate } from "../models/plate.model";

export const plateApi = createApi({
    baseQuery: fetchBaseQuery({baseUrl:"/v1"}),
    reducerPath: "plate",
    tagTypes: ["plate"],
    endpoints : (builder) => ({
        getPlate : builder.query<Plate[], string>({
            query: () => "plate",
            providesTags: ["plate"]
        })
    })
});

export const {
    useGetPlateQuery,
  } = plateApi;
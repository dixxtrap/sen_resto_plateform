import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { CompanyDto } from "../models/company.dto";
import { WsMessage } from "../models/error.dto";

export const coorporateApi = createApi({
  reducerPath: "coorporateApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/v1" }),
  tagTypes: ["coorporate"],

  endpoints: (builder) => ({
    createCoorporate: builder.mutation<CompanyDto| WsMessage, CompanyDto>({
      query: (coorporate: CompanyDto) => ({
        url: "/coorporate/create",
        method: "POST",
        body: coorporate,
      }),
      invalidatesTags: ["coorporate"],
    }),
    getCoorporate:builder.query<CompanyDto[],string>({
        query:()=>"/coorporate/all",
        providesTags:["coorporate"]
}),

getCoorporateById: builder.query<Partial<CompanyDto> ,string>({
        query: (id)=>`/coorporate_restaurant/byId/${id}`,
        providesTags:["coorporate"]
}),
updateCoorporateById: builder.mutation<CompanyDto, { id: number, coorporate: CompanyDto }>({
        query: ({id,coorporate}) => ({
          url: `/coorporate_restaurant/update/${id}`,
          method: "PUT",
          body: coorporate,
        }),
        invalidatesTags: ["coorporate"],
      }),
  }),
});


export const {useCreateCoorporateMutation, useGetCoorporateQuery, useGetCoorporateByIdQuery, useUpdateCoorporateByIdMutation}=coorporateApi
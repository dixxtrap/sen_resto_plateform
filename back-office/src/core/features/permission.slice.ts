import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { PermissionDto } from "../models/role.dto";

export const permissionAPi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/v1" }),
  reducerPath: "permissionApi",
  tagTypes: ["permissionApi"],
  endpoints: (builder) => ({
    getPermission: builder.query<PermissionDto[], string>({
      query: () => "permission",
    }),
  }),
});

export const { useGetPermissionQuery } = permissionAPi;

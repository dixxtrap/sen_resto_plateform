import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { WsMessage } from "../models/error.dto";
import { RoleDto } from "../models/role.dto";

export const roleApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/v1" }),
  tagTypes: ["role","security"],
  reducerPath: "roleApi",
  endpoints: (builder) => ({
    getRoles: builder.query<RoleDto, string>({
      query: () => `/role/all`,
      providesTags: ["role","security"],
    }),
     createRole: builder.mutation<
      WsMessage,
   RoleDto
    >({
      query: (body) => ({
        url: `/role/create`,
        method: "Post",
        body: body,
      }),
      invalidatesTags: ["role","security"],
    }),
    updateRole: builder.mutation<WsMessage, {id:number,body:{permissions:string[]}}>({
      query: ({id,body}) => ({url:`role/update/${id}`, body, method:"PUT"}),
      invalidatesTags: ["role","security"], 
    }),
    getRolePermissionAndUser: builder.query<RoleDto, number>({
      query: (id) => `role/permission/${id}`,
      providesTags: ["role","security"], 
    }),
    getRoleById: builder.query<RoleDto, number>({
      query: (id) => `role/permission_user/${id}`,
      providesTags: ["role","security"],
    }),
    getRolePermissionById: builder.query<RoleDto, number>({
      query: (id) => `role/by_id/permsission/${id}`,
      providesTags: ["role"],
    }),
  }),
});

export const {
  useGetRolesQuery,
  useGetRolePermissionAndUserQuery,
  useGetRoleByIdQuery,
useGetRolePermissionByIdQuery,
  useCreateRoleMutation,
useUpdateRoleMutation
} = roleApi;

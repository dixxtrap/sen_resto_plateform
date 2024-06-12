import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { BaseQueryFn, createApi, EndpointDefinitions, FetchArgs, fetchBaseQuery, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/dist/query/react";

export const orderApi=createApi({
    baseQuery: fetchBaseQuery({ baseUrl: '/v1' }),
    endpoints: function (build: EndpointBuilder<BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, never, "api">): EndpointDefinitions {
     getOrders:build.query()
    }
})
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/v1" }),
        reducerPath: "api",
        endpoints: (builder) => ({
                getPlats: builder.query<>({
                  query:()=>'plates'
          })
  })
});

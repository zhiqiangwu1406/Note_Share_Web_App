import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.PROD
      ? import.meta.env.SERVER_API
      : import.meta.env.VITE_LOCAL_API_URL,
  }),
  endpoints: () => ({}),
});

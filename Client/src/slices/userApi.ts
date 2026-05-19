import type { profileType } from "../Pages/Profile";
import { apiSlice } from "./api";

export interface loginInput {
  email: string;
  password: string;
}

export interface registerInput extends loginInput {
  username: string;
}

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (data: loginInput) => ({
        url: "/login",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    register: build.mutation({
      query: (data: registerInput) => ({
        url: "register",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    logout: build.mutation({
      query: () => ({
        url: "logout",
        method: "DELETE",
        credentials: "include",
      }),
    }),
    profile: build.mutation({
      query: (data: profileType) => ({
        url: "profile",
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useProfileMutation,
} = userApiSlice;

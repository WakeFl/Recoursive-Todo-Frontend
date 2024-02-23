import { buildCacheCollectionHandler } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/cacheCollection'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getTokenFromLocalStorage } from 'src/helpers/localstorage.helper'
import { IResponseUserData, IUser, IUserData } from 'src/models'

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3005/api' }),
  tagTypes: ['User'],
  endpoints: (build) => ({
    register: build.mutation<IResponseUserData, IUserData>({
      query: (user) => ({
        url: '/user',
        method: 'POST',
        body: user,
        headers: {
          Authorization: 'Bearer ' + getTokenFromLocalStorage(),
        },
      }),
    }),
    login: build.mutation<IUser, IUserData>({
      query: (user) => ({
        url: '/auth/login',
        method: 'POST',
        body: user,
        headers: {
          Authorization: 'Bearer ' + getTokenFromLocalStorage(),
        },
      }),
    }),
    getMe: build.query<IUser, ''>({
      query: () => ({
        url: '/auth/profile',
        headers: {
          Authorization: 'Bearer ' + getTokenFromLocalStorage(),
        },
      }),
    }),
  }),
})

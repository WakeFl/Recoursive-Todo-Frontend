import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getTokenFromLocalStorage } from 'src/helpers/localstorage.helper'
import { ITodo } from 'src/models'

export const subtodoAPI = createApi({
  reducerPath: 'subtodoAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3005/api' }),
  tagTypes: ['Subtodo'],
  endpoints: (build) => ({
    fetchAllTodos: build.query<ITodo[], number>({
      query: (number) => ({
        url: `/subtodo/${number}`,
        headers: {
          Authorization: 'Bearer ' + getTokenFromLocalStorage(),
        },
      }),
      providesTags: (result) => ['Subtodo'],
    }),
    createNewTodo: build.mutation<ITodo, { todo: string; parent: number }>({
      query: (todo) => ({
        url: '/subtodo',
        method: 'POST',
        body: todo,
        headers: {
          Authorization: 'Bearer ' + getTokenFromLocalStorage(),
        },
      }),
      invalidatesTags: ['Subtodo'],
    }),
    deleteTodo: build.mutation({
      query: (id) => ({
        url: `/subtodo/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + getTokenFromLocalStorage(),
        },
      }),
      invalidatesTags: ['Subtodo'],
    }),
    updateTodo: build.mutation<ITodo, { todo: string; id: number }>({
      query: ({ todo, id }) => ({
        url: `/subtodo/${id}`,
        method: 'PATCH',
        body: { todo },
        headers: {
          Authorization: 'Bearer ' + getTokenFromLocalStorage(),
        },
      }),
      invalidatesTags: ['Subtodo'],
    }),
  }),
})

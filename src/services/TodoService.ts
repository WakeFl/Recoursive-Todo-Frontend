import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getTokenFromLocalStorage } from 'src/helpers/localstorage.helper'
import { ITodo } from 'src/models'

export const todoAPI = createApi({
  reducerPath: 'todoAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3005/api' }),
  tagTypes: ['Todo'],
  endpoints: (build) => ({
    fetchAllTodos: build.query<ITodo[], ''>({
      query: () => ({
        url: '/todo',
        headers: {
          Authorization: 'Bearer ' + getTokenFromLocalStorage(),
        },
      }),
      providesTags: (result) => ['Todo'],
    }),
    createNewTodo: build.mutation<
      ITodo,
      { todo: string; isMain: boolean; parentId?: string }
    >({
      query: (todo) => ({
        url: '/todo',
        method: 'POST',
        body: todo,
        headers: {
          Authorization: 'Bearer ' + getTokenFromLocalStorage(),
        },
      }),
      invalidatesTags: ['Todo'],
    }),
    deleteTodo: build.mutation({
      query: (id) => ({
        url: `/todo/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + getTokenFromLocalStorage(),
        },
      }),
      invalidatesTags: ['Todo'],
    }),
    updateTodo: build.mutation<ITodo, { todo: string; id: number }>({
      query: ({ todo, id }) => ({
        url: `/todo/${id}`,
        method: 'PATCH',
        body: { todo },
        headers: {
          Authorization: 'Bearer ' + getTokenFromLocalStorage(),
        },
      }),
      invalidatesTags: ['Todo'],
    }),
  }),
})

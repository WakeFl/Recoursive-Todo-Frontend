import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getTokenFromLocalStorage } from 'src/helpers/localstorage.helper'
import { ITodo } from 'src/models'

export const todoAPI = createApi({
  reducerPath: 'todoAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3005/api' }),
  tagTypes: ['Todo', 'Like'],
  endpoints: (build) => ({
    fetchAllTodos: build.query<ITodo[], ''>({
      query: () => ({
        url: '/todo',
        headers: {
          Authorization: 'Bearer ' + getTokenFromLocalStorage('token'),
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
          Authorization: 'Bearer ' + getTokenFromLocalStorage('token'),
        },
      }),
      invalidatesTags: ['Todo'],
    }),
    deleteTodo: build.mutation({
      query: (id) => ({
        url: `/todo/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + getTokenFromLocalStorage('token'),
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
          Authorization: 'Bearer ' + getTokenFromLocalStorage('token'),
        },
      }),
      invalidatesTags: ['Todo'],
    }),
    like: build.mutation<number, { todoId: string }>({
      query: (id) => ({
        url: `/like`,
        method: 'POST',
        body: id,
        headers: {
          Authorization: 'Bearer ' + getTokenFromLocalStorage('token'),
        },
      }),
    }),
    hasLike: build.query<boolean, number>({
      query: (id) => ({
        url: `/like/${id}`,
        headers: {
          Authorization: 'Bearer ' + getTokenFromLocalStorage('token'),
        },
      }),
    }),
    getLike: build.query<number, number>({
      query: (id) => ({
        url: `/like/count/${id}`,
      }),
    }),
  }),
})

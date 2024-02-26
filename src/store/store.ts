import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authAPI } from 'src/services/AuthService'
import { todoAPI } from 'src/services/TodoService'
import userReducer from './reducers/UserSlice'

const rootReducer = combineReducers({
  userReducer,
  [todoAPI.reducerPath]: todoAPI.reducer,
  [authAPI.reducerPath]: authAPI.reducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(todoAPI.middleware)
        .concat(authAPI.middleware),
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from 'src/models'

interface IUserState {
  isAuth: boolean
  user: IUser | null
}

const initialState: IUserState = {
  isAuth: false,
  user: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state) => {
      state.isAuth = true
      state.user = {}
    },
    logout: (state) => {
      state.isAuth = false
    },
  },
})

export default userSlice.reducer

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from 'src/models'

interface IUserState {
  isAuth: boolean
}

const initialState: IUserState = {
  isAuth: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state) => {
      state.isAuth = true
    },
    logout: (state) => {
      state.isAuth = false
    },
  },
})

export default userSlice.reducer

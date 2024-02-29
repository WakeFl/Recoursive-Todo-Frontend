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
    login: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload
      state.isAuth = true
    },
    logout: (state) => {
      state.isAuth = false
      state.user = null
    },
  },
})

export default userSlice.reducer

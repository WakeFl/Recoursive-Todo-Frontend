import { useEffect, useState } from 'react'
import {
  getTokenFromLocalStorage,
  setTokenToLocalStorage,
} from 'src/helpers/localstorage.helper'
import { authAPI } from 'src/services/AuthService'
import { userSlice } from 'src/store/reducers/UserSlice'
import { useAppDispatch } from './redux'

export const useRefresh = () => {
  const dispatch = useAppDispatch()
  const { login, logout } = userSlice.actions
  const { data, isLoading } = authAPI.useGetMeQuery('')
  const { data: refreshData } = authAPI.useRefreshTokenQuery('')
  const checkAuth = async () => {
    const token = getTokenFromLocalStorage('token')
    try {
      if (token) {
        if (data) {
          dispatch(login(data))
        } else {
          refresh()
        }
      } else {
        refresh()
      }
    } catch (err) {
      console.log(err)
    }
  }

  const refresh = () => {
    const refreshToken = getTokenFromLocalStorage('refreshToken')
    if (refreshToken) {
      if (refreshData) {
        console.log(refreshData)
        setTokenToLocalStorage('token', refreshData.token)
        dispatch(login(refreshData))
      } else {
        logout()
      }
    } else {
      logout()
    }
  }

  useEffect(() => {
    checkAuth()
  }, [data, refreshData])
}

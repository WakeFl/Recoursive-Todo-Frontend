import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/router'
import { useAppDispatch } from './hooks/redux'
import { getTokenFromLocalStorage } from './helpers/localstorage.helper'
import { userSlice } from './store/reducers/UserSlice'
import { useEffect } from 'react'
import './index.css'
import { authAPI } from './services/AuthService'
import { Box, Flex, Spinner } from '@chakra-ui/react'

function App() {
  const dispatch = useAppDispatch()
  const { login, logout } = userSlice.actions
  const { data, isLoading } = authAPI.useGetMeQuery('')

  const checkAuth = async () => {
    const token = getTokenFromLocalStorage()
    try {
      if (token) {
        if (data) {
          dispatch(login(data))
        } else {
          dispatch(logout())
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [data])

  if (isLoading) {
    return (
      <Flex
        position='fixed'
        backgroundColor='rgba(0, 0, 0, 0.4)'
        top='0px'
        bottom='0px'
        left='0px'
        right='0px'
        zIndex='1000'
        height='100vh'
        alignItems='center'
        justifyContent='center'>
        <Spinner
          thickness='4px'
          speed='0.65s'
          color='yellow.1'
          size='xl'
        />
      </Flex>
    )
  }

  return <RouterProvider router={router} />
}

export default App

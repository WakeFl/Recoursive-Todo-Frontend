import './App.css'
import { Box, Button, Flex, Link } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import './index.css'
import { useAuth } from './hooks/useAuth'
import { useAppDispatch } from './hooks/redux'
import { userSlice } from './store/reducers/UserSlice'
import { removeTokenFromLocalStorage } from './helpers/localstorage.helper'
import { toast } from 'react-toastify'

function Layout() {
  const dispatch = useAppDispatch()
  const { logout } = userSlice.actions

  const logoutHandler = () => {
    dispatch(logout())
    removeTokenFromLocalStorage('token')
    removeTokenFromLocalStorage('refreshToken')
    toast.success('You logged out')
  }

  const isAuth = useAuth()
  return (
    <Box>
      <Box pb='60px'>
        <Flex
          position='absolute'
          top='0'
          right='30px'>
          <Button
            as={Link}
            href='/all'>
            All todos
          </Button>
          <Button
            as={Link}
            href='/authors'>
            Authors
          </Button>
          {isAuth ? (
            <Flex>
              <Button
                as={Link}
                href='/'>
                My Todo
              </Button>
              <Button onClick={logoutHandler}>Log out</Button>
            </Flex>
          ) : (
            <Button
              as={Link}
              href='/auth'>
              Login
            </Button>
          )}
        </Flex>
      </Box>
      <Outlet />
    </Box>
  )
}

export default Layout

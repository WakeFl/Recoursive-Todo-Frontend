import { Box, Button, Link } from '@chakra-ui/react'
import TodoForm from 'src/components/Todos/TodoForm'
import TodoList from 'src/components/Todos/TodoList'
import { useAuth } from 'src/hooks/useAuth'
import { useAppDispatch } from 'src/hooks/redux'
import { userSlice } from 'src/store/reducers/UserSlice'
import { removeTokenFromLocalStorage } from 'src/helpers/localstorage.helper'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const isAuth = useAuth()
  const dispatch = useAppDispatch()
  const { logout } = userSlice.actions
  const navigate = useNavigate()

  const logoutHandler = () => {
    dispatch(logout())
    removeTokenFromLocalStorage('token')
    toast.success('You logged out')
  }

  useEffect(() => {
    if (isAuth === false) navigate('/auth')
  }, [isAuth])

  return (
    <>
      {isAuth ? (
        <Box className='App'>
          <Button
            onClick={logoutHandler}
            position='absolute'
            top='0'
            right='30px'>
            Log out
          </Button>
          <TodoForm />
          <TodoList />
        </Box>
      ) : (
        <Button
          as={Link}
          href='/auth'
          position='absolute'
          top='0'
          right='30px'>
          Login
        </Button>
      )}
    </>
  )
}

export default Home

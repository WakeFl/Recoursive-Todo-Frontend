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
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuth === false) navigate('/auth')
  }, [isAuth])

  return (
    <>
      {isAuth && (
        <Box className='App'>
          <TodoForm />
          <TodoList />
        </Box>
      )}
    </>
  )
}

export default Home

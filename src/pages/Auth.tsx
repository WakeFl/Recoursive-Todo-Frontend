import { Box, Button, Input } from '@chakra-ui/react'
import { BaseSyntheticEvent, useEffect, useState } from 'react'
import { setTokenToLocalStorage } from 'src/helpers/localstorage.helper'
import { useAppDispatch } from 'src/hooks/redux'
import { userSlice } from 'src/store/reducers/UserSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from 'src/hooks/useAuth'
import { authAPI } from 'src/services/AuthService'

const Auth = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { login: logIn } = userSlice.actions

  const [
    register,
    { error: errorSignIn, isSuccess: successSignIn, data: signinData },
  ] = authAPI.useRegisterMutation()
  const [
    login,
    { error: errorLogIn, isSuccess: successLogIn, data: loginData },
  ] = authAPI.useLoginMutation()

  const isAuth = useAuth()
  useEffect(() => {
    if (isAuth) navigate('/')
    console.log(isAuth)
  }, [isAuth])

  const registrationHandler = async (e: BaseSyntheticEvent) => {
    e.preventDefault()
    await register({ email, password })
  }

  const loginHandler = async (e: BaseSyntheticEvent) => {
    e.preventDefault()
    await login({ email, password })
  }

  useEffect(() => {
    if (signinData && successSignIn) {
      setIsLogin(!isLogin)
    }
  }, [signinData])

  useEffect(() => {
    if (loginData && successLogIn) {
      setTokenToLocalStorage('token', loginData.token)
      setTokenToLocalStorage('refreshToken', loginData.refreshToken)
      dispatch(logIn(loginData))
    }
  }, [loginData])

  useEffect(() => {
    if (errorLogIn) {
      toast.error('Something went wrong')
    }
  }, [errorLogIn])

  useEffect(() => {
    if (errorSignIn) {
      toast.error('Something went wrong')
    }
  }, [errorSignIn])

  return (
    <Box
      mt='20px'
      maxW='250px'
      m='0 auto'>
      {isLogin ? 'Login' : 'Register'}
      <form onSubmit={isLogin ? loginHandler : registrationHandler}>
        <Input
          type='text'
          placeholder='email'
          onChange={(e) => setEmail(e.target.value)}
          m='20px 0'
        />
        <Input
          type='password'
          placeholder='password'
          onChange={(e) => setPassword(e.target.value)}
          mb='20px'
        />
        <Button
          type='submit'
          variant='solid'
          _hover={{ backgroundColor: 'grey' }}>
          Submit
        </Button>
      </form>
      <Button
        onClick={() => setIsLogin(!isLogin)}
        variant='ghost'
        mt='20px'>
        {isLogin ? 'You don`t have an account?' : 'Already have an account?'}
      </Button>
    </Box>
  )
}
export default Auth

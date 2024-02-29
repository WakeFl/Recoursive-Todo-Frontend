import { Box, Button, Text } from '@chakra-ui/react'
import { getByRole } from '@testing-library/react'
import { useState } from 'react'
import { useSession } from 'src/hooks/useSession'
import { IStat } from 'src/models'
import { authAPI } from 'src/services/AuthService'

interface IProps {
  user: IStat
}

export const User = ({ user }: IProps) => {
  const [role, setRole] = useState(user.user_role)

  const session = useSession()
  const [toggleAdmin, { isSuccess }] = authAPI.useToggleAdminMutation()

  const changeRole = () => {
    toggleAdmin({ email: user.user_email })
    if (role === 'admin') {
      setRole('user')
    } else {
      setRole('admin')
    }
  }

  return (
    <Box mb='40px'>
      <hr />
      <Text fontSize='lg'>ID - {user.user_id}</Text>
      <Text fontSize='lg'>Email - {user.user_email}</Text>
      <Text fontSize='lg'>Number of todo - {user.todocount}</Text>
      <Text fontSize='lg'>Number of received likes - {user.likecount}</Text>
      <Text fontSize='lg'>Role - {role}</Text>
      {session?.role === 'superAdmin' && user.user_role !== 'superAdmin' && (
        <Button onClick={changeRole}>Change role</Button>
      )}
      <hr />
    </Box>
  )
}

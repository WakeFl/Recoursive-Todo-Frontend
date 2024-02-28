import { Box, Text } from '@chakra-ui/react'
import { authAPI } from 'src/services/AuthService'

const Authors = () => {
  const { data: stat } = authAPI.useGetStatQuery('')

  console.log(stat)
  return (
    <Box>
      {stat &&
        stat.map((user) => (
          <Box
            key={user.user_id}
            mb='40px'>
            <hr />
            <Text fontSize='lg'>ID - {user.user_id}</Text>
            <Text fontSize='lg'>Email - {user.user_email}</Text>
            <Text fontSize='lg'>Number of todo - {user.todocount}</Text>
            <Text fontSize='lg'>Number of likes given - {user.likecount}</Text>
            <hr />
          </Box>
        ))}
    </Box>
  )
}
export default Authors

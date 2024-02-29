import { Box } from '@chakra-ui/react'
import { User } from 'src/components/User'
import { authAPI } from 'src/services/AuthService'

const Authors = () => {
  const { data: stat } = authAPI.useGetStatQuery('')

  console.log(stat)
  return (
    <Box>
      {stat &&
        stat.map((user) => (
          <User
            key={user.user_id}
            user={user}
          />
        ))}
    </Box>
  )
}
export default Authors

import { Box, Text } from '@chakra-ui/react'
import TodoStatic from 'src/components/Todos/TodoStatic'
import { IAllUserData } from 'src/models'
import { authAPI } from 'src/services/AuthService'

const Todos = () => {
  const { data: users } = authAPI.useGetAllQuery('')
  console.log(users)
  return (
    <Box>
      {users &&
        users.map((user: IAllUserData) => (
          <Box key={user.id}>
            {!!user.todos.length && (
              <Box>
                <Text fontSize='3xl'>
                  ID - {user.id} Email - {user.email}
                </Text>
                <Box>
                  {user.todos.map((todo) => (
                    <TodoStatic
                      todo={todo}
                      key={todo.id}
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        ))}
    </Box>
  )
}
export default Todos

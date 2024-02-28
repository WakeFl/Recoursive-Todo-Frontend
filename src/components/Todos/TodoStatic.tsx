import { Box, Button, Text } from '@chakra-ui/react'

import { RiTodoFill } from 'react-icons/ri'
import { ITodo } from 'src/models'
import styles from './Todo.module.css'
import { todoAPI } from 'src/services/TodoService'
import { useAuth } from 'src/hooks/useAuth'
import { useState } from 'react'
import { useEffect } from 'react'

interface IProps {
  todo: ITodo
}
function TodoStatic({ todo }: IProps) {
  const { data: hasLike } = todoAPI.useHasLikeQuery(+todo.id)

  const [liked, setLiked] = useState(false)
  const [count, setCount] = useState(todo.likes.length)

  useEffect(() => {
    if (hasLike !== undefined) {
      setLiked(!!hasLike)
    }
  }, [hasLike])

  const [like, {}] = todoAPI.useLikeMutation()
  const isAuth = useAuth()

  const likeTodo = () => {
    like({ todoId: todo.id })
    if (liked) {
      setCount((prevCount) => prevCount - 1)
    } else {
      setCount((prevCount) => prevCount + 1)
    }
    setLiked(!liked)
  }

  return (
    <>
      <Box className={styles.todo}>
        <RiTodoFill className={styles.todoIcon} />
        <Text className={styles.todoText}>{todo.todo}</Text>
        <Text>Likes {count}</Text>
        {isAuth && (
          <Button onClick={likeTodo}>{liked ? 'unlike' : 'like'}</Button>
        )}
      </Box>
      <Box className={styles.subTodo}>
        {todo.children &&
          todo.children.map((todo: ITodo) => (
            <TodoStatic
              key={todo.id}
              todo={todo}
            />
          ))}
      </Box>
    </>
  )
}

export default TodoStatic

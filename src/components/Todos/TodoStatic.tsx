import { Box, Button, Flex, Image, Input, Text } from '@chakra-ui/react'

import { RiTodoFill } from 'react-icons/ri'
import { ITodo } from 'src/models'
import styles from './Todo.module.css'
import { todoAPI } from 'src/services/TodoService'
import { useAuth } from 'src/hooks/useAuth'
import { useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSession } from 'src/hooks/useSession'

interface IProps {
  todo: ITodo
}
function TodoStatic({ todo }: IProps) {
  const { data: hasLike } = todoAPI.useHasLikeQuery(+todo.id)
  const [deleteTodo, { isSuccess }] = todoAPI.useDeleteTodoMutation()

  const [liked, setLiked] = useState(false)
  const [count, setCount] = useState(todo.likes.length)

  const session = useSession()

  const [isUpdate, setIsUpdate] = useState(false)
  const [updatedText, setUpdatedText] = useState(todo.todo)

  const [isDeleted, setIsDeleted] = useState(false)

  const [updateTodo, {}] = todoAPI.useUpdateTodoMutation()

  const update = () => {
    if (isUpdate) {
      updateTodo({ todo: updatedText, id: Number(todo.id) })
      setIsUpdate(!isUpdate)
    } else {
      setIsUpdate(!isUpdate)
    }
  }

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

  const removeTodo = async () => {
    await deleteTodo(Number(todo.id))
    toast.warning('You deleted todo')
    setIsDeleted(true)
  }

  return (
    <>
      {!isDeleted && (
        <>
          <Box className={styles.todo}>
            <RiTodoFill className={styles.todoIcon} />
            {isUpdate ? (
              <Input
                variant='flushed'
                value={updatedText}
                onChange={(e) => setUpdatedText(e.target.value)}
              />
            ) : (
              <Text className={styles.todoText}>{updatedText}</Text>
            )}
            {(session?.role === 'superAdmin' || session?.role === 'admin') && (
              <Flex>
                <Button
                  onClick={removeTodo}
                  _hover={{ backgroundColor: 'grey' }}>
                  Delete Todo
                </Button>
                <Button
                  onClick={update}
                  _hover={{ backgroundColor: 'grey' }}>
                  {isUpdate ? 'Submit Todo' : 'Update Todo'}
                </Button>
              </Flex>
            )}
            <Flex
              ml='10px'
              alignItems='center'>
              {session ? (
                <Button
                  onClick={likeTodo}
                  variant='ghost'
                  _hover={{ background: '#fff' }}
                  w='70px'>
                  <Image
                    src={liked ? '/heart.svg' : '/heart-empty.svg'}></Image>
                </Button>
              ) : (
                <Image
                  w='40px'
                  src={'/heart-empty.svg'}
                  mr={'10px'}></Image>
              )}

              <Text>{count}</Text>
            </Flex>
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
      )}
    </>
  )
}

export default TodoStatic

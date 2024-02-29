import { Box, Button, Flex, Input, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { RiTodoFill } from 'react-icons/ri'
import { ITodo } from 'src/models'
import styles from './Todo.module.css'
import { todoAPI } from 'src/services/TodoService'

interface IProps {
  todo: ITodo
}
function Todo({ todo }: IProps) {
  const [subtaskText, setSubtaskText] = useState('')
  const [isUpdate, setIsUpdate] = useState(false)
  const [updatedText, setUpdatedText] = useState(todo.todo)
  const [isOpenForm, setIsOpenForm] = useState(false)

  const [updateTodo, {}] = todoAPI.useUpdateTodoMutation()
  const [createTodo, {}] = todoAPI.useCreateNewTodoMutation()

  const update = () => {
    if (isUpdate) {
      updateTodo({ todo: updatedText, id: Number(todo.id) })
      setIsUpdate(!isUpdate)
    } else {
      setIsUpdate(!isUpdate)
    }
  }
  const createNewSubtodo = () => {
    createTodo({ todo: subtaskText, isMain: false, parentId: todo.id })
    setIsOpenForm(!isOpenForm)
  }

  return (
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
          <Text className={styles.todoText}>{todo.todo}</Text>
        )}
        <Flex>
          <Button
            onClick={update}
            _hover={{ backgroundColor: 'grey' }}>
            {isUpdate ? 'Submit Todo' : 'Update Todo'}
          </Button>
          <Button
            _hover={{ backgroundColor: 'grey' }}
            onClick={() => setIsOpenForm(!isOpenForm)}>
            {isOpenForm ? ' - ' : ' + '}
          </Button>
        </Flex>
      </Box>
      {isOpenForm && (
        <Box className={styles.todoFormContainer}>
          <Input
            value={subtaskText}
            onChange={(e) => setSubtaskText(e.target.value)}
            placeholder='Enter new todo'></Input>
          <Button onClick={createNewSubtodo}>add</Button>
        </Box>
      )}
      <Box className={styles.subTodo}>
        {todo.children &&
          todo.children.map((todo: ITodo) => (
            <Todo
              key={todo.id}
              todo={todo}
            />
          ))}
      </Box>
    </>
  )
}

export default Todo

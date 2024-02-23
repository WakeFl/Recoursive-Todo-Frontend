import { Box, Button, Flex, Input, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { RiTodoFill } from 'react-icons/ri'
import { ITodo } from 'src/models'
import { toast } from 'react-toastify'
import styles from './Todo.module.css'
import { todoAPI } from 'src/services/TodoService'
import { subtodoAPI } from 'src/services/SubtodoService'

interface IProps {
  todo: ITodo
}
function Todo({ todo }: IProps) {
  const [subtaskText, setSubtaskText] = useState('')
  const [isUpdate, setIsUpdate] = useState(false)
  const [updatedText, setUpdatedText] = useState(todo.todo)
  const [isOpenForm, setIsOpenForm] = useState(false)

  const isSubtodo = !!todo.parent

  const [deleteTodo, { isSuccess }] = todoAPI.useDeleteTodoMutation()
  const [updateTodo, {}] = todoAPI.useUpdateTodoMutation()

  const [deleteSubtodo, {}] = subtodoAPI.useDeleteTodoMutation()
  const [createSubtodo, {}] = subtodoAPI.useCreateNewTodoMutation()
  const [updateSubtodo, {}] = subtodoAPI.useUpdateTodoMutation()

  const { data: todos } = subtodoAPI.useFetchAllTodosQuery(+todo.id)

  const removeTodo = async () => {
    await deleteTodo(Number(todo.id))
    toast.warning('You deleted todo')
  }

  const update = () => {
    if (isUpdate) {
      updateTodo({ todo: updatedText, id: Number(todo.id) })
      setIsUpdate(!isUpdate)
    } else {
      setIsUpdate(!isUpdate)
    }
  }

  const updateSub = () => {
    if (isUpdate) {
      updateSubtodo({ todo: updatedText, id: Number(todo.id) })
      setIsUpdate(!isUpdate)
    } else {
      setIsUpdate(!isUpdate)
    }
  }

  const removeSubtodo = async () => {
    await deleteSubtodo(Number(todo.id))
    toast.warning('You deleted subtodo')
  }

  const createNewSubtodo = () => {
    createSubtodo({ todo: subtaskText, parent: +todo.id })
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
            onClick={isSubtodo ? updateSub : update}
            _hover={{ backgroundColor: 'grey' }}>
            {isUpdate ? 'Submit Todo' : 'Update Todo'}
          </Button>
          <Button
            _hover={{ backgroundColor: 'grey' }}
            onClick={() => setIsOpenForm(!isOpenForm)}>
            {isOpenForm ? ' - ' : ' + '}
          </Button>
          <Button
            onClick={isSubtodo ? removeSubtodo : removeTodo}
            _hover={{ backgroundColor: 'grey' }}>
            Delete Todo
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
        {todos &&
          todos.map((todo: ITodo) => (
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

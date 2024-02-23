import { SyntheticEvent, useState } from 'react'
import styles from './TodoForm.module.css'
import { Box, Button, Input } from '@chakra-ui/react'
import { toast } from 'react-toastify'
import { todoAPI } from 'src/services/TodoService'

function TodoForm() {
  const [text, setText] = useState('')
  const [createTodo, {}] = todoAPI.useCreateNewTodoMutation()

  const onSubmitHandler = async (event: SyntheticEvent) => {
    try {
      event.preventDefault()
      const data = await createTodo({ todo: text })
      if (data) {
        toast.success('You added new todo')
      }
      setText('')
    } catch (err: any) {
      const error = err.response?.data.message
      toast.error(error.toString())
    }
  }

  return (
    <Box className={styles.todoFormContainer}>
      <form onSubmit={onSubmitHandler}>
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Enter new todo'></Input>
        <Button type='submit'>submit</Button>
      </form>
    </Box>
  )
}

export default TodoForm

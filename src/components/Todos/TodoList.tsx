import { ITodo } from 'src/models'
import Todo from './Todo'
import styles from './TodoList.module.css'
import { todoAPI } from 'src/services/TodoService'
import { useAuth } from 'src/hooks/useAuth'
import { useEffect } from 'react'

function TodoList() {
  const { data: todos, refetch } = todoAPI.useFetchAllTodosQuery('')
  const isAuth = useAuth()

  useEffect(() => {
    refetch()
  }, [isAuth])

  return (
    <div className={styles.todoListContainer}>
      {todos && !todos.length && <h2>Todo list is empty</h2>}
      {todos &&
        todos.map((todo: ITodo) => (
          <Todo
            key={todo.id}
            todo={todo}
          />
        ))}
    </div>
  )
}

export default TodoList

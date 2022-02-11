import produce from 'immer'
import keyBy from 'lodash.keyby'

export const toggleTodoMutation = produce(({ todosById }, id) => {
  const todo = todosById[id]
  todo.completed = !todo.completed
})

export const saveTodosMutation = produce((state, todos) => {
  const todosById = keyBy(
    todos,
    ({ id }) => id
  )

  const todoIdList = Object.keys(todosById)

  state.todosById = todosById
  state.todoIdList = todoIdList
})

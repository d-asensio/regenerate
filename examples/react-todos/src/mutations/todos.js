import produce from 'immer'

export const toggleTodoMutation = produce(({ todosById }, id) => {
  const todo = todosById[id]
  todo.completed = !todo.completed
})

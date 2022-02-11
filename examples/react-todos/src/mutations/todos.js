export const toggleTodoMutation = (state, id) => {
  return {
    ...state,
    todosById: {
      ...state.todosById,
      [id]: {
        ...state.todosById[id],
        completed: !state.todosById[id].completed
      }
    }
  }
}

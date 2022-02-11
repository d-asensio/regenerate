import env from '../effects/env'
import http from '../effects/http'
import store from '../effects/store'

import { deleteTodoMutation, saveTodosMutation, toggleTodoMutation } from '../mutations/todos'

export const todosService = (function IIFE () {
  function * fetchTodos () {
    const apiBaseUrl = yield env.get('REACT_APP_API_BASE_URL')
    const todos = yield http.fetchJson(`${apiBaseUrl}/todos`)

    yield store.mutate(saveTodosMutation, todos)
  }

  function * toggleTodo (id) {
    yield store.mutate(toggleTodoMutation, id)
  }

  function * deleteTodo (id) {
    yield store.mutate(deleteTodoMutation, id)
  }

  return {
    fetchTodos,
    toggleTodo,
    deleteTodo
  }
})()

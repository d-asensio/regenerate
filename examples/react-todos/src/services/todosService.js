import http from '../effects/http'
import store from '../effects/store'
import { saveTodosMutation, toggleTodoMutation } from '../mutations/todos'

export const todosService = (function IIFE () {
  function * fetchTodos () {
    const todos = yield http.fetchJson('https://jsonplaceholder.typicode.com/todos')

    yield store.mutate(saveTodosMutation, todos)
  }

  function * toggleTodo (id) {
    yield store.mutate(toggleTodoMutation, id)
  }

  return {
    fetchTodos,
    toggleTodo
  }
})()

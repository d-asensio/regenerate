import keyBy from 'lodash.keyby'
import http from '../effects/http'
import store from '../effects/store'
import { toggleTodoMutation } from '../mutations/todos'

export const todosService = (function IIFE () {
  function * fetchTodos () {
    const todos = yield http.fetchJson('https://jsonplaceholder.typicode.com/todos')

    const todosById = keyBy(
      todos,
      ({ id }) => id
    )

    const todoIdList = Object.keys(todosById)

    yield store.set({
      todosById,
      todoIdList
    })
  }

  function * toggleTodo (id) {
    yield store.mutate(toggleTodoMutation, id)
  }

  return {
    fetchTodos,
    toggleTodo
  }
})()

import keyBy from 'lodash.keyby'
import http from '../effects/http'
import store from '../effects/store'
import { todoSelector } from '../selectors/todos'

export const todosService = (function IIFE () {
  function * fetchTodos () {
    const todos = yield http.fetchJson('https://jsonplaceholder.typicode.com/todos')

    const todosById = keyBy(
      todos,
      ({ id }) => id
    )

    yield store.set({
      todosById
    })
  }

  function * toggleTodo (id) {
    const { completed } = yield store.select(todoSelector, id)
    yield store.set({
      todosById: {
        [id]: {
          completed: !completed
        }
      }
    })
  }

  return {
    fetchTodos,
    toggleTodo
  }
})()
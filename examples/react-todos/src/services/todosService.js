import keyBy from 'lodash.keyby'
import http from '../effects/http'
import store from '../effects/store'
import { todosByIdSelector, todoSelector } from '../selectors/todos'

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
    const { completed } = yield store.select(todoSelector, id)
    const todosById = yield store.select(todosByIdSelector)
    yield store.set({
      todosById: {
        ...todosById,
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

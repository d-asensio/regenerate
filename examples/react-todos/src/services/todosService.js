import keyBy from 'lodash.keyby'
import http from '../effects/http'
import store from '../effects/store'

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

  return {
    fetchTodos
  }
})()
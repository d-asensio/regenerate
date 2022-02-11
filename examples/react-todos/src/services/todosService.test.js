import env from '../effects/env'
import http from '../effects/http'
import store from '../effects/store'

import { todosService } from './todosService'
import { deleteTodoMutation, saveTodosMutation, toggleTodoMutation } from '../mutations/todos'

describe('fetchTodos', () => {
  it('should fetch todos from the API and store them in the store', () => {
    const todos = [
      {
        id: 'a-todo-id',
        title: 'A todo',
        completed: true
      },
      {
        id: 'another-todo-id',
        title: 'Another todo',
        completed: false
      }
    ]
    expect(
      todosService.fetchTodos()
    ).toGenerateEffects([
      {
        effect: env.get('REACT_APP_API_BASE_URL'),
        returns: 'https://an.api.url'
      },
      {
        effect: http.fetchJson('https://an.api.url/todos'),
        returns: todos
      },
      {
        effect: store.mutate(saveTodosMutation, todos)
      }
    ])
  })
})

describe('toggleTodo', () => {
  it('should use store.mutate with the toggleTodoMutation', () => {
    const todoId = 'a-todo-id'

    expect(
      todosService.toggleTodo(todoId)
    ).toGenerateEffects([
      {
        effect: store.mutate(toggleTodoMutation, todoId)
      }
    ])
  })
})

describe('deleteTodo', () => {
  it('should use store.mutate with the deleteTodoMutation', () => {
    const todoId = 'a-todo-id'

    expect(
      todosService.deleteTodo(todoId)
    ).toGenerateEffects([
      {
        effect: store.mutate(deleteTodoMutation, todoId)
      }
    ])
  })
})

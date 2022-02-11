import http from '../effects/http'
import { todosService } from './todosService'
import store from '../effects/store'
import { toggleTodoMutation } from '../mutations/todos'

describe('fetchTodos', () => {
  it('should fetch todos from the API and store them in the store', () => {
    expect(
      todosService.fetchTodos()
    ).toGenerateEffects([
      {
        effect: http.fetchJson('https://jsonplaceholder.typicode.com/todos'),
        returns: [
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
      },
      {
        effect: store.set({
          todosById: {
            'a-todo-id': {
              id: 'a-todo-id',
              title: 'A todo',
              completed: true
            },
            'another-todo-id': {
              id: 'another-todo-id',
              title: 'Another todo',
              completed: false
            }
          },
          todoIdList: [
            'a-todo-id',
            'another-todo-id'
          ]
        })
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

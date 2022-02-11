import http from '../effects/http'
import { todosService } from './todosService'
import store from '../effects/store'
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
        effect: http.fetchJson('https://jsonplaceholder.typicode.com/todos'),
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

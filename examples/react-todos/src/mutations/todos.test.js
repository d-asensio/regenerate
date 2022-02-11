import deepFreeze from 'deep-freeze'
import { toggleTodoMutation } from './todos'

describe('toggleTodoMutation', () => {
  it('should activate the "completed" state of the given todo, without modifying the original state', () => {
    const todoId = 'a-todo-id'
    const state = deepFreeze({
      todosById: {
        [todoId]: {
          id: todoId,
          completed: false
        },
        'another-todo-id': {
          id: 'another-todo-id',
          completed: false
        }
      }
    })

    const result = toggleTodoMutation(state, todoId)

    expect(result).toStrictEqual({
      todosById: {
        [todoId]: {
          id: todoId,
          completed: true
        },
        'another-todo-id': {
          id: 'another-todo-id',
          completed: false
        }
      }
    })
  })

  it('should deactivate the "completed" state of the given todo, without modifying the original state', () => {
    const todoId = 'a-todo-id'
    const state = deepFreeze({
      todosById: {
        [todoId]: {
          id: todoId,
          completed: true
        },
        'another-todo-id': {
          id: 'another-todo-id',
          completed: true
        }
      }
    })

    const result = toggleTodoMutation(state, todoId)

    expect(result).toStrictEqual({
      todosById: {
        [todoId]: {
          id: todoId,
          completed: false
        },
        'another-todo-id': {
          id: 'another-todo-id',
          completed: true
        }
      }
    })
  })
})

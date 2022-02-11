import deepFreeze from 'deep-freeze'
import { saveTodosMutation, toggleTodoMutation } from './todos'

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

describe('saveTodosMutation', () => {
  it('should index todos and save them to the store', () => {
    const state = deepFreeze({})
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

    const result = saveTodosMutation(state, todos)

    expect(result).toStrictEqual({
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
  })
})

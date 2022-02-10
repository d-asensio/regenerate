import { todoIdListSelector, todosByIdSelector, todoSelector } from './todos'

describe('todosByIdSelector', () => {
  it('should return todosById from the state', () => {
    const todosById = {
      'any-todo-id': {}
    }
    const state = {
      todosById
    }

    const result = todosByIdSelector(state)

    expect(result).toStrictEqual(todosById)
  })

  it('should return an empty object if todosById is not defined in the state', () => {
    const state = {}

    const result = todosByIdSelector(state)

    expect(result).toStrictEqual({})
  })
})

describe('todoIdListSelector', () => {
  it('should get the list of ids for the todos in the state', () => {
    const state = {
      todoIdList: [
        'todo-1',
        'todo-2'
      ]
    }

    const result = todoIdListSelector(state)

    expect(result).toStrictEqual([
      'todo-1',
      'todo-2'
    ])
  })

  it('should return an empty array if the state is empty', () => {
    const state = {}

    const result = todoIdListSelector(state)

    expect(result).toStrictEqual([])
  })
})

describe('todoSelector', () => {
  it('should get a todo by id from the state', () => {
    const todoId = 'a-todo-id'
    const todo = {
      id: todoId,
      title: 'Something pending',
      completed: false
    }
    const state = {
      todosById: {
        'any-todo-id': {},
        [todoId]: todo
      }
    }

    const result = todoSelector(state, todoId)

    expect(result).toStrictEqual(todo)
  })

  it('should return "null" in case there is no todo with the provided id in the state', () => {
    const state = {
      todosById: {
        'any-todo-id': {}
      }
    }

    const result = todoSelector(state, 'not-existing-id')

    expect(result).toBe(null)
  })

  it('should return "null" in case the state is empty', () => {
    const state = {}

    const result = todoSelector(state, 'not-existing-id')

    expect(result).toBe(null)
  })
})

import { todoIdListSelector } from './todos'

describe('todoIdListSelector', () => {
  it('should get the list of ids for the todos in the state', () => {
    const state = {
      todosById: {
        'todo-1': {},
        'todo-2': {}
      }
    }

    const result = todoIdListSelector(state);

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
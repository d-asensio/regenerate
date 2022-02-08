import { when } from 'jest-when'

const store = {
  getState: jest.fn(),
  setState: jest.fn()
}

describe('get', () => {
  const effect = createEffect({ store })

  it('should work', () => {
    const state = {
      aPiece: 'of state'
    }
    when(store.getState)
      .mockReturnValue(state)

    const result = effect.get()

    expect(result).toStrictEqual(state)
  })
})

function createEffect (dependencies = {}) {
  const {
    store
  } = dependencies

  function get () {
    return store.getState()
  }

  function set () {

  }

  function select () {

  }

  return {
    get,
    set,
    select
  }
}

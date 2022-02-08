import { when } from 'jest-when'

const store = {
  getState: jest.fn(),
  setState: jest.fn()
}

describe('get', () => {
  const effect = createEffect({ store })

  it('should get the state from the store', () => {
    const state = {
      aPiece: 'of state'
    }
    when(store.getState)
      .mockReturnValue(state)

    const result = effect.get()

    expect(result).toStrictEqual(state)
  })
})

describe('set', () => {
  const effect = createEffect({ store })

  it('should set the state to the store', () => {
    const state = {
      aPiece: 'of state'
    }

    effect.set(state)

    expect(store.setState).toHaveBeenCalledWith(state)
  })
})

function createEffect (dependencies = {}) {
  const {
    store
  } = dependencies

  function get () {
    return store.getState()
  }

  function set (state) {
    store.setState(state)
  }

  function select () {

  }

  return {
    get,
    set,
    select
  }
}

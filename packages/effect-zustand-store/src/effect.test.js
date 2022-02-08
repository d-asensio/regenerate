import { when } from 'jest-when'
import { createZustandEffect } from './effect'

const store = {
  getState: jest.fn(),
  setState: jest.fn()
}

describe('get', () => {
  const effect = createZustandEffect({ store })

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
  const effect = createZustandEffect({ store })

  it('should set the state to the store', () => {
    const state = {
      aPiece: 'of state'
    }

    effect.set(state)

    expect(store.setState).toHaveBeenCalledWith(state)
  })
})

describe('select', () => {
  const effect = createZustandEffect({ store })

  it('should select state from the store', () => {
    const selectorFn = jest.fn()
    const state = {
      aPiece: 'of state'
    }
    when(store.getState)
      .mockReturnValue(state)

    effect.select(selectorFn)

    expect(selectorFn).toHaveBeenCalledWith(state)
  })

  it('should select state from the store, using a selector with additional arguments', () => {
    const selectorFn = jest.fn()
    const state = {
      aPiece: 'of state'
    }
    const additionalArgs = [
      'an-argument',
      'another-argument'
    ]
    when(store.getState)
      .mockReturnValue(state)

    effect.select(selectorFn, ...additionalArgs)

    expect(selectorFn).toHaveBeenCalledWith(state, ...additionalArgs)
  })
})

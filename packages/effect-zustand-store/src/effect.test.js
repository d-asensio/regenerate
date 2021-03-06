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

  it('should return the selected value', () => {
    const selectedValue = 'a-value'
    const selectorFn = jest.fn()
    when(selectorFn)
      .mockReturnValue(selectedValue)

    const result = effect.select(selectorFn)

    expect(result).toStrictEqual(selectedValue)
  })
})

describe('mutate', () => {
  const effect = createZustandEffect({ store })

  it('should generate a new state through the given mutation function and write it to the state', () => {
    const mutationFn = jest.fn()
    const state = {
      aPiece: 'of state'
    }
    const args = [
      'an-argument',
      'another-argument'
    ]
    const mutatedState = {
      ...state,
      anotherPiece: 'of state'
    }
    when(mutationFn)
      .calledWith(state, ...args)
      .mockReturnValue(mutatedState)

    effect.mutate(mutationFn, ...args)

    expect(store.setState).toHaveBeenCalledWith(mutatedState)
  })
})

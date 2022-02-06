import { when } from 'jest-when'

const effectRegistry = {
  getEffectById: jest.fn()
}

describe('run', () => {
  const effectsRunner = createEffectsRunner({ effectRegistry })

  it('should get the first effect function and execute it with the arguments provided by the effect descriptor', () => {
    const firstEffectId = 'a-effect-id'
    const firstEffectArguments = [
      'an-argument',
      'another-argument'
    ]
    const firstEffectDescriptor = {
      id: firstEffectId,
      args: firstEffectArguments
    }
    const firstEffectFn = jest.fn()
    when(effectRegistry.getEffectById)
      .calledWith(firstEffectId)
      .mockReturnValue(firstEffectFn)
    const effects = (function * () {
      yield firstEffectDescriptor
    }())

    effectsRunner.run(
      effects
    )

    expect(firstEffectFn).toHaveBeenCalledWith(...firstEffectArguments)
  })

  it('should pass the result of the first effect back to the generator', () => {
    const firstEffectId = 'a-effect-id'
    const firstEffectDescriptor = {
      id: firstEffectId,
      args: []
    }
    const firstEffectFn = jest.fn()
    const firstEffectResult = 'any-result'
    when(firstEffectFn)
      .mockReturnValue(firstEffectResult)
    when(effectRegistry.getEffectById)
      .calledWith(firstEffectId)
      .mockReturnValue(firstEffectFn)
    let result
    const effects = (function * () {
      result = yield firstEffectDescriptor
    }())

    effectsRunner.run(
      effects
    )

    expect(result).toEqual(firstEffectResult)
  })

  it('should throw back to the generator any error produced in the effect function', () => {
    const firstEffectId = 'a-effect-id'
    const firstEffectError = new Error()
    const firstEffectDescriptor = {
      id: firstEffectId,
      args: []
    }
    const firstEffectFn = jest.fn(() => {
      throw firstEffectError
    })
    when(effectRegistry.getEffectById)
      .calledWith(firstEffectId)
      .mockReturnValue(firstEffectFn)
    let thrownError
    const effects = (function * () {
      try {
        yield firstEffectDescriptor
      } catch (e) {
        thrownError = e
      }
    }())

    effectsRunner.run(
      effects
    )

    expect(thrownError).toBe(firstEffectError)
  })
})

function createEffectsRunner (dependencies = {}) {
  const {
    effectRegistry
  } = dependencies

  function run (effectStream) {
    let iteratee = effectStream.next()

    const { id, args } = iteratee.value
    const effectFn = effectRegistry.getEffectById(id)

    try {
      const effectResult = effectFn(...args)
      iteratee = effectStream.next(effectResult)
    } catch (e) {
      effectStream.throw(e)
    }
  }

  return { run }
}

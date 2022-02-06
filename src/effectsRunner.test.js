import { when } from 'jest-when'
import { EffectDescriptor } from './effectDescriptor'

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
    const firstEffectFn = jest.fn()
    when(effectRegistry.getEffectById)
      .calledWith(firstEffectId)
      .mockReturnValue(firstEffectFn)
    const effects = (function * () {
      yield EffectDescriptor.fromObject({
        id: firstEffectId,
        args: firstEffectArguments
      })
    }())

    effectsRunner.run(
      effects
    )

    expect(firstEffectFn).toHaveBeenCalledWith(...firstEffectArguments)
  })

  it('should pass the result of the first effect back to the generator', () => {
    const firstEffectId = 'a-effect-id'
    const firstEffectFn = jest.fn()
    const firstEffectResult = 'any-result'
    when(firstEffectFn)
      .mockReturnValue(firstEffectResult)
    when(effectRegistry.getEffectById)
      .calledWith(firstEffectId)
      .mockReturnValue(firstEffectFn)
    let result
    const effects = (function * () {
      result = yield EffectDescriptor.fromObject({ id: firstEffectId })
    }())

    effectsRunner.run(
      effects
    )

    expect(result).toEqual(firstEffectResult)
  })

  it('should throw back to the generator any error produced in the effect function', () => {
    const firstEffectId = 'a-effect-id'
    const firstEffectError = new Error()
    const firstEffectFn = jest.fn()
    when(firstEffectFn)
      .mockImplementation(() => {
        throw firstEffectError
      })
    when(effectRegistry.getEffectById)
      .calledWith(firstEffectId)
      .mockReturnValue(firstEffectFn)
    const effects = (function * () {
      yield EffectDescriptor.fromObject({ id: firstEffectId })
    }())

    const act = () => {
      effectsRunner.run(
        effects
      )
    }

    expect(act).toThrowError()
  })

  it('should run multiple effects', () => {
    const firstEffectId = 'a-effect-id'
    const firstEffectFn = jest.fn()
    const secondEffectId = 'another-effect-id'
    const secondEffectFn = jest.fn()
    when(effectRegistry.getEffectById)
      .calledWith(firstEffectId)
      .mockReturnValue(firstEffectFn)
      .calledWith(secondEffectId)
      .mockReturnValue(secondEffectFn)

    const effects = (function * () {
      yield EffectDescriptor.fromObject({ id: firstEffectId })
      yield EffectDescriptor.fromObject({ id: secondEffectId })
    }())

    effectsRunner.run(
      effects
    )

    expect(firstEffectFn).toHaveBeenCalled()
    expect(secondEffectFn).toHaveBeenCalled()
  })
})

function createEffectsRunner (dependencies = {}) {
  const {
    effectRegistry
  } = dependencies

  function run (effectStream) {
    let iteratee = effectStream.next()

    do {
      const { id, args } = iteratee.value
      const effectFn = effectRegistry.getEffectById(id)

      try {
        const effectResult = effectFn(...args)
        iteratee = effectStream.next(effectResult)
      } catch (e) {
        iteratee = effectStream.throw(e)
      }
    } while (!iteratee.done)
  }

  return { run }
}

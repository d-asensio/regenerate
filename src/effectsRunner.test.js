import { when } from 'jest-when'
import { EffectDescriptor } from './effectDescriptor'
import { createEffectExecutor } from './effectExecutor'

const effectRegistry = {
  getEffectById: jest.fn()
}

const effectExecutor = {
  exec: jest.fn()
}

describe('run', () => {
  const effectsRunner = createEffectsRunner({ effectRegistry })

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

  it('should run multiple effects using the effect executor', () => {
    const effectsRunner = createEffectsRunner({ effectExecutor })

    const firstEffectDescriptor = EffectDescriptor.fromObject({
      id: 'a-effect-id'
    })
    const secondEffectDescriptor = EffectDescriptor.fromObject({
      id: 'another-effect-id'
    })

    const effects = (function * () {
      yield firstEffectDescriptor
      yield secondEffectDescriptor
    }())

    effectsRunner.run(
      effects
    )

    expect(effectExecutor.exec).toHaveBeenCalledWith(firstEffectDescriptor)
    expect(effectExecutor.exec).toHaveBeenCalledWith(secondEffectDescriptor)
  })
})

function createEffectsRunner (dependencies = {}) {
  const {
    effectRegistry,
    effectExecutor = createEffectExecutor({
      effectRegistry
    })
  } = dependencies

  function run (effectStream) {
    let iteratee = effectStream.next()

    do {
      const { value: effectDescriptor } = iteratee

      try {
        const effectResult = effectExecutor.exec(effectDescriptor)
        iteratee = effectStream.next(effectResult)
      } catch (e) {
        iteratee = effectStream.throw(e)
      }
    } while (!iteratee.done)
  }

  return { run }
}

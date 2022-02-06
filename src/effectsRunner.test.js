import { when } from 'jest-when'
import { EffectDescriptor } from './effectDescriptor'

const effectRegistry = {
  getEffectById: jest.fn()
}

const effectExecutor = {
  exec: jest.fn()
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

describe('exec', () => {
  const effectExecutor = createEffectExecutor({ effectRegistry })

  it('should get an effect from the repository by id and execute it with the arguments provided by the descriptor', () => {
    const effectId = 'a-effect-id'
    const effectArguments = [
      'an-argument',
      'another-argument'
    ]
    const effectFn = jest.fn()
    const effectDescriptor = EffectDescriptor.fromObject({
      id: effectId,
      args: effectArguments
    })
    when(effectRegistry.getEffectById)
      .calledWith(effectId)
      .mockReturnValue(effectFn)

    effectExecutor.exec(effectDescriptor)

    expect(effectFn).toHaveBeenCalledWith(...effectArguments)
  })

  it('should return the effect result', () => {
    const effectId = 'a-effect-id'
    const effectDescriptor = EffectDescriptor.fromObject({
      id: effectId
    })
    const effectFn = jest.fn()
    const effectResult = 'a-result'
    when(effectFn)
      .mockReturnValue(effectResult)
    when(effectRegistry.getEffectById)
      .calledWith(effectId)
      .mockReturnValue(effectFn)

    const result = effectExecutor.exec(effectDescriptor)

    expect(result).toBe(effectResult)
  })
})

function createEffectExecutor (dependencies = {}) {
  const {
    effectRegistry
  } = dependencies

  function exec (effectDescriptor) {
    const { id, args } = effectDescriptor
    const effectFn = effectRegistry.getEffectById(id)

    return effectFn(...args)
  }

  return { exec }
}

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

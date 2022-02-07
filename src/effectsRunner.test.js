import { when } from 'jest-when'
import { EffectDescriptor } from './effectDescriptor'
import { createEffectsRunner, InvalidEffectStreamError } from './effectsRunner'
import { UnableToExecuteEffectError } from './effectExecutor'

const effectExecutor = {
  exec: jest.fn()
}

describe('run', () => {
  const effectsRunner = createEffectsRunner({ effectExecutor })

  it('should run multiple effects using the effect executor', async () => {
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

    await effectsRunner.run(
      effects
    )

    expect(effectExecutor.exec).toHaveBeenCalledWith(firstEffectDescriptor)
    expect(effectExecutor.exec).toHaveBeenCalledWith(secondEffectDescriptor)
  })

  it('should pass the result of the effect executor back to the generator', async () => {
    const effectDescriptor = EffectDescriptor.fromObject({
      id: 'a-effect-id'
    })
    const effectResult = 'a-result'
    when(effectExecutor.exec)
      .calledWith(effectDescriptor)
      .mockResolvedValue(effectResult)
    let executionResult
    const effects = (function * () {
      executionResult = yield effectDescriptor
    }())

    await effectsRunner.run(
      effects
    )

    expect(executionResult).toEqual(effectResult)
  })

  it('should throw a InvalidEffectStreamError if the effect executor throws a UnableToExecuteEffectError', async () => {
    const effectDescriptor = EffectDescriptor.fromObject({
      id: 'a-effect-id'
    })
    when(effectExecutor.exec)
      .calledWith(effectDescriptor)
      .mockImplementationOnce(async () => {
        throw new UnableToExecuteEffectError()
      })
    const effects = (function * () {
      yield effectDescriptor
    }())

    const act = async () => effectsRunner.run(effects)

    await expect(act).rejects.toThrowWithMessage(InvalidEffectStreamError, 'The effect stream you are attempting to execute is invalid, please check your generator function.')
  })

  it('should throw back to the generator any error produced in the effect executor', async () => {
    const effectDescriptor = EffectDescriptor.fromObject({
      id: 'a-effect-id'
    })
    when(effectExecutor.exec)
      .calledWith(effectDescriptor)
      .mockImplementationOnce(async () => {
        throw new Error()
      })
    const effects = (function * () {
      yield effectDescriptor
    }())

    const act = async () => effectsRunner.run(effects)

    await expect(act).rejects.toThrowError()
  })
})

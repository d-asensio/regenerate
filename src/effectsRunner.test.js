import { when } from 'jest-when'
import { EffectDescriptor } from './effectDescriptor'
import { createEffectsRunner } from './effectsRunner'

const effectExecutor = {
  exec: jest.fn()
}

describe('run', () => {
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

  it('should pass the result of the effect executor back to the generator', () => {
    const effectsRunner = createEffectsRunner({ effectExecutor })

    const effectDescriptor = EffectDescriptor.fromObject({
      id: 'a-effect-id'
    })
    const effectResult = 'a-result'
    when(effectExecutor.exec)
      .calledWith(effectDescriptor)
      .mockReturnValue(effectResult)
    let executionResult
    const effects = (function * () {
      executionResult = yield effectDescriptor
    }())

    effectsRunner.run(
      effects
    )

    expect(executionResult).toEqual(effectResult)
  })

  it('should throw back to the generator any error produced in the effect executor', () => {
    const effectsRunner = createEffectsRunner({ effectExecutor })
    const effectDescriptor = EffectDescriptor.fromObject({
      id: 'a-effect-id'
    })
    when(effectExecutor.exec)
      .calledWith(effectDescriptor)
      .mockImplementationOnce(() => {
        throw new Error()
      })
    const effects = (function * () {
      yield effectDescriptor
    }())

    const act = () => {
      effectsRunner.run(
        effects
      )
    }

    expect(act).toThrowError()
  })
})

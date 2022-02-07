import { createEffectExecutor } from './effectExecutor'
import { EffectDescriptor } from './effectDescriptor'
import { when } from 'jest-when'

const effectRegistry = {
  getEffectById: jest.fn()
}

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
    const effectResult = 'a-result'
    const effectFn = () => effectResult
    when(effectRegistry.getEffectById)
      .calledWith(effectId)
      .mockReturnValue(effectFn)

    const result = effectExecutor.exec(effectDescriptor)

    expect(result).toBe(effectResult)
  })
})

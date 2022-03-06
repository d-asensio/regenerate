import { when } from 'jest-when'
import { createEffectExecutor, effectDescriptor, UnableToExecuteEffectError } from './effectExecutor'
import { EffectDescriptor } from './effectDescriptor'
import { NotRegisteredEffectError } from './effectRegistry'

const effectRegistry = {
  getEffectById: jest.fn()
}

describe('exec', () => {
  const effectExecutor = createEffectExecutor({ effectRegistry })

  it('should get an effect from the repository by id and execute it with the arguments provided by the descriptor', async () => {
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

    await effectExecutor.exec(effectDescriptor)

    expect(effectFn).toHaveBeenCalledWith(...effectArguments)
  })

  it('should return the effect result', async () => {
    const effectId = 'a-effect-id'
    const effectDescriptor = EffectDescriptor.fromObject({
      id: effectId
    })
    const effectResult = 'a-result'
    const effectFn = async () => effectResult
    when(effectRegistry.getEffectById)
      .calledWith(effectId)
      .mockReturnValue(effectFn)

    const result = await effectExecutor.exec(effectDescriptor)

    expect(result).toBe(effectResult)
  })

  it('should re-throw any error that is produced in the effect function', async () => {
    const effectId = 'a-effect-id'
    const effectDescriptor = EffectDescriptor.fromObject({
      id: effectId
    })
    const errorMessage = 'any-error-message'
    const effectFn = async () => { throw new Error(errorMessage) }
    when(effectRegistry.getEffectById)
      .calledWith(effectId)
      .mockReturnValue(effectFn)

    const act = async () => effectExecutor.exec(effectDescriptor)

    await expect(act).rejects.toThrowWithMessage(Error, errorMessage)
  })

  it('should throw a UnableToExecuteEffectError in case the registry throws a NotRegisteredEffectError', async () => {
    const effectId = 'a-effect-id'
    const effectDescriptor = EffectDescriptor.fromObject({
      id: effectId
    })
    when(effectRegistry.getEffectById)
      .calledWith(effectId)
      .mockImplementationOnce(() => {
        throw new NotRegisteredEffectError()
      })

    const act = async () => effectExecutor.exec(effectDescriptor)

    await expect(act).rejects.toThrowWithMessage(UnableToExecuteEffectError, `The effect identified by "${effectId}" is not registered and thus not executed.`)
  })
})

describe('execV2', () => {
  const effectExecutor = createEffectExecutor()

  it('should execute an effect descriptor function with its defined arguments', async () => {
    const fnMock = jest.fn()
    const fn = (...args) => fnMock(...args)
    const args = [
      'an-argument',
      'another-argument'
    ]
    const descriptor = effectDescriptor.create(fn, args)

    await effectExecutor.execV2(descriptor)

    expect(fnMock).toHaveBeenCalledWith(...args)
  })

  it('should execute an effect descriptor function without arguments', async () => {
    const fnMock = jest.fn()
    const fn = (...args) => fnMock(...args)
    const descriptor = effectDescriptor.create(fn)

    await effectExecutor.execV2(descriptor)

    expect(fnMock).toHaveBeenCalledWith()
  })

  it('should throw a UnableToExecuteEffectError in case the provided effect has no valid function', async () => {
    const invalidEffectDescriptor = effectDescriptor.create()

    const act = async () => effectExecutor.execV2(invalidEffectDescriptor)

    await expect(act).rejects.toThrowWithMessage(UnableToExecuteEffectError, 'The effect is not valid and thus not executed.')
  })

  it('should throw a UnableToExecuteEffectError in case the provided effect has no valid arguments', async () => {
    const fn = () => {}
    const args = 'invalid-arguments'
    const invalidEffectDescriptor = effectDescriptor.create(fn, args)

    const act = async () => effectExecutor.execV2(invalidEffectDescriptor)

    await expect(act).rejects.toThrowWithMessage(UnableToExecuteEffectError, 'The effect is not valid and thus not executed.')
  })
})

import { createEffectExecutor, UnableToExecuteEffectError } from './effectExecutor'
import { effectDescriptor } from './effectDescriptor'

describe('exec', () => {
  const effectExecutor = createEffectExecutor()

  it('should execute an effect descriptor function with its defined arguments', async () => {
    const fnMock = jest.fn()
    const fn = (...args) => fnMock(...args)
    const args = [
      'an-argument',
      'another-argument'
    ]
    const descriptor = effectDescriptor.create(fn, args)

    await effectExecutor.exec(descriptor)

    expect(fnMock).toHaveBeenCalledWith(...args)
  })

  it('should execute an effect descriptor function without arguments', async () => {
    const fnMock = jest.fn()
    const fn = (...args) => fnMock(...args)
    const descriptor = effectDescriptor.create(fn)

    await effectExecutor.exec(descriptor)

    expect(fnMock).toHaveBeenCalledWith()
  })

  it('should throw a UnableToExecuteEffectError in case the provided effect has no valid function', async () => {
    const invalidEffectDescriptor = effectDescriptor.create()

    const act = async () => effectExecutor.exec(invalidEffectDescriptor)

    await expect(act).rejects.toThrowWithMessage(UnableToExecuteEffectError, 'The effect is not valid and thus not executed.')
  })

  it('should throw a UnableToExecuteEffectError in case the provided effect has no valid arguments', async () => {
    const fn = () => {}
    const args = 'invalid-arguments'
    const invalidEffectDescriptor = effectDescriptor.create(fn, args)

    const act = async () => effectExecutor.exec(invalidEffectDescriptor)

    await expect(act).rejects.toThrowWithMessage(UnableToExecuteEffectError, 'The effect is not valid and thus not executed.')
  })
})

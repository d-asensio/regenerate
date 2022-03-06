import { exec, UnableToExecuteEffectError } from './executor'
import { create } from './descriptor'

describe('exec', () => {
  it('should execute an effect descriptor function with its defined arguments', async () => {
    const fnMock = jest.fn()
    const fn = (...args) => fnMock(...args)
    const args = [
      'an-argument',
      'another-argument'
    ]
    const descriptor = create(fn, args)

    await exec(descriptor)

    expect(fnMock).toHaveBeenCalledWith(...args)
  })

  it('should execute an effect descriptor function without arguments', async () => {
    const fnMock = jest.fn()
    const fn = (...args) => fnMock(...args)
    const descriptor = create(fn)

    await exec(descriptor)

    expect(fnMock).toHaveBeenCalledWith()
  })

  it('should throw a UnableToExecuteEffectError in case the provided effect has no valid function', async () => {
    const invalidEffectDescriptor = create()

    const act = async () => exec(invalidEffectDescriptor)

    await expect(act).rejects.toThrowWithMessage(UnableToExecuteEffectError, 'The effect is not valid and thus not executed.')
  })

  it('should throw a UnableToExecuteEffectError in case the provided effect has no valid arguments', async () => {
    const fn = () => {}
    const args = 'invalid-arguments'
    const invalidEffectDescriptor = create(fn, args)

    const act = async () => exec(invalidEffectDescriptor)

    await expect(act).rejects.toThrowWithMessage(UnableToExecuteEffectError, 'The effect is not valid and thus not executed.')
  })
})

import { effectDescriptor } from './effectDescriptor'

export function createEffectExecutor () {
  async function exec (descriptor) {
    if (!effectDescriptor.isValid(descriptor)) {
      throw new UnableToExecuteEffectError(
        'The effect is not valid and thus not executed.'
      )
    }

    const { fn, args } = descriptor

    return fn(...args)
  }

  return { exec }
}

export class UnableToExecuteEffectError extends Error {
  constructor (message) {
    super(message)
    this.name = 'UnableToExecuteEffectError'
  }
}

export default createEffectExecutor()

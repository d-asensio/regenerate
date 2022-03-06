import { isValid } from './descriptor'

export async function exec (descriptor) {
  if (!isValid(descriptor)) {
    throw new UnableToExecuteEffectError(
      'The effect is not valid and thus not executed.'
    )
  }

  const { fn, args } = descriptor

  return fn(...args)
}

export class UnableToExecuteEffectError extends Error {
  constructor (message) {
    super(message)
    this.name = 'UnableToExecuteEffectError'
  }
}

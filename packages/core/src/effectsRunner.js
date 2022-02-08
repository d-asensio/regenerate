import defaultEffectExecutor, { UnableToExecuteEffectError } from './effectExecutor'
import { EffectDescriptor } from './effectDescriptor'

export function createEffectsRunner (dependencies = {}) {
  const {
    effectExecutor = defaultEffectExecutor
  } = dependencies

  async function run (effectStream) {
    let iteratee = effectStream.next()

    do {
      const { value: effectDescriptor } = iteratee

      validEffectDescriptorOrThrow(effectDescriptor)

      try {
        const effectResult = await effectExecutor.exec(effectDescriptor)
        iteratee = effectStream.next(effectResult)
      } catch (e) {
        if (e instanceof UnableToExecuteEffectError) {
          throw new InvalidEffectStreamError('The effect stream you are attempting to execute is invalid, please check your generator function.')
        }

        iteratee = effectStream.throw(e)
      }
    } while (!iteratee.done)
  }

  function validEffectDescriptorOrThrow (effectDescriptor) {
    if (!EffectDescriptor.isValid(effectDescriptor)) {
      throw new InvalidEffectStreamError('Potential side effect detected! A generator can only yield valid effects.')
    }
  }

  return { run }
}

export class InvalidEffectStreamError extends Error {
  constructor (message) {
    super(message)
    this.name = 'InvalidEffectStreamError'
  }
}

export default createEffectsRunner()

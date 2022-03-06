import * as defaultExecutor from './executor'
import { UnableToExecuteEffectError } from './executor'

export function createRunner (dependencies = {}) {
  const {
    effectExecutor = defaultExecutor
  } = dependencies

  async function run (effectStream) {
    let iteratee = effectStream.next()

    do {
      const { value: effectDescriptor } = iteratee

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

  return { run }
}

export class InvalidEffectStreamError extends Error {
  constructor (message) {
    super(message)
    this.name = 'InvalidEffectStreamError'
  }
}

export default createRunner()

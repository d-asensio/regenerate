import defaultEffectRegistry, { NotRegisteredEffectError } from './effectRegistry'

export function createEffectExecutor (dependencies = {}) {
  const {
    effectRegistry = defaultEffectRegistry
  } = dependencies

  async function exec (effectDescriptor) {
    const { id, args } = effectDescriptor

    try {
      const effectFn = effectRegistry.getEffectById(id)

      return effectFn(...args)
    } catch (e) {
      if (e instanceof NotRegisteredEffectError) {
        throw new UnableToExecuteEffectError(
          `The effect identified by "${id}" is not registered and thus not executed.`
        )
      }

      throw e
    }
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

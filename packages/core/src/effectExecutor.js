import defaultEffectRegistry, { NotRegisteredEffectError } from './effectRegistry'

export const effectDescriptor = (function IIFE () {
  function create (fn, args = []) {
    return { fn, args }
  }

  function isValid (descriptor) {

  }

  return {
    create,
    isValid
  }
})()

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

  async function execV2 ({ fn, args }) {
    return fn(...args)
  }

  return { exec, execV2 }
}

export class UnableToExecuteEffectError extends Error {
  constructor (message) {
    super(message)
    this.name = 'UnableToExecuteEffectError'
  }
}

export default createEffectExecutor()

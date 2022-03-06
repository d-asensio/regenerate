import defaultEffectRegistry, { NotRegisteredEffectError } from './effectRegistry'

export const effectDescriptor = (function IIFE () {
  function create (fn, args = []) {
    return { fn, args }
  }

  function isValid ({ fn, args }) {
    return (
      fn instanceof Function &&
      args instanceof Array
    )
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

  async function execV2 (descriptor) {
    if (!effectDescriptor.isValid(descriptor)) {
      throw new UnableToExecuteEffectError(
        'The effect is not valid and thus not executed.'
      )
    }

    const { fn, args } = descriptor

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

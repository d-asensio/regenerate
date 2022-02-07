import { EffectDescriptor } from './effectDescriptor'

const defaultUniqueIdGenerator = Symbol
const defaultStorage = new Map()

export function createEffectRegistry (dependencies = {}) {
  const {
    uniqueIdGenerator = defaultUniqueIdGenerator,
    storage = defaultStorage
  } = dependencies

  function create (effectFn) {
    const id = uniqueIdGenerator(effectFn.name)
    storage.set(id, effectFn)

    return (...args) => EffectDescriptor.fromObject({ id, args })
  }

  function getEffectById (id) {
    effectExistsOrThrow(id)

    return storage.get(id)
  }

  function effectExistsOrThrow (id) {
    if (!storage.has(id)) {
      throw new NotRegisteredEffectError(`The effect identified by "${id}" is not registered`)
    }
  }

  return {
    create,
    getEffectById
  }
}

export class NotRegisteredEffectError extends Error {
  constructor (message) {
    super(message)
    this.name = 'NotRegisteredEffectError'
  }
}

export default createEffectRegistry()

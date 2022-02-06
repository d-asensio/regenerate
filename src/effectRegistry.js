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

    return (...args) => ({ id, args })
  }

  function getFnByDescriptor (descriptor) {
    validDescriptorOrThrow(descriptor)
    effectExistsOrThrow(descriptor.id)

    return storage.get(descriptor.id)
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

  function validDescriptorOrThrow (descriptor) {
    if (!descriptor?.id) {
      throw new MalformedEffectDescriptorError('Malformed effect descriptor, effect descriptors must contain an id')
    }
  }

  return {
    create,
    getFnByDescriptor,
    getEffectById
  }
}

export class NotRegisteredEffectError extends Error {
  constructor (message) {
    super(message)
    this.name = 'NotRegisteredEffectError'
  }
}

export class MalformedEffectDescriptorError extends Error {
  constructor (message) {
    super(message)
    this.name = 'MalformedEffectDescriptorError'
  }
}

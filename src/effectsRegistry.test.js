import { when } from 'jest-when'

const generator = {
  uniqueId: jest.fn()
}

const storage = {
  set: jest.fn(),
  get: jest.fn()
}

describe('register', () => {
  const effectRegistry = createEffectRegistry({ generator, storage })

  it('should save the effect function in the storage using the id provided by the unique id generator based on the effect function name', () => {
    const effectFn = function aEffectFunction () {}
    const effectUniqueId = 'a-unique-id'
    when(generator.uniqueId)
      .calledWith(effectFn.name)
      .mockReturnValue(effectUniqueId)

    effectRegistry.create(effectFn)

    expect(storage.set).toHaveBeenCalledWith(effectUniqueId, effectFn)
  })

  it('should return a factory function that generates an effect descriptor containing its id and all the arguments provided to the factory function', () => {
    const effectFn = function aEffectFunction () {}
    const effectUniqueId = 'a-unique-id'
    const effectArguments = [
      'an-argument',
      'another-argument'
    ]
    when(generator.uniqueId)
      .calledWith(effectFn.name)
      .mockReturnValue(effectUniqueId)

    const effectDescriptorFactory = effectRegistry.create(effectFn)

    expect(
      effectDescriptorFactory(...effectArguments)
    ).toStrictEqual({
      id: effectUniqueId,
      args: effectArguments
    })
  })
})

describe('getFnByDescriptor', () => {
  const effectRegistry = createEffectRegistry({ storage })

  it('should get the effect function from the storage by the effect descriptor', () => {
    const effectDescriptor = {
      id: 'a-effect-id',
      args: []
    }
    const effectFn = function aEffectFunction () {}
    when(storage.get)
      .calledWith(effectDescriptor)
      .mockReturnValue(effectFn)

    const result = effectRegistry.getFnByDescriptor(effectDescriptor)

    expect(result).toBe(effectFn)
  })
})

function createEffectRegistry (dependencies = {}) {
  const {
    generator,
    storage
  } = dependencies

  function create (effectFn) {
    const id = generator.uniqueId(effectFn.name)
    storage.set(id, effectFn)

    return (...args) => ({ id, args })
  }

  function getFnByDescriptor (id) {
    return storage.get(id)
  }

  return {
    create,
    getFnByDescriptor
  }
}

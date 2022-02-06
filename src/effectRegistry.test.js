import { when } from 'jest-when'
import { createEffectRegistry, NotRegisteredEffectError } from './effectRegistry'
import { EffectDescriptor } from './effectDescriptor'

const uniqueIdGenerator = jest.fn()

const storage = {
  set: jest.fn(),
  get: jest.fn(),
  has: jest.fn()
}

describe('register', () => {
  const effectRegistry = createEffectRegistry({ uniqueIdGenerator, storage })

  it('should save the effect function in the storage using the id provided by the unique id generator based on the effect function name', () => {
    const effectFn = function aEffectFunction () {}
    const effectUniqueId = 'a-unique-id'
    when(uniqueIdGenerator)
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
    when(uniqueIdGenerator)
      .calledWith(effectFn.name)
      .mockReturnValue(effectUniqueId)

    const effectDescriptorFactory = effectRegistry.create(effectFn)

    expect(
      effectDescriptorFactory(...effectArguments)
    ).toStrictEqual(
      EffectDescriptor.fromObject({
        id: effectUniqueId,
        args: effectArguments
      })
    )
  })
})

describe('getEffectById', () => {
  const effectRegistry = createEffectRegistry({ storage })

  it('should get the effect function from the storage by id', () => {
    const effectId = 'a-effect-id'
    const effectFn = function aEffectFunction () {}
    when(storage.has)
      .calledWith(effectId)
      .mockReturnValue(true)
    when(storage.get)
      .calledWith(effectId)
      .mockReturnValue(effectFn)

    const result = effectRegistry.getEffectById(effectId)

    expect(result).toBe(effectFn)
  })

  it('should throw a NotRegisteredEffectError error if the given id does not belong to any registered event', () => {
    const effectId = 'not-registered-effect-id'
    when(storage.has)
      .calledWith(effectId)
      .mockReturnValue(false)

    const doAct = () => effectRegistry.getEffectById(effectId)

    expect(doAct).toThrowWithMessage(
      NotRegisteredEffectError,
      `The effect identified by "${effectId}" is not registered`
    )
  })
})

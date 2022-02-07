import { EffectDescriptor } from './effectDescriptor'

describe('constructor', () => {
  it('should construct an EffectDescriptor with a effect id', () => {
    const effectId = 'an-effect-id'

    const effectDescriptor = new EffectDescriptor(effectId)

    expect(effectDescriptor.id).toBe(effectId)
  })

  it('should construct an EffectDescriptor with arguments', () => {
    const effectArguments = [
      'an-argument',
      'another-argument'
    ]

    const effectDescriptor = new EffectDescriptor('an-effect-id', effectArguments)

    expect(effectDescriptor.args).toStrictEqual(effectArguments)
  })

  it('should construct an EffectDescriptor defaulting to empty array of arguments if no arguments are provided', () => {
    const effectDescriptor = new EffectDescriptor('an-effect-id')

    expect(effectDescriptor.args).toStrictEqual([])
  })
})

describe('static fromObject', () => {
  it('should create a EffectDescriptor from an object containing id and arguments', () => {
    const descriptorObject = {
      id: 'an-effect-id',
      args: [
        'an-argument',
        'another-argument'
      ]
    }

    const effectDescriptor = EffectDescriptor.fromObject(descriptorObject)

    expect(effectDescriptor.id).toBe(descriptorObject.id)
    expect(effectDescriptor.args).toBe(descriptorObject.args)
  })
})

describe('static isValid', () => {
  it('should take as valid a correct instance of EffectDescriptor', () => {
    const effectDescriptor = new EffectDescriptor('an-effect-id')

    const isValid = EffectDescriptor.isValid(effectDescriptor)

    expect(isValid).toBeTrue()
  })

  it('should take as invalid a value that is not an EffectDescritor', () => {
    const isValid = EffectDescriptor.isValid({})

    expect(isValid).toBeFalse()
  })

  it('should take as invalid an EffectDescriptor that does not contain an id', () => {
    const effectDescriptor = new EffectDescriptor()

    const isValid = EffectDescriptor.isValid(effectDescriptor)

    expect(isValid).toBeFalse()
  })
})

describe('static toObject', () => {
  it('should transform a effect descriptor without arguments to an object', () => {
    const effectId = 'an-effect-id'
    const effectDescriptor = new EffectDescriptor('an-effect-id')

    const descriptorObject = EffectDescriptor.toObject(effectDescriptor)

    expect(descriptorObject).toStrictEqual({
      id: effectId,
      args: []
    })
  })
})

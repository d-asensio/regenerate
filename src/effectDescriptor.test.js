describe('constructor', () => {
  it('should construct an EffectDescriptor with a effect id', () => {
    const effectId = 'a-effect-id'

    const effectDescriptor = new EffectDescriptor(effectId)

    expect(effectDescriptor.id).toBe(effectId)
  })

  it('should construct an EffectDescriptor with arguments', () => {
    const effectArguments = [
      'an-argument',
      'another-argument'
    ]

    const effectDescriptor = new EffectDescriptor('a-effect-id', effectArguments)

    expect(effectDescriptor.args).toStrictEqual(effectArguments)
  })

  it('should construct an EffectDescriptor defaulting to empty array of arguments if no arguments are provided', () => {
    const effectDescriptor = new EffectDescriptor('a-effect-id')

    expect(effectDescriptor.args).toStrictEqual([])
  })
})

describe('static fromObject', () => {
  it('should create a EffectDescriptor from an object containing id and arguments', () => {
    const descriptorObject = {
      id: 'a-effect-id',
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
    const effectDescriptor = new EffectDescriptor('a-effect-id')

    const isValid = EffectDescriptor.isValid(effectDescriptor)

    expect(isValid).toBeTrue()
  })

  it('should take as invalid a value that is not an EffectDescritor', () => {
    const isValid = EffectDescriptor.isValid({})

    expect(isValid).toBeFalse()
  })
})

class EffectDescriptor {
  #id;
  #args;

  static fromObject ({ id, args }) {
    return new EffectDescriptor(id, args)
  }

  static isValid (effectDescriptor) {
    return effectDescriptor instanceof EffectDescriptor
  }

  constructor (id, args = []) {
    this.#id = id
    this.#args = args
  }

  get id () {
    return this.#id
  }

  get args () {
    return this.#args
  }
}

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

class EffectDescriptor {
  #id;
  #args;

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

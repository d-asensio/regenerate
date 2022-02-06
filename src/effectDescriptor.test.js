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

    expect(effectDescriptor.args).toBe(effectArguments)
  })
})

class EffectDescriptor {
  #id;
  #args;

  constructor (id, args) {
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

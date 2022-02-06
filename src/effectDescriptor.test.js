describe('constructor', () => {
  it('should construct an EffectDescriptor from and id', () => {
    const effectId = 'a-effect-id'

    const effectDescriptor = new EffectDescriptor(effectId)

    expect(effectDescriptor.id).toBe(effectId)
  })
})

class EffectDescriptor {
  #id;

  constructor (id) {
    this.#id = id
  }

  get id () {
    return this.#id
  }
}

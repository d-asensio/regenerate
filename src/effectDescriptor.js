export class EffectDescriptor {
  #id
  #args

  static fromObject ({ id, args }) {
    return new EffectDescriptor(id, args)
  }

  static isValid (effectDescriptor) {
    return (
      EffectDescriptor.#isValidInstance(effectDescriptor) &&
      EffectDescriptor.#containsEffectIdentifier(effectDescriptor)
    )
  }

  static #isValidInstance (effectDescriptor) {
    return effectDescriptor instanceof EffectDescriptor
  }

  static #containsEffectIdentifier (effectDescriptor) {
    return effectDescriptor.id !== undefined
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

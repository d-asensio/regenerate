import effectsRegistry from '../../src/effectRegistry'

export const store = new Map()

export default {
  get: effectsRegistry.create(store.get.bind(store)),
  set: effectsRegistry.create(store.set.bind(store)),
  select: effectsRegistry.create((selector, ...args) => {
    const state = Array.from(store).reduce((obj, [key, value]) => (
      Object.assign(obj, { [key]: value })
    ), {})

    return selector(state, ...args)
  })
}

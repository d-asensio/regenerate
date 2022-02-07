import effectsRegistry from '../../src/effectRegistry'

export const store = new Map()

export default {
  get: effectsRegistry.create(store.get.bind(store)),
  set: effectsRegistry.create(store.set.bind(store))
}

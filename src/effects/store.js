import effectsRegistry from '../effectsRegistry'

export const store = new Map()

export default {
  get: effectsRegistry.create(store.get.bind(store)),
  set: effectsRegistry.create(store.set.bind(store))
}

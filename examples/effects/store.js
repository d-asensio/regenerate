import { effectRegistry } from '@regenerate/core'

export const store = new Map()

export default {
  get: effectRegistry.create(store.get.bind(store)),
  set: effectRegistry.create(store.set.bind(store)),
  select: effectRegistry.create((selector, ...args) => {
    const state = Array.from(store).reduce((obj, [key, value]) => (
      Object.assign(obj, { [key]: value })
    ), {})

    return selector(state, ...args)
  })
}

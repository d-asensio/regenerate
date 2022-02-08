import { createEffect } from '@regenerate/core'

export const store = new Map()

export default {
  get: createEffect(store.get.bind(store)),
  set: createEffect(store.set.bind(store)),
  select: createEffect((selector, ...args) => {
    const state = Array.from(store).reduce((obj, [key, value]) => (
      Object.assign(obj, { [key]: value })
    ), {})

    return selector(state, ...args)
  })
}

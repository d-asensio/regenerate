import storeEffects from '../effects/store'

export function * incrementCounter ({ offset }) {
  const { counter } = yield storeEffects.get()
  yield storeEffects.set({ counter: counter + offset })
}

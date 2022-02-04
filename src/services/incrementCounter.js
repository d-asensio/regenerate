import storeEffects from "../effects/store";

export function * incrementCounter ({ offset }) {
  const currentCounterValue = yield storeEffects.get('counter')
  yield storeEffects.set('counter', currentCounterValue + offset)
}

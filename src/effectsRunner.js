import { createEffectExecutor } from './effectExecutor'

export function createEffectsRunner (dependencies = {}) {
  const {
    effectExecutor = createEffectExecutor()
  } = dependencies

  function run (effectStream) {
    let iteratee = effectStream.next()

    do {
      const { value: effectDescriptor } = iteratee

      try {
        const effectResult = effectExecutor.exec(effectDescriptor)
        iteratee = effectStream.next(effectResult)
      } catch (e) {
        iteratee = effectStream.throw(e)
      }
    } while (!iteratee.done)
  }

  return { run }
}

import effectsRegistry from './effectsRegistryDraft'

export function runEffects (effectsStream) {
  let iteratee = effectsStream.next()

  do {
    const { value: effectDescriptor } = iteratee

    const currentEffect = effectsRegistry.getById(effectDescriptor.id)

    if (!currentEffect) throw new Error('A unexpected effect was found in the event stream')

    try {
      const effectResult = currentEffect(...effectDescriptor.args)
      iteratee = effectsStream.next(effectResult)
    } catch (e) {
      // Wrap the produced error and give control to the event stream
      iteratee = effectsStream.throw('This is an error')
    }
  } while (!iteratee.done)
}

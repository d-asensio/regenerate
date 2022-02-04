import effectsRegistry from '../effectsRegistryDraft'

export default {
  throwErrorSometimes: effectsRegistry.create(
    () => {
      if (Math.random() > 0.5) throw new Error('Random error')
    }
  )
}

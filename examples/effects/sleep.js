import effectsRegistry from '../../src/effectRegistry'

export default {
  milliseconds: effectsRegistry.create(
    async (ms) => new Promise(
      resolve => setTimeout(resolve, ms)
    )
  )
}

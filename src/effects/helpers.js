import effectsRegistry from "../effectsRegistry";

export default {
  throwErrorSometimes: effectsRegistry.create(
    () => {
      if(Math.random() > 0.5) throw new Error('Random error')
    }
  )
}
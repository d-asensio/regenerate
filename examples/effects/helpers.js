import { effectRegistry } from '@regenerate/core'

export default {
  throwErrorSometimes: effectRegistry.create(
    () => {
      if (Math.random() > 0.5) throw new Error('Random error')
    }
  )
}

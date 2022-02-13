import { createEffect } from '@regenerate/core'

export default {
  throwErrorSometimes: createEffect(
    () => {
      if (Math.random() > 0.5) throw new Error('Random error')
    }
  )
}

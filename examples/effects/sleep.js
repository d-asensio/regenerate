import { createEffect } from '@regenerate/core'

export default {
  milliseconds: createEffect(
    async (ms) => new Promise(
      resolve => setTimeout(resolve, ms)
    )
  )
}

import { effectRegistry } from '@regenerate/core'

export default {
  milliseconds: effectRegistry.create(
    async (ms) => new Promise(
      resolve => setTimeout(resolve, ms)
    )
  )
}

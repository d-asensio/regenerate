import { createEffect } from '@regenerate/core'
import { createEnvEffect } from './effect'

export default function create (dependencies) {
  const effect = createEnvEffect(dependencies)
  return {
    get: createEffect(effect.get)
  }
}

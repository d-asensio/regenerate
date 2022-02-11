import { createEffect } from '@regenerate/core'
import { createEnvEffect } from './effect'

const effect = createEnvEffect()

export const env = {
  get: createEffect(effect.get)
}

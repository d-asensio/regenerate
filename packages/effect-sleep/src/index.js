import { createEffect } from '@regenerate/core'
import { createSleepEffect } from './effect'

const effect = createSleepEffect()

export const sleep = {
  milliseconds: createEffect(effect.milliseconds)
}

import { createEffect } from '@regenerate/core'
import { createZustandEffect } from './effect'

export default function create (dependencies) {
  const effect = createZustandEffect(dependencies)
  return {
    get: createEffect(effect.get),
    set: createEffect(effect.set),
    select: createEffect(effect.select)
  }
}

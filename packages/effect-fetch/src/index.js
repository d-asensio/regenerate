import { createEffect } from '@regenerate/core'
import { createFetchEffect } from './effect'

export default function create (dependencies) {
  const effect = createFetchEffect(dependencies)
  return {
    fetchJson: createEffect(effect.fetchJson)
  }
}

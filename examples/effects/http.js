import { createEffect } from '@regenerate/core'
import fetch from 'isomorphic-unfetch'

export default {
  fetchJSON: createEffect(
    async ({ url, method }) => {
      const response = await fetch(url, { method })
      return response.json()
    }
  )
}

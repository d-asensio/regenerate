import { effectRegistry } from '@regenerate/core'
import fetch from 'isomorphic-unfetch'

export default {
  fetchJSON: effectRegistry.create(
    async ({ url, method }) => {
      const response = await fetch(url, { method })
      return response.json()
    }
  )
}

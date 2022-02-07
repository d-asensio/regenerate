import fetch from 'isomorphic-unfetch'

import effectsRegistry from '../../src/effectRegistry'

export default {
  fetchJSON: effectsRegistry.create(
    async ({ url, method }) => {
      const response = await fetch(url, { method })
      return response.json()
    }
  )
}

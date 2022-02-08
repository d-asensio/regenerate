import { when } from 'jest-when'
import { createFetchEffect } from './effect'

const fetch = jest.fn()

describe('fetch', () => {
  const effect = createFetchEffect({ fetch })

  it('should defer execution to fetch dependency', async () => {
    const url = 'https://a.url.com'
    const options = {
      method: 'GET'
    }

    when(fetch)
      .mockResolvedValue({
        json: async () => ({})
      })

    await effect.fetchJson(url, options)

    expect(fetch).toHaveBeenCalledWith(url, options)
  })

  it('should return fetch result', async () => {
    const jsonResponse = {
      a: 'response'
    }

    when(fetch)
      .mockResolvedValue({
        json: async () => jsonResponse
      })

    const result = await effect.fetchJson()

    expect(result).toStrictEqual(jsonResponse)
  })
})

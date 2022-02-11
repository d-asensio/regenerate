import { createEnvEffect } from './effect'

describe('get', () => {
  it('should get a env variable by name', () => {
    const env = {
      A_ENV_VARIABLE: 'any value'
    }
    const effect = createEnvEffect({ env })

    const result = effect.get('A_ENV_VARIABLE')

    expect(result).toBe('any value')
  })

  it('should return undefined if the given variable name does not exist', () => {
    const env = {}
    const effect = createEnvEffect({ env })

    const result = effect.get('A_UNDEFINED_ENV_VARIABLE')

    expect(result).toBeUndefined()
  })
})

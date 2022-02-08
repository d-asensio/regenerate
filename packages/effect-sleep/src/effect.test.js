import { createSleepEffect } from './effect'

const timeout = jest.fn(async callback => callback())

describe('milliseconds', () => {
  const effect = createSleepEffect({ timeout })

  it('should sleep for the given amount of milliseconds', async () => {
    const milliseconds = 3

    await effect.milliseconds(milliseconds)

    expect(timeout).toHaveBeenCalledWith(expect.anything(), milliseconds)
  })
})

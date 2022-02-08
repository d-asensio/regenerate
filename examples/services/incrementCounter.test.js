import storeEffects from '../effects/store'

import { incrementCounter } from './incrementCounter'

it('should work', () => {
  expect(
    incrementCounter({
      offset: 2
    })
  ).toGenerateEffects([
    {
      effect: storeEffects.get(),
      returns: {
        counter: 1
      }
    },
    {
      effect: storeEffects.set({ counter: 3 })
    }
  ])
})

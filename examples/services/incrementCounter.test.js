import storeEffects from '../effects/store'

import { incrementCounter } from './incrementCounter'

it('should work', () => {
  expect(
    incrementCounter({
      offset: 2
    })
  ).toGenerateEffects([
    {
      effect: storeEffects.get('counter'),
      returns: 1
    },
    {
      effect: storeEffects.set('counter', 3)
    }
  ])
})

it('should fail', () => {
  expect(
    incrementCounter({
      offset: 2
    })
  ).toGenerateEffects([
    {
      effect: storeEffects.get('counter'),
      returns: 2
    },
    {
      // The final state of the counter is 4, so the test fails
      effect: storeEffects.set('counter', 3)
    }
  ])
})

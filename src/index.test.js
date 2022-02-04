const {storeEffects} = require("./regenerate");

test('custom matcher example (for jest)', () => {
  expect(
    incrementCounter({
      offset: 2
    })
  ).toGenerateEffects([
    {
      effect: storeEffects.get('counter'),
      value: 1
    },
    {
      effect: storeEffects.set('counter', 3)
    }
  ])
})

test('generate effects example', () => {
  const mockValues = [
    1,          // storeEffects.get
    undefined   // storeEffects.set
  ]

  const effects = generateEffectsWithMockValues(
    incrementCounter({
      offset: 2
    }),
    mockValues
  )

  expect(effects).toStrictEqual([
    storeEffects.get('counter'),
    storeEffects.set('counter', 3)
  ])
})
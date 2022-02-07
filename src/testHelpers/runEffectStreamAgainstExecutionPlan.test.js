import { EffectDescriptor } from '../effectDescriptor'

describe('runEffectStreamAgainstExecutionPlan', () => {
  it('should return an object having received descriptors from the effect stream and expected descriptors from the execution plan', () => {
    const firstReceivedEffectDescriptor = EffectDescriptor.fromObject({
      id: 'a-received-effect-id'
    })
    const secondReceivedEffectDescriptor = EffectDescriptor.fromObject({
      id: 'a-received-effect-id'
    })
    const firstExpectedEffectDescriptor = EffectDescriptor.fromObject({
      id: 'a-expected-effect-id'
    })
    const secondExpectedEffectDescriptor = EffectDescriptor.fromObject({
      id: 'another-expected-effect-id'
    })
    const effectStream = (function * () {
      yield firstReceivedEffectDescriptor
      yield secondReceivedEffectDescriptor
    }())
    const effectExecutionPlan = [
      {
        effect: firstExpectedEffectDescriptor
      },
      {
        effect: secondExpectedEffectDescriptor
      }
    ]

    const result = runEffectStreamAgainstExecutionPlanTest(effectStream, effectExecutionPlan)

    expect(result).toStrictEqual({
      expected: [
        EffectDescriptor.toObject(firstExpectedEffectDescriptor),
        EffectDescriptor.toObject(secondExpectedEffectDescriptor)
      ],
      received: [
        EffectDescriptor.toObject(firstReceivedEffectDescriptor),
        EffectDescriptor.toObject(secondReceivedEffectDescriptor)
      ]
    })
  })

  it('should pass back to the generator return values described in the execution plan', () => {
    const effectDescriptor = EffectDescriptor.fromObject({
      id: 'a-effect-id'
    })
    const expectedReturnValue = 'a-return-value'
    let receivedReturnValue
    const effectStream = (function * () {
      receivedReturnValue = yield effectDescriptor
    }())
    const effectExecutionPlan = [
      {
        effect: effectDescriptor,
        returns: expectedReturnValue
      }
    ]

    runEffectStreamAgainstExecutionPlanTest(effectStream, effectExecutionPlan)

    expect(receivedReturnValue).toBe(expectedReturnValue)
  })
})

function runEffectStreamAgainstExecutionPlanTest (effectIterator, executionPlan) {
  const executionPlanIterator = executionPlan[Symbol.iterator]()

  let effectIteratee = effectIterator.next()
  let executionRecipeIteratee = executionPlanIterator.next()

  const received = []
  const expected = []

  do {
    const { value: receivedEffect } = effectIteratee
    const { value: executionRecipe } = executionRecipeIteratee

    const { effect: expectedEffect, returns } = executionRecipe

    received.push(
      EffectDescriptor.toObject(receivedEffect)
    )
    expected.push(
      EffectDescriptor.toObject(expectedEffect)
    )

    effectIteratee = effectIterator.next(returns)
    executionRecipeIteratee = executionPlanIterator.next()
  } while (!effectIteratee.done && !executionRecipeIteratee.done)

  return {
    expected,
    received
  }
}

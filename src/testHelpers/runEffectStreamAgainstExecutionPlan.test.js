import { EffectDescriptor } from '../effectDescriptor'

describe('runEffectStreamAgainstExecutionPlan', () => {
  it('should return equal expected and received arrays given an stream of effects and its matching execution plan', () => {
    const firstEffectDescriptor = EffectDescriptor.fromObject({
      id: 'a-effect-id'
    })
    const secondEffectDescriptor = EffectDescriptor.fromObject({
      id: 'another-effect-id'
    })
    const effectStream = (function * () {
      yield firstEffectDescriptor
      yield secondEffectDescriptor
    }())
    const effectExecutionPlan = [
      {
        effect: firstEffectDescriptor
      },
      {
        effect: secondEffectDescriptor
      }
    ]

    const result = runEffectStreamAgainstExecutionPlanTest(effectStream, effectExecutionPlan)

    expect(result).toStrictEqual({
      expected: [
        EffectDescriptor.toObject(firstEffectDescriptor),
        EffectDescriptor.toObject(secondEffectDescriptor)
      ],
      received: [
        EffectDescriptor.toObject(firstEffectDescriptor),
        EffectDescriptor.toObject(secondEffectDescriptor)
      ]
    })
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

    const { effect: expectedEffect } = executionRecipe

    received.push(
      EffectDescriptor.toObject(receivedEffect)
    )
    expected.push(
      EffectDescriptor.toObject(expectedEffect)
    )

    effectIteratee = effectIterator.next()
    executionRecipeIteratee = executionPlanIterator.next()
  } while (!effectIteratee.done && !executionRecipeIteratee.done)

  return {
    expected,
    received
  }
}

import isEqual from 'lodash.isequal'

export function runEffectStreamAgainstExecutionPlan (effectIterator, executionPlan) {
  const executionPlanIterator = executionPlan[Symbol.iterator]()

  let effectIteratee = effectIterator.next()
  let executionRecipeIteratee = executionPlanIterator.next()

  const received = []
  const expected = []

  do {
    const { value: receivedEffect } = effectIteratee
    const { value: executionRecipe } = executionRecipeIteratee

    const { effect: expectedEffect, returns, throws } = executionRecipe

    if (returns && throws) {
      throw new Error('An effect recipe cannot contain both returns and throws values')
    }

    received.push(receivedEffect)
    expected.push(expectedEffect)

    if (!isEqual(receivedEffect, expectedEffect)) {
      break
    }

    effectIteratee = effectIterator.next(returns)

    if (throws) {
      effectIteratee = effectIterator.throw(throws)
    }

    executionRecipeIteratee = executionPlanIterator.next()
  } while (!effectIteratee.done && !executionRecipeIteratee.done)

  if (effectIteratee.done && !executionRecipeIteratee.done) {
    throw new Error('The execution plan cannot be larger than the effect stream')
  }

  if (!effectIteratee.done && executionRecipeIteratee.done) {
    throw new Error('The effect stream cannot be larger than the execution plan')
  }

  return {
    expected,
    received
  }
}

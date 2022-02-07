import { matcherHint, diff } from 'jest-matcher-utils'
import { runEffectStreamAgainstExecutionPlanTest } from '../../src/testHelpers/runEffectStreamAgainstExecutionPlanTest'
import isEqual from 'lodash.isequal'

const failMessage = (expected, received) => () => `${matcherHint(
  '.toGenerateEffects',
  'received',
  'expected'
)}

${diff(expected, received)}`

export function toGenerateEffects (effectStream, effectExecutionPlan) {
  try {
    const { expected, received } = runEffectStreamAgainstExecutionPlanTest(effectStream, effectExecutionPlan)

    if (!isEqual(expected, received)) {
      return {
        pass: false,
        message: failMessage(expected, received)
      }
    }

    return { pass: true }
  } catch (e) {
    return {
      pass: false,
      message: () => e.message
    }
  }
}

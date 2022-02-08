import { matcherHint, diff } from 'jest-matcher-utils'
import { runEffectStreamAgainstExecutionPlan } from '@regenerate/test-helpers'
import isEqual from 'lodash.isequal'

const failMessage = (expected, received) => () => `${matcherHint(
  '.toGenerateEffects',
  'received',
  'expected'
)}

${diff(expected, received)}`

export function toGenerateEffects (effectStream, effectExecutionPlan) {
  try {
    const { expected, received } = runEffectStreamAgainstExecutionPlan(effectStream, effectExecutionPlan)

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

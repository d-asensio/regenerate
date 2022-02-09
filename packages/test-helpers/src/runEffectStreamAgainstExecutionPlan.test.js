import { EffectDescriptor } from '@regenerate/core'
import { runEffectStreamAgainstExecutionPlan } from './runEffectStreamAgainstExecutionPlan'

/**
 * TODO:
 *  - Cover case: the stream is empty
 *  - Forgot to yield an effect
 */

describe('runEffectStreamAgainstExecutionPlan', () => {
  it('should return an object having received descriptors from the effect stream and expected descriptors from the execution plan', () => {
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

    const result = runEffectStreamAgainstExecutionPlan(effectStream, effectExecutionPlan)

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

  it('should stop execution after finding mismatching descriptors in the effect stream and the execution plan (using deep equality)', () => {
    const receivedEffectDescriptor = EffectDescriptor.fromObject({
      id: 'a-received-effect-id',
      args: [
        {
          a: {
            deep: 'value'
          }
        }
      ]
    })
    const expectedEffectDescriptor = EffectDescriptor.fromObject({
      id: 'a-received-effect-id',
      args: [
        {
          a: {
            deep: 'different value'
          }
        }
      ]
    })
    const unreachableEffectDescriptor = EffectDescriptor.fromObject({
      id: 'a-unreacahble-effect-id'
    })
    const effectStream = (function * () {
      yield receivedEffectDescriptor
      yield unreachableEffectDescriptor
    }())
    const effectExecutionPlan = [
      {
        effect: expectedEffectDescriptor
      },
      {
        effect: unreachableEffectDescriptor
      }
    ]

    const result = runEffectStreamAgainstExecutionPlan(effectStream, effectExecutionPlan)

    expect(result).toStrictEqual({
      expected: [
        EffectDescriptor.toObject(expectedEffectDescriptor)
      ],
      received: [
        EffectDescriptor.toObject(receivedEffectDescriptor)
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

    runEffectStreamAgainstExecutionPlan(effectStream, effectExecutionPlan)

    expect(receivedReturnValue).toBe(expectedReturnValue)
  })

  it('should throw back to the generator errors described in the execution plan', () => {
    const effectDescriptor = EffectDescriptor.fromObject({
      id: 'a-effect-id'
    })
    const expectedError = new Error()
    const effectStream = (function * () {
      yield effectDescriptor
    }())
    const effectExecutionPlan = [
      {
        effect: effectDescriptor,
        throws: expectedError
      }
    ]

    const act = () => runEffectStreamAgainstExecutionPlan(effectStream, effectExecutionPlan)

    expect(act).toThrow(expectedError)
  })

  it('should not allow execution plan recipes having both returns and throws values', () => {
    const effectDescriptor = EffectDescriptor.fromObject({
      id: 'a-effect-id'
    })
    const effectStream = (function * () {
      yield effectDescriptor
    }())
    const effectExecutionPlan = [
      {
        effect: effectDescriptor,
        returns: 'any-value',
        throws: new Error()
      }
    ]

    const act = () => runEffectStreamAgainstExecutionPlan(effectStream, effectExecutionPlan)

    expect(act).toThrowWithMessage(Error, 'An effect recipe cannot contain both returns and throws values')
  })

  it('should not allow the execution plan to be larger than the effect stream', () => {
    const firstEffectDescriptor = EffectDescriptor.fromObject({
      id: 'a-effect-id'
    })
    const secondEffectDescriptor = EffectDescriptor.fromObject({
      id: 'another-effect-id'
    })
    const effectStream = (function * () {
      yield firstEffectDescriptor
    }())
    const effectExecutionPlan = [
      {
        effect: firstEffectDescriptor
      },
      {
        effect: secondEffectDescriptor
      }
    ]

    const act = () => runEffectStreamAgainstExecutionPlan(effectStream, effectExecutionPlan)

    expect(act).toThrowWithMessage(Error, 'The execution plan cannot be larger than the effect stream')
  })

  it('should not allow the effect stream to be larger than the execution plan', () => {
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
      }
    ]

    const act = () => runEffectStreamAgainstExecutionPlan(effectStream, effectExecutionPlan)

    expect(act).toThrowWithMessage(Error, 'The effect stream cannot be larger than the execution plan')
  })
})

import { runEffectStreamAgainstExecutionPlan } from './runEffectStreamAgainstExecutionPlan'

/**
 * TODO:
 *  - Cover case: the stream is empty
 *  - Forgot to yield an effect
 */

describe('runEffectStreamAgainstExecutionPlan', () => {
  it('should return an object having received descriptors from the effect stream and expected descriptors from the execution plan', () => {
    const firstEffectDescriptor = 'any-effect-descriptor'
    const secondEffectDescriptor = 'any-other-effect-descriptor'
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
        firstEffectDescriptor,
        secondEffectDescriptor
      ],
      received: [
        firstEffectDescriptor,
        secondEffectDescriptor
      ]
    })
  })

  it('should stop execution after finding mismatching descriptors in the effect stream and the execution plan (using deep equality)', () => {
    const receivedEffectDescriptor = 'a-effect-descriptor'
    const expectedEffectDescriptor = 'a-expected-effect-descriptor'
    const unreachableEffectDescriptor = 'a-unreachable-effect-descriptor'
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
        expectedEffectDescriptor
      ],
      received: [
        receivedEffectDescriptor
      ]
    })
  })

  it('should pass back to the generator return values described in the execution plan', () => {
    const effectDescriptor = 'any-effect-descriptor'
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
    const effectDescriptor = 'any-effect-descriptor'
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
    const effectDescriptor = 'any-effect-descriptor'
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
    const firstEffectDescriptor = 'any-effect-descriptor'
    const secondEffectDescriptor = 'any-other-effect-descriptor'
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
    const firstEffectDescriptor = 'any-effect-descriptor'
    const secondEffectDescriptor = 'any-other-effect-descriptor'
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

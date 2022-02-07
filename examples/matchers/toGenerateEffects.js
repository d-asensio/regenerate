export function toGenerateEffects (receivedEffectStream, expectedEffectDescriptorsSequence) {
  let iteratee = receivedEffectStream.next()
  let iteration = 0

  do {
    const { value: effectDescriptor } = iteratee

    const expectedEffectDescriptor = expectedEffectDescriptorsSequence[iteration]

    expect({
      id: expectedEffectDescriptor.effect.id,
      args: expectedEffectDescriptor.effect.args
    }).toStrictEqual({
      id: effectDescriptor.id,
      args: effectDescriptor.args
    })

    const { throws, returns } = expectedEffectDescriptor

    if (throws && returns) {
      return {
        message: () => 'An effect cannot throw and return at the same time, check your effect descriptors',
        pass: false
      }
    }

    if (throws) {
      receivedEffectStream.throw(throws)
    }

    iteratee = receivedEffectStream.next(returns)
    iteration++
  } while (!iteratee.done)

  return { pass: true }
}

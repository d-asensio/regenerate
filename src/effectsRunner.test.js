import { when } from 'jest-when'

const effectRegistry = {
  getFnByDescriptor: jest.fn()
}

describe('run', () => {
  const effectsRunner = createEffectsRunner({ effectRegistry })

  it('should get the first effect function and execute it with the arguments provided by the effect descriptor', () => {
    const firstEffectArguments = [
      'an-argument',
      'another-argument'
    ]
    const firstEffectDescriptor = {
      id: 'a-effect-id',
      args: firstEffectArguments
    }
    const firstEffectFn = jest.fn()
    when(effectRegistry.getFnByDescriptor)
      .calledWith(firstEffectDescriptor)
      .mockReturnValue(firstEffectFn)
    const effects = (function * () {
      yield firstEffectDescriptor
    }())

    effectsRunner.run(
      effects
    )

    expect(firstEffectFn).toHaveBeenCalledWith(...firstEffectArguments)
  })
})

function createEffectsRunner (dependencies = {}) {
  const {
    effectRegistry
  } = dependencies

  function run (effectStream) {
    const iteratee = effectStream.next()

    const effectDescriptor = iteratee.value
    const effectFn = effectRegistry.getFnByDescriptor(effectDescriptor)

    effectFn(...effectDescriptor.args)
  }

  return { run }
}

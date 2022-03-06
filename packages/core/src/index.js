import effectsRunner from './effectsRunner'
import effectDescriptor from './effectDescriptor'

export const createEffect = (fn) => (...args) => effectDescriptor.create(fn, args)
export const run = effectsRunner.run

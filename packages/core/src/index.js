import runner from './runner'
import descriptor from './descriptor'

export const createEffect = (fn) => (...args) => descriptor.create(fn, args)
export const run = runner.run

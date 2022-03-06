import runner from './runner'
import { create } from './descriptor'

export const createEffect = (fn) => (...args) => create(fn, args)
export const run = runner.run

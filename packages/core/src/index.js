import effectRegistry from './effectRegistry'
import effectsRunner from './effectsRunner'

export * from './effectDescriptor'
export const createEffect = effectRegistry.create
export const run = effectsRunner.run

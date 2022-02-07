import * as jestExtendedMatchers from 'jest-extended';
import { toGenerateEffects } from '../examples/matchers/toGenerateEffects'

expect.extend({
  ...jestExtendedMatchers,
  toGenerateEffects,
})

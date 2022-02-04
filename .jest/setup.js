import * as jestExtendedMatchers from 'jest-extended';
import { toGenerateEffects } from '../src/matchers/toGenerateEffects'

expect.extend({
  ...jestExtendedMatchers,
  toGenerateEffects,
})

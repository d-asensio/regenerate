import * as jestExtendedMatchers from 'jest-extended';
import * as regenerateMatchers from '@regenerate/jest-matchers'

expect.extend({
  ...jestExtendedMatchers,
  ...regenerateMatchers
})

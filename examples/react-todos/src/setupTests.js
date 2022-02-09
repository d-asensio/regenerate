import * as regenerateMatchers from '@regenerate/jest-matchers'

expect.extend({
  ...regenerateMatchers
})

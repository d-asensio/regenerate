# @regenerate/test-helpers

Test helpers for regenerate.

```javascript
import { runEffectStreamAgainstExecutionPlan } from '@regenerate/test-helpers'

const { expected, received } = runEffectStreamAgainstExecutionPlan(effectStream, effectExecutionPlan)

expect(expected).toStrictEqual(received)
```

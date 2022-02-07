import { runEffects } from './runEffectsDraft'
import { store } from './effects/store'
import { incrementCounter } from './services/incrementCounter'
import { writeErrorToStore } from './services/writeErrorToStore'

// Initialize store
store.set('counter', 1)

// Example 1 getting and retrieving from store
runEffects(
  incrementCounter({ offset: 2 })
)

console.log('Counter value:', store.get('counter'))

// Example 2 reacting to errors
runEffects(
  writeErrorToStore()
)

console.log('Counter value:', store.get('errorMessage'))

// Example 3 async operations (TBD)

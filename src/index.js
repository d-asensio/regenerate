import { dispatch } from './regenerate'
import { store } from "./effects/store";
import { incrementCounter } from './services/incrementCounter'
import { writeErrorToStore } from './services/writeErrorToStore'

// Initialize store
store.set('counter', 1)

// Example 1 getting and retrieving from store
dispatch(
  incrementCounter({ offset: 2 })
)

console.log('Counter value:', store.get('counter'))

// Example 2 reacting to errors
dispatch(
  writeErrorToStore()
)

console.log('Counter value:', store.get('errorMessage'))

// Example 3 async operations (TBD)

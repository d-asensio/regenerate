import { dispatch } from './regenerate'
import storeEffects, { store } from "./effects/store";
import helperEffects from "./effects/helpers";

// Initialize store
store.set('counter', 1)

// Example 1 getting and retrieving from store
function * incrementCounter ({ offset }) {
  const currentCounterValue = yield storeEffects.get('counter')
  yield storeEffects.set('counter', currentCounterValue + offset)
}

dispatch(
  incrementCounter({ offset: 2 })
)

console.log('Counter value:', store.get('counter'))

// Example 2 reacting to errors
function * handleErrors () {
  try {
    yield helperEffects.throwErrorSometimes()
    yield storeEffects.set('errorMessage', 'No error :)')
  } catch {
    yield storeEffects.set('errorMessage', 'Oops! An error was found :(')
  }
}

dispatch(
  handleErrors()
)

console.log('Counter value:', store.get('errorMessage'))

// Example 3 async operations (TBD)

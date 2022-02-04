const { store, dispatch, storeEffects, helperEffects } = require('./regenerate')

// Initialize store

store.set('counter', 1)

// Example 1 getting and retrieving from store

function * incrementCounter ({ offset }) {
  const currentCounterValue = yield storeEffects.get('counter')
  yield storeEffects.set('counter', currentCounterValue + offset)
}


dispatch(incrementCounter, { offset: 2 })

console.log('Counter value:', store.get('counter'))

// Example 2 reacting to errors

function * handleErrors ({ offset }) {
  try {
    yield helperEffects.throwErrorSometimes()
    yield storeEffects.set('errorMessage', 'No error :)')
  } catch {
    yield storeEffects.set('errorMessage', 'Oops! An error was found :(')
  }
}


dispatch(handleErrors, { offset: 2 })

console.log('Counter value:', store.get('errorMessage'))

// Example 3 async operations (TBD)

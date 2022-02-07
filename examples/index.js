import effectsRunner from '../src/effectsRunner'
import { store } from './effects/store'
import { incrementCounter } from './services/incrementCounter'
import { writeErrorToStore } from './services/writeErrorToStore'
import { fetchAndSavePosts } from './services/fetchAndSavePosts'

// Initialize store
store.set('counter', 1)
store.set('users', {
  'user-1': {
    id: 'user-1',
    name: 'Pepito',
    wait: 1000
  }
})

;(async function () {
  // Example 1 getting and retrieving from store
  await effectsRunner.run(
    incrementCounter({ offset: 2 })
  )

  console.log('Counter value:', store.get('counter'))

  // Example 2 reacting to errors
  await effectsRunner.run(
    writeErrorToStore()
  )

  console.log('Counter value:', store.get('errorMessage'))

  // Example 3 async operations (TBD)

  await effectsRunner.run(
    fetchAndSavePosts({ path: '/posts', userId: 'user-1' })
  )

  console.log('Posts', store.get('posts'))
})()

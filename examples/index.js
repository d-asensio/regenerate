import { run } from '@regenerate/core'

import { store } from './effects/store'
import { incrementCounter } from './services/incrementCounter'
import { writeErrorToStore } from './services/writeErrorToStore'
import { fetchAndSavePosts } from './services/fetchAndSavePosts'

// Initialize store
store.setState({
  counter: 1,
  users: {
    'user-1': {
      id: 'user-1',
      name: 'Pepito',
      wait: 1000
    }
  }
})

;(async function () {
  // Example 1 getting and retrieving from store
  await run(
    incrementCounter({ offset: 2 })
  )

  console.log(store.getState())

  // Example 2 reacting to errors
  await run(
    writeErrorToStore()
  )

  console.log(store.getState())

  // Example 3 async operations (TBD)
  await run(
    fetchAndSavePosts({ path: '/posts', userId: 'user-1' })
  )

  console.log(store.getState())
})()

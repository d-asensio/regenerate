import http from '../effects/http'
import store from '../effects/store'
import sleep from '../effects/sleep'
import { getUserSelector } from '../selectors/user'

export function * fetchAndSavePosts ({ path, userId }) {
  try {
    const posts = yield http.fetchJSON({
      url: `https://jsonplaceholder.typicode.com${path}`,
      method: 'GET'
    })

    const user = yield store.select(getUserSelector, userId)

    yield sleep.milliseconds(user.wait)

    yield store.set({ posts })
  } catch {
    yield store.set({ posts: [] })
  }
}

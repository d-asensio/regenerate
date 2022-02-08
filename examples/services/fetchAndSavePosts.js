import http from '../effects/http'
import store from '../effects/store'
import sleep from '../effects/sleep'
import { getUserSelector } from '../selectors/user'

export function * fetchAndSavePosts ({ path, userId }) {
  try {
    const posts = yield http.fetchJson(`https://jsonplaceholder.typicode.com${path}`)

    const user = yield store.select(getUserSelector, userId)

    yield sleep.milliseconds(user.wait)

    yield store.set({ posts })
  } catch (e) {
    yield store.set({ posts: [] })
  }
}

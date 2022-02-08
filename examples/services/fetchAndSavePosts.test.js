import { sleep } from '@regenerate/effect-sleep'
import http from '../effects/http'
import store from '../effects/store'
import { fetchAndSavePosts } from './fetchAndSavePosts'
import { getUserSelector } from '../selectors/user'

describe('fetchAndSavePosts', () => {
  it('should fetch posts and save them into the store', () => {
    const posts = [
      {
        id: 1,
        title: 'Post 1'
      },
      {
        id: 2,
        title: 'Post 2'
      }
    ]

    expect(
      fetchAndSavePosts({
        path: '/posts',
        userId: 'an-id'
      })
    ).toGenerateEffects([
      {
        effect: http.fetchJson('https://jsonplaceholder.typicode.com/posts'),
        returns: posts
      },
      {
        effect: store.select(getUserSelector, 'an-id'),
        returns: {
          id: 'an-id',
          name: 'Pepe',
          wait: 3000
        }
      },
      {
        effect: sleep.milliseconds(3000)
      },
      {
        effect: store.set({ posts })
      }
    ])
  })

  it('should save an empty array into the store in case posts api call fails', () => {
    expect(
      fetchAndSavePosts({
        path: '/posts'
      })
    ).toGenerateEffects([
      {
        effect: http.fetchJson('https://jsonplaceholder.typicode.com/posts'),
        throws: new Error()
      },
      {
        effect: store.set({ posts: [] })
      }
    ])
  })
})

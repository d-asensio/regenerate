import http from '../effects/http'
import store from '../effects/store'
import { fetchAndSavePosts } from './fetchAndSavePosts'
import sleep from '../effects/sleep'
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
        effect: http.fetchJSON({
          url: 'https://jsonplaceholder.typicode.com/posts',
          method: 'GET'
        }),
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
        effect: store.set('posts', posts)
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
        effect: http.fetchJSON({
          url: 'https://jsonplaceholder.typicode.com/posts',
          method: 'GET'
        }),
        throws: new Error()
      },
      {
        effect: store.set('posts', [])
      }
    ])
  })
})

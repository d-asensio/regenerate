# @regenerate/effect-fetch

Regenerate effect to use fetch-like requests

## Installation

```bash
# Using yarn
yarn add @regenerate/effect-fetch

# Using npm
npm i @regenerate/effect-fetch
```

## Set up

Create a `src/effects/http.js` file in your project with the following content:

```javascript
import createFetchEffect from '@regenerate/effect-fetch'

// You can use any module that is compliant with the fetch API
import fetch from 'isomorphic-unfetch'

export default createFetchEffect({ fetch })

```

## Usage

It can be used like the [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/fetch)

```javascript
function * fetchTodos () {
  const todos = yield http.fetchJson(
    'http://api.url/todos',
    {
      method: 'GET'
      /* fetch options */
    }
  )
  // Rest of effects
}
```

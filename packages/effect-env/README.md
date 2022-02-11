# @regenerate/effect-env

Regenerate effect to access environment variables

## Installation

```bash
# Using yarn
yarn add @regenerate/effect-env

# Using npm
npm i @regenerate/effect-env
```

## Set up

Create a `src/effects/env.js` file in your project with the following content:

```javascript
import createEnvEffect from '@regenerate/effect-env'

export default createEnvEffect()
```

By default `@regenerate/effect-env` will use the variables available in `process.env` but alternatively you can provide any desired variable when creating it:

```javascript
import createEnvEffect from '@regenerate/effect-env'

const env = {
  A_VARIABLE: 'a value',
  ANOTHER_VARIABLE: 'another value'
}

export default createEnvEffect({ env })
```

## Usage

```javascript
function * fetchTodos () {
  const apiBaseUrl = yield env.get('API_BASE_URL')
  // Rest of effects
}
```
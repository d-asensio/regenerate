# Regenerate

A tiny module to manage side effects in a declarative way, with testability and ergonomics in mind.

## Quick introduction

Side effects are sometimes difficult to test. It's common to end up mocking a lot of infrastructure pieces (HTTP calls, browser API's, etc.) to test them, and this makes tests to become tedious and difficult to understand.

Regenerate aims to make it very easy to implement and test side effects. It is inspired by [reffects](https://github.com/trovit/reffects), [re-frame](https://github.com/day8/re-frame) and [redux-saga](https://github.com/redux-saga/redux-saga) but tries to improve on them by applying some learnings and insights that we gathered over the years.

To illustrate that, let's see an example, it should not need more explanation than the code itself:

**Definition:**
```js
function * fetchProducts () {
  try {
    const products = yield http.fetch('https:/api.company.com/products')
    
    yield store.set({
      products
    })
  } catch {
    yield store.set({
      products: []
    })
  }
}
```

**Testing:**
```js
it('should fetch and store products', () => {
  const products = [
    {
      id: 'product-1',
      name: 'Piece of cake'
    }
  ]
  
  expect(
    fetchProducts()
  ).toGenerateEffects([
    {
      effect: yield http.fetch('https:/api.company.com/products'),
      returns: products
    },
    {
      effect: store.set({ products })
    }
  ])
})

it('should store empty array if the products API fails', () => {
  expect(
    fetchProducts()
  ).toGenerateEffects([
    {
      effect: yield http.fetch('https:/api.company.com/products'),
      throws: new HttpError()
    },
    {
      effect: store.set({ products: [] })
    }
  ])
})
```

**Execution:**
```js
run(
  fetchProducts()
)
```

## Installation

Regenerate is composed by various modules, to start using it you'll need to install its core using your dependency manager of choice:

**Using yarn:**
```bash
yarn add @regenerate/core
```

**Using npm:**
```bash
npm i @regenerate/core
```

## Set up

## Documentation

### Creating new effects

## Prior art

export function createZustandEffect (dependencies = {}) {
  const {
    store
  } = dependencies

  function get () {
    return store.getState()
  }

  function set (state) {
    store.setState(state)
  }

  function select (selectorFn, ...args) {
    const state = store.getState()

    return selectorFn(state, ...args)
  }

  function mutate (mutationFn, ...args) {
    const state = store.getState()

    const newState = mutationFn(state, ...args)

    store.setState(newState)
  }

  return {
    get,
    set,
    select,
    mutate
  }
}

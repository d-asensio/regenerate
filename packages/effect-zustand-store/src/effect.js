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

    selectorFn(state, ...args)
  }

  return {
    get,
    set,
    select
  }
}

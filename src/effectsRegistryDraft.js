function createEffectsRegistry () {
  const effects = new Map()

  function create (effectFn) {
    const id = Symbol(effectFn.name)
    effects.set(id, effectFn)

    return (...args) => ({ id, args })
  }

  function getById (id) {
    return effects.get(id) ?? null
  }

  return {
    create,
    getById
  }
}

export default createEffectsRegistry()

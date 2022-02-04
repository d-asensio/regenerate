// Effect registry
const effects = new Map()

function createEffect(effectFn) {
  const id = Symbol(effectFn.name)
  effects.set(id, effectFn)

  return (...arguments) => ({ id, arguments })
}

function getEffectById(id) {
  return effects.get(id) ?? null
}

// Simple store effects definition
const store = new Map()

const storeEffects = {
  get: createEffect(store.get.bind(store)),
  set: createEffect(store.set.bind(store))
}

// Effect that errors definition
const helperEffects = {
  throwErrorSometimes: createEffect(
    () => {
      if(Math.random() > 0.5) throw new Error('Random error')
    }
  ),
}

// Event dispatcher
function dispatch (effectsStream) {
  let iteratee = effectsStream.next()

  do {
    const { value: effectDescriptor } = iteratee

    const currentEffect = getEffectById(effectDescriptor.id)

    if (!currentEffect) throw new Error("A unespected effect was found in the event stream")

    try {
      const effectResult = currentEffect(...effectDescriptor.arguments)
      iteratee = effectsStream.next(effectResult)
    } catch (e) {
      // Wrap the produced error and give control to the event stream
      iteratee = effectsStream.throw('This is an error')
    }
  } while(!iteratee.done)
}

module.exports = { store, dispatch, storeEffects, helperEffects }

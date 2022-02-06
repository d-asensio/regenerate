export function createEffectExecutor (dependencies = {}) {
  const {
    effectRegistry
  } = dependencies

  function exec (effectDescriptor) {
    const { id, args } = effectDescriptor
    const effectFn = effectRegistry.getEffectById(id)

    return effectFn(...args)
  }

  return { exec }
}

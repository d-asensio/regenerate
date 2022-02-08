export function createSleepEffect (dependencies = {}) {
  const {
    timeout = setTimeout
  } = dependencies

  function milliseconds (ms) {
    return new Promise(resolve => timeout(resolve, ms))
  }

  return {
    milliseconds
  }
}

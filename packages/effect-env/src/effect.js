export function createEnvEffect (dependencies = {}) {
  const {
    env = process.env
  } = dependencies

  function get (variableName) {
    return env[variableName]
  }

  return {
    get
  }
}

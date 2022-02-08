export function createFetchEffect (dependencies = {}) {
  const {
    fetch
  } = dependencies

  async function fetchJson (...args) {
    const response = await fetch(...args)
    return response.json()
  }

  return {
    fetchJson
  }
}

const effectDescriptor = (function IIFE () {
  function create (fn, args = []) {
    return { fn, args }
  }

  function isValid ({ fn, args }) {
    return (
      fn instanceof Function &&
      args instanceof Array
    )
  }

  return {
    create,
    isValid
  }
})()

export default effectDescriptor

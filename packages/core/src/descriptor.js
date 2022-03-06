export function create (fn, args = []) {
  return { fn, args }
}

export function isValid ({ fn, args }) {
  return (
    fn instanceof Function &&
    args instanceof Array
  )
}

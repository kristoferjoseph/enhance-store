const _state = {}
const dirtyProps = []
const listeners = []
const set = window &&
  window.requestAnimationFrame
    ? window.requestAnimationFrame
    : setTimeout
const cancel = window &&
  window.cancelAnimationFrame
  ? window.cancelAnimationFrame
  : clearTimeout
let timeout
const handler = {
  set: function(obj, prop, value) {
    let oldValue = obj[prop]
    if (oldValue !== value) {
      obj[prop] = value
      dirtyProps.push(prop)
      timeout && cancel(timeout)
      timeout = set(notify)
    }

    return true
  }
}

const store = new Proxy(_state, handler)

function merge (o, n) {
  for (let prop in n) {
    o[prop] = n[prop]
  }
}

/**
 * Function for subscribing to state updates.
 * @param {function} fn - function to be called when state changes
 * @param {array} props - list props to listen to for changes
 * @return {number} returns current number of listeners
 */
const subscribe = (fn, props) => {
  fn.observedProperties = props || []
  return listeners.push(fn)
}

/**
 * Function for unsubscribing from state updates.
 * @param {function} fn - function to unsubscribe from state updates
 *
 */
const unsubscribe = (fn) => {
  return listeners.splice(listeners.indexOf(fn), 1)
}

function notify() {
  listeners.forEach(fn => {
    let props = fn.observedProperties
    let payload = props.length
      ? dirtyProps
          .filter(key => props.includes(key))
          .reduce((obj, key) => {
            return {
              ...obj,
              [key]: _state[key]
            }
        }, {})
      : _state
    fn(payload)
  })
  dirtyProps.length = 0
}

_state.subscribe = subscribe
_state.unsubscribe = unsubscribe
/**
 * Proxy store for inner state management.
 */
export default function Store(initialState) {
  if (initialState) {
    merge(_state, initialState)
  }
  return store
}

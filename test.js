import {
  assert,
  assertExists,
  assertEquals,
  assertObjectMatch
} from 'https://deno.land/std@0.79.0/testing/asserts.ts'
import Store from './store.js'
const test = Deno.test

test('Store', ()=> {
  assertExists(Store, 'exists')
})

test('subscribe', ()=> {
  const store = Store()
  assertExists(store.subscribe, 'exists')
})

test('unsubscribe', ()=> {
  const store = Store()
  assertExists(store.unsubscribe, 'exists')
})

test('should initialize with initialState', ()=> {
  const initialState = {
    a: 1,
    b: 2
  }
  const store = Store(initialState)
  assertExists(store)
  assertEquals(store.a, initialState.a, 'stored a')
  assertEquals(store.b, initialState.b, 'stored b')
})

test('should subscribe listener', ()=> {
  const store = Store()
  const listener = state => {
    assert(state)
    store.unsubscribe(listener)
  }
  store.subscribe(listener, ['a'])
  store.a = 5
})

test('should unsubscribe listener', ()=> {
  const store = Store()
  const listener = ()=> {
    assert(false, 'THIS SHOULD NOT BE CALLED IF UNSUBSCRIBED!')
  }

  store.subscribe(listener)
  store.unsubscribe(listener)
  store.a = 8
  assert(true, 'unsubscribed')
})

test('should update listener with state changed.', ()=> {

  let initialState = {
    a: 1,
    b: 2
  }
  const store = Store(initialState)
  const listener = state => {
    assertObjectMatch(state, { a: 5, b: 2 })
  }
  store.subscribe(listener)
  store.a = 5
})

test('should update listener with specific state changes.', ()=> {

  const initialState = { a: 5, b: 2 , c: 66, d: 51 }
  const listener = state => {
    assert(!state.hasOwnProperty('d'), 'should not have d in payload')
    assert(!state.hasOwnProperty('b'), 'should not have b in payload')
    assertObjectMatch(state, { c: 33 }, JSON.stringify(state))
  }
  const store = Store(initialState)
  store.subscribe(listener, ['a', 'c'])
  store.c = 33
})

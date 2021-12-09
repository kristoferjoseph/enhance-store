# store
Simple store.

## Usage
```javascript
import Store from 'https://unpkg.com/@begin/store'
// Initialize the store ( you can pass an initial state object )
const store = Store({ lyrics: 'Yah yah yah, yah, yah' })
// or
store.initialize({ lyrics: 'Yah yah yah, yah, yah' })
// Subscribe to the store by passing the function you want to be called when state changes
// Pass an array of keys you want to be notified about when they change
store.subscribe(update, [ 'lyrics' ])
store.lyrics = 'Woo hah, I got you all in check!'
function update(state) {
  console.log(state) // { lyrics: 'Woo hah, I got you all in check!' }
}
// clean up later with store.unsubscribe(update)
```

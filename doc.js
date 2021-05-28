export default function doc() {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Proxy Store</title>
  <link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2016%2016'%3E%3Ctext%20x='0'%20y='14'%20style=''%3E💀%3C/text%3E%3C/svg%3E" type="image/svg+xml" />
</head>
<body>
  <h1>YOLO</h1>
  <script type=module>
    import Store from './store.js'
    let store = Store({ One: 1, app: { status: 'go' }})
    const listener = state => console.log('STUFF: ', JSON.stringify(state, null, 2))
    store.subscribe(listener, ['app'])
    store.app = { status: 'nope' }
    console.log('actual', store.app.status)
  </script>
</body>
</html>
`
}

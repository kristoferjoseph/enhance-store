import { serve } from "https://deno.land/std@0.95.0/http/server.ts";
import doc from "./doc.js"
const port = 6661
const server = serve({ port })
console.log(`Serving on http://localhost:${port}`)
  const headers = new Headers()
  headers.set('cache-control', 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0')

for await(const request of server) {
  const url = request.url
  const isJS = /\.js/.test(url)
  if (isJS) {
    headers.set('content-type', 'application/javascript; charset=utf8')
    const body = await Deno.readTextFile(url.replace('/', './'))
    request.respond({
      status: 200,
      headers,
      body
    })
  } else {
    headers.set('content-type', 'text/html; charset=utf8')
    request.respond({
      status: 200,
      headers,
      body: doc()
    })
  }
}

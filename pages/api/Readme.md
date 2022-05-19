Any file inside the folder `pages/api` is mapped to `/api/*` and will be treated as an API endpoint instead of a `page`. They are server-side only bundles and won't increase your client-side bundle size.

So we need a API page for every endpoint.

// Which HTTP requests are needed?

/api/items/ (GET) get all items loaded onto the map

api/user

// Either we have an array of objects which include all items, or we have one for swap and one for free

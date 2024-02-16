export const onRequest: MiddlewareResponseHandler = async (
  { request, redirect },
  next
) => {
  //   const url = new URL(request.url)

  //   if (skipMiddleware(url.pathname)) {
  //     return next()
  //   }

  return next()
}

const passthroughRoutes = [`/api`]
function skipMiddleware(urlPathname: string) {
  let shouldSkip = false
  for (const route of passthroughRoutes) {
    if (urlPathname.startsWith(route)) {
      shouldSkip = true
      break
    }
  }
  return shouldSkip
}

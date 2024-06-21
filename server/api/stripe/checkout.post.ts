import { initCheckout } from './checkoutService'

export default defineEventHandler(async (event): Promise<string | void> => {
  const requestOrigin = getRequestHeader(event, 'origin')

  if (requestOrigin === undefined) {
    return setResponseStatus(event, 400)
  }

  const checkoutOptions = await readBody(event)

  return await initCheckout({ requestOrigin, checkoutOptions })
})

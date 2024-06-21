import Stripe from 'stripe'
import logger from '~/utils/logger'

type StripeWebhookServiceQuery = {
  rawEvent: string
  stripeSignatureHeader: string
}

export type StripeWebhookServiceResponse = {
  received: boolean
}

const { payment } = useRuntimeConfig()
const stripe = new Stripe(payment.stripe.secretKey)

export async function handleWebhook({
  rawEvent,
  stripeSignatureHeader,
}: StripeWebhookServiceQuery): Promise<StripeWebhookServiceResponse> {
  const event = getVerifiedEvent(rawEvent, stripeSignatureHeader)

  if (event.type === 'checkout.session.completed') {
    const eventData = event.data.object

    const session = await stripe.customers.retrieve(eventData.id, {
      expand: ['line_items'],
    })
  }

  return { received: true }
}

function getVerifiedEvent(rawEvent: string, stripeSignatureHeader: string): Stripe.Event {
  const whsec = payment.stripe.whsec

  try {
    return stripe.webhooks.constructEvent(rawEvent, stripeSignatureHeader, whsec)
  } catch (err) {
    throw logger.error('Stripe event could not be verified', 'StripeWebhookService - getVerifiedEvent', {
      error: err,
    })
  }
}

import Stripe from 'stripe'
import logger from '~/utils/logger'
import { getProductDetails } from './productData'

type StripeCheckoutQuery = {
  requestOrigin: string
  checkoutOptions: {
    priceId: string
    isAddressRequired?: boolean
    allowPromotionCodes?: boolean
    additionalData: Record<string, string>
  }
}

const { payment } = useRuntimeConfig()
const stripe = new Stripe(payment.stripe.secretKey)

export async function initCheckout(query: StripeCheckoutQuery): Promise<string> {
  const { priceId, isAddressRequired = false, allowPromotionCodes = false, additionalData } = query.checkoutOptions

  const { isMetered, mode } = getProductDetails(priceId)

  const successUrl = query.requestOrigin + '/checkout/success'
  const cancelUrl = query.requestOrigin

  try {
    const item: Stripe.Checkout.SessionCreateParams.LineItem = {
      price: priceId,
    }

    if (!isMetered) {
      item.quantity = 1
    }

    const sessionOptions: Stripe.Checkout.SessionCreateParams = {
      line_items: [item],
      mode,
      success_url: successUrl,
      cancel_url: cancelUrl,
      payment_method_types: [
        // TODO add your own payment methods here. Make sure to activate them in Stripe Settings
        'paypal',
        'card',
      ],
    }

    if (isAddressRequired) {
      sessionOptions.billing_address_collection = 'required'
    }

    if (allowPromotionCodes) {
      sessionOptions.allow_promotion_codes = true
    }

    if (additionalData) {
      sessionOptions.metadata = additionalData
    }

    const session = await stripe.checkout.sessions.create(sessionOptions)

    if (!session.url) {
      throw logger.error('Unable to find stripe session url', 'StripeCheckoutService')
    }

    return session.url
  } catch (e) {
    logger.error(e, 'StripeCheckoutService')
    return '/checkout/error'
  }
}

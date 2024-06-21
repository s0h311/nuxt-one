import { timestamp, text, pgSchema, pgEnum } from 'drizzle-orm/pg-core'

const publicSchema = pgSchema('public')

export const subscription = publicSchema.table('subscription', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id'),
  createdAt: timestamp('created_ad', {
    mode: 'date',
    precision: 2,
    withTimezone: true,
  }).defaultNow(),
  lastPaymentAt: timestamp('last_payment_at', {
    mode: 'date',
    precision: 2,
    withTimezone: true,
  }),
  type: pgEnum('subscription_type', [
    // TODO add your own subscription types here
    'free',
    'premium',
  ])('type'),
  paymentPeriod: pgEnum('payment_period', [
    // TODO add your own payment periods here
    'monthly',
    'yearly',
    'lifetime',
  ])('payment_period'),
})

export type Subscription = typeof subscription.$inferSelect

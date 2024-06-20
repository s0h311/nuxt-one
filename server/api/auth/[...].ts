import { NuxtAuthHandler } from '#auth'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import GithubProvider from 'next-auth/providers/github'
import { db } from '~/server/database/client'
import { accounts, authenticators, sessions, users, verificationTokens } from '~/server/database/schemas/auth'

const { auth } = useRuntimeConfig()

export default NuxtAuthHandler({
  secret: auth.secret,
  // @ts-expect-error
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    authenticatorsTable: authenticators,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [
    // @ts-expect-error
    GithubProvider.default({
      clientId: auth.github.clientId,
      clientSecret: auth.github.clientSecret,
    }),
  ],
})

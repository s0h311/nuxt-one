import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import TwitterProvider from 'next-auth/providers/twitter'
import { NuxtAuthHandler } from '#auth'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { db } from '~~/server/database/client'
import { account, authenticator, session, user, verificationToken } from '~~/server/database/schemas/auth'
import { DefaultSession } from 'next-auth'

const { auth } = useRuntimeConfig()

declare module 'next-auth' {
  interface Session {
    user?: {
      id: string
    } & DefaultSession['user']
  }
}

export default NuxtAuthHandler({
  secret: auth.secret,
  // @ts-expect-error
  adapter: DrizzleAdapter(db, {
    usersTable: user,
    accountsTable: account,
    authenticatorsTable: authenticator,
    sessionsTable: session,
    verificationTokensTable: verificationToken,
  }),
  providers: [
    // @ts-expect-error
    GithubProvider.default({
      clientId: auth.github.clientId,
      clientSecret: auth.github.clientSecret,
    }),
    // @ts-expect-error
    GoogleProvider.default({
      clientId: auth.google.clientId,
      clientSecret: auth.google.clientSecret,
    }),
    // @ts-expect-error
    TwitterProvider.default({
      clientId: auth.twitter.clientId,
      clientSecret: auth.twitter.clientSecret,
      version: '2.0',
    }),
  ],
  callbacks: {
    session({ session, user }) {
      if (!session || !session.user) {
        return session
      }

      session.user.id = user.id
      return session
    },
  },
})

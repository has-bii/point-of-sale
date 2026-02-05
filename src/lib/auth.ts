import prisma from '@/lib/prisma'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { betterAuth } from 'better-auth/minimal'
import { admin as adminPlugin } from 'better-auth/plugins'

import { ac, admin } from './auth-permissions'

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  session: {
    expiresIn: 60 * 60 * 8, // 8 hours (work shift)
    updateAge: 60 * 60, // Refresh every hour
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 8, // 8 hours
      // strategy: 'compact' // default: smallest size
    },
  },
  rateLimit: {
    enabled: true,
    window: 60, // 60 seconds
    max: 10, // 10 attempts per window
    storage: 'database', // uses Prisma
  },
  trustedOrigins: [
    'http://localhost:3000',
    process.env.BETTER_AUTH_URL!, // Production URL
  ],
  advanced: {
    useSecureCookies: process.env.NODE_ENV === 'production',
    database: {
      generateId: false, // Keep current UUID generation
    },
    ipAddress: {
      ipAddressHeaders: ['x-forwarded-for', 'cf-connecting-ip'],
    },
    crossSubDomainCookies: {
      enabled: false, // Enable if using subdomains
    },
  },
  user: {
    deleteUser: {
      enabled: true,
    },
  },
  account: {
    storeAccountCookie: true, // Enable stateless OAuth flow with cookie cache
  },
  socialProviders: {
    google: {
      prompt: 'select_account consent',
      accessType: 'offline',
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [adminPlugin()],
})

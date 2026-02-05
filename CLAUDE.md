# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A modern Point of Sale (POS) system built with Next.js 16, featuring role-based access control, Google OAuth authentication, and a PostgreSQL database.

## Commands

```bash
# Development
pnpm dev          # Start development server on localhost:3000

# Production
pnpm build        # Build for production
pnpm start        # Start production server

# Code Quality
pnpm lint         # Run ESLint
pnpm prettier     # Format code with Prettier
```

## Architecture

### Tech Stack
- **Framework**: Next.js 16.1.6 with App Router (React 19, TypeScript 5)
- **Authentication**: Better Auth with Google OAuth
- **Database**: PostgreSQL with Prisma ORM
- **UI**: Tailwind CSS v4 with shadcn/ui components
- **Package Manager**: pnpm

### Directory Structure

```
src/
├── app/                    # Next.js App Router
│   ├── dashboard/          # Protected routes (require auth)
│   ├── signin/             # OAuth sign-in page
│   ├── api/auth/[...all]/  # Better Auth API endpoints
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Landing page
│   └── globals.css         # Global styles with Tailwind v4
├── components/
│   ├── ui/                 # shadcn/ui components
│   └── auth/               # Authentication components
├── lib/
│   ├── auth.ts             # Better Auth server config
│   ├── auth-client.ts      # Better Auth client config
│   ├── auth-permissions.ts # Role-based access control
│   ├── prisma.ts           # Prisma client
│   └── utils.ts            # Utility functions
└── generated/prisma/       # Generated Prisma client
```

### Authentication System

Uses **Better Auth** with the following configuration:

- **Session Management**: 8-hour sessions (work shift length), refresh every hour
- **Cookie Cache**: Enabled for stateless operation (8-hour maxAge)
- **Rate Limiting**: Database-backed, 10 attempts per 60 seconds
- **OAuth**: Google with offline access and account selection
- **Security**: Secure cookies in production, IP address tracking

### Role-Based Access Control

Three roles defined in `prisma/schema.prisma` and `src/lib/auth-permissions.ts`:
- `admin` - Administrative access
- `owner` - Business owner access
- `user` - Standard user access (default)

Roles are stored on the `User` model and enforced through Better Auth's access control system.

### Database Schema

Key models:
- `User` - With role, email verification, and ban support
- `Session` - With IP address and user agent tracking
- `Account` - OAuth provider tokens
- `Verification` - Email verification codes
- `RateLimit` - Rate limiting storage

Prisma client is generated to `src/generated/prisma` (configured in `prisma/schema.prisma`).

### Styling System

- **Tailwind CSS v4** with custom design tokens in `globals.css`
- **OKLCH color system** for theming
- **Dark mode** support via CSS variables
- **shadcn/ui** components for consistent UI
- Custom animations via `tw-animate-css`

### Path Aliases

`@/` maps to `src/` (configured in `tsconfig.json`)

## Development Notes

- Better Auth uses a cookie-based session system with stateless operation via cookie cache
- Protected routes use server-side session validation with redirects
- Database changes require running Prisma migrations
- The project uses ESLint with Next.js config and TypeScript ESLint

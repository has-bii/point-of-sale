# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A modern Point of Sale (POS) system built with Next.js 16, featuring role-based access control, Google OAuth authentication, multi-shop support, and a PostgreSQL database.

## Commands

```bash
# Development
pnpm dev          # Start development server on localhost:3000

# Production
pnpm build        # Build for production
pnpm start        # Start production server

# Database
pnpm prisma:db:push    # Push schema changes to database
pnpm prisma:migrate    # Run migrations
pnpm prisma:studio     # Open Prisma Studio

# Code Quality
pnpm lint         # Run ESLint
pnpm prettier     # Format code with Prettier
```

## Architecture

### Tech Stack
- **Framework**: Next.js 16.1.6 with App Router (React 19, TypeScript 5)
- **Authentication**: Better Auth v1.4.18 with Google OAuth
- **Database**: PostgreSQL with Prisma ORM
- **UI**: Tailwind CSS v4 with shadcn/ui components
- **State Management**: React Query (TanStack Query)
- **Forms**: react-hook-form
- **Package Manager**: pnpm

### Directory Structure

```
src/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── auth/[...all]/        # Better Auth endpoints
│   │   └── shops/                # Shop management API
│   │       ├── route.ts          # POST /api/shops (create)
│   │       └── user/[userId]/    # GET user's shop
│   ├── dashboard/                # Protected routes (require auth)
│   │   ├── page.tsx              # Smart router (redirects by role/shop)
│   │   ├── admin/                # Admin dashboard
│   │   ├── create-shop/          # Shop creation form
│   │   └── shop/                 # Shop dashboard
│   │       ├── page.tsx          # Shop home
│   │       └── products/         # Products management
│   ├── login/                    # OAuth sign-in page
│   ├── layout.tsx                # Root layout with fonts
│   ├── page.tsx                  # Landing page
│   └── globals.css               # Global styles with Tailwind v4
├── components/                   # Reusable UI components
│   ├── ui/                       # shadcn/ui components (17+)
│   ├── app-sidebar.tsx           # Main app sidebar (admin)
│   ├── nav-main.tsx              # Navigation menu
│   ├── nav-user.tsx              # User navigation with sign-out
│   ├── team-switcher.tsx         # Team/shop switcher
│   ├── nav-items.tsx             # Navigation item definitions
│   ├── providers.tsx             # React Query provider
│   └── shop-sidebar/             # Shop-specific sidebar components
├── features/                     # Feature-based modules
│   ├── auth/
│   │   └── components/
│   │       └── sign-in-form.tsx  # Google OAuth form
│   └── shop/
│       ├── api/                  # Shop API functions
│       ├── cache/                # Data caching
│       ├── components/
│       │   └── create-shop-form.tsx
│       ├── mutation/             # Data mutations
│       └── validation/           # Form validation
├── lib/                          # Core libraries
│   ├── auth.ts                   # Better Auth server config
│   ├── auth-client.ts            # Better Auth client config
│   ├── auth-permissions.ts       # Role-based access control
│   ├── prisma.ts                 # Prisma client
│   ├── utils.ts                  # Utility functions
│   └── axios.ts                  # HTTP client setup
├── hooks/                        # Custom React hooks
│   └── use-mobile.ts             # Mobile detection
├── types/                        # TypeScript definitions
│   └── api.d.ts                  # API types
└── generated/prisma/             # Generated Prisma client
```

### Routing Structure

**Public Routes:**
| Route | File | Purpose |
|-------|------|---------|
| `/` | `app/page.tsx` | Landing page |
| `/login` | `app/login/page.tsx` | Google OAuth sign-in |

**Protected Routes (`/dashboard` - require auth):**
| Route | File | Purpose |
|-------|------|---------|
| `/dashboard` | `app/dashboard/page.tsx` | Smart router (redirects by role/shop) |
| `/dashboard/admin` | `app/dashboard/admin/page.tsx` | Admin dashboard |
| `/dashboard/create-shop` | `app/dashboard/create-shop/page.tsx` | Create new shop |
| `/dashboard/shop` | `app/dashboard/shop/page.tsx` | Shop dashboard |
| `/dashboard/shop/products` | `app/dashboard/shop/products/page.tsx` | Products management |

**API Routes:**
| Route | Method | Purpose |
|-------|--------|---------|
| `/api/auth/[...all]` | GET/POST | Better Auth endpoints |
| `/api/shops` | POST | Create new shop |
| `/api/shops/user/[userId]` | GET | Get user's shop |

**Dashboard Router Logic:**
- Admin users → `/dashboard/admin`
- Users without shop → `/dashboard/create-shop`
- Users with shop → `/dashboard/shop`

### Authentication System

Uses **Better Auth** with the following configuration:

- **Session Management**: 8-hour sessions (work shift length), refresh every hour
- **Cookie Cache**: Enabled for stateless operation (8-hour maxAge)
- **Rate Limiting**: Database-backed, 10 attempts per 60 seconds
- **OAuth**: Google with offline access and account selection
- **Security**: Secure cookies in production, IP address tracking

**Sign-In Flow:**
1. User visits `/login` (checks for existing session, redirects to `/dashboard` if found)
2. Clicks "Sign in with Google"
3. OAuth completes, redirects to `/dashboard`
4. Dashboard router directs based on role/shop status

**Sign-Out Flow:**
- Client-side via `authClient.signOut()` in `nav-user.tsx`
- Toast notification on success/error
- Redirects to `/login`

### Role-Based Access Control

Three roles defined in `prisma/schema.prisma` and `src/lib/auth-permissions.ts`:
- `admin` - Full administrative access
- `owner` - Business owner access
- `user` - Standard user access (default)

Roles are stored on the `User` model and enforced through Better Auth's access control system.

**Note:** `auth-permissions.ts` currently uses minimal configuration. Fine-grained permissions are not fully implemented.

### Database Schema

**6 Models:**

| Model | Description | Key Fields |
|-------|-------------|------------|
| `User` | Core user model | id, name, email, role, banned, banReason, banExpires |
| `Session` | Authentication sessions | id, token, expiresAt, ipAddress, userAgent |
| `Account` | OAuth provider tokens | id, providerId, accountId, accessToken, refreshToken |
| `Verification` | Email verification codes | id, identifier, value, expiresAt |
| `RateLimit` | API rate limiting | id, key, count, lastRequest |
| `Shop` | Multi-shop support | id, name, slug, ownerId |

**Relationships:**
- User → Session (one-to-many, cascade delete)
- User → Account (one-to-many, cascade delete)
- User → Shop (one-to-one, optional)
- Shop → User (many-to-one, unique ownerId constraint)

**Migrations:**
1. `20260205112634_add_auth_models` - Authentication tables
2. `20260207092436_add_shop_model` - Multi-shop support

Prisma client is generated to `src/generated/prisma` (configured in `prisma/schema.prisma`).

### shadcn/ui Components Installed

**Core Components:**
- Avatar, Button, Card, Input, Label
- Field (advanced field system), Form, Separator, Skeleton, Tooltip
- Sheet (dialog), Collapsible, Breadcrumb, Sonner (toasts)

**Layout Components:**
- Sidebar (complete system: Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarRail)
- SidebarMenu (navigation: SidebarGroup, SidebarMenu, SidebarMenuButton, etc.)

### Custom Components

| Component | Location | Purpose |
|-----------|----------|---------|
| `SignInForm` | `features/auth/components/` | Google OAuth sign-in form |
| `CreateShopForm` | `features/shop/components/` | Shop creation form with validation |
| `AppSidebar` | `components/` | Main navigation for admin |
| `ShopSidebar` | `components/` | Shop-specific navigation (server component) |
| `NavMain` | `components/` | Navigation menu with collapsible items |
| `NavUser` | `components/` | User navigation with sign-out |
| `TeamSwitcher` | `components/` | Team/shop switching UI |

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
- Protected routes use server-side session validation with redirects (pattern: `await auth.api.getSession()` then redirect if no session)
- Database changes require running Prisma migrations
- The project uses ESLint with Next.js config and TypeScript ESLint
- Feature-based organization: auth and shop modules in `src/features/`
- Server/Client component separation: ShopSidebar is a server component, SignInForm is a client component
- React Query is configured for server state management
- Forms use react-hook-form with custom Field components from the UI library

## Implementation Status

**Completed:**
- Authentication flow with Google OAuth
- Database schema with migrations
- Role-based user model
- Protected routing structure with smart redirects
- Multi-shop support
- UI component library (17+ shadcn/ui components)
- API endpoints for shop management

**Placeholder/To-Do:**
- Dashboard content pages (admin and shop)
- Products management functionality
- Admin-specific features
- Fine-grained RBAC permissions
- Email verification flow

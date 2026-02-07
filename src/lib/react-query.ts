import { QueryClient } from '@tanstack/react-query'

/**
 * Create a new QueryClient instance for server-side use.
 * This should only be used in Server Components.
 *
 * @returns A new QueryClient instance
 */
export function getQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        gcTime: 5 * 60 * 1000, // 5 minutes
      },
    },
  })
}

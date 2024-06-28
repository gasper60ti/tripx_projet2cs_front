"use client"

import { HydrationBoundary, QueryClient, QueryClientProvider as Provider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useState } from "react"

export default function QueryClientProvider(props: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 1000
          }
        }
      })
  )

  return (
    <Provider client={queryClient}>
      <HydrationBoundary>{props.children}</HydrationBoundary>
      <ReactQueryDevtools />
    </Provider>
  )
}

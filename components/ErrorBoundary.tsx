"use client"

import type React from "react"
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary"

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="text-center p-6 bg-red-100 text-red-700">
      <h2 className="text-lg font-bold mb-2">Oops! Something went wrong.</h2>
      <p>{error.message}</p>
    </div>
  )
}

export default function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return <ReactErrorBoundary FallbackComponent={ErrorFallback}>{children}</ReactErrorBoundary>
}


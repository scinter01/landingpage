import { Inter } from "next/font/google"
import "./globals.css"
import dynamic from "next/dynamic"

const inter = Inter({ subsets: ["latin"] })

const ErrorBoundary = dynamic(() => import("@/components/ErrorBoundary"), { ssr: false })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  )
}


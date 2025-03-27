import React from "react"

import Footer from "@/components/layouts/Footer"
import Navbar from "@/components/layouts/Navbar"

type Props = {
  children: React.ReactNode
}

export default function LogInLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="container mx-auto flex-1 px-4 py-8">{children}</main>
      <Footer />
    </div>
  )
}

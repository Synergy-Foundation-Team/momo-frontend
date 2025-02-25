import Footer from '@/components/layouts/Footer'
import Navbar from '@/components/layouts/Navbar'
import React from 'react'

type Props = {
    children: React.ReactNode
}

export default function LogInLayout({ children }: Readonly<Props>) {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-8 justify-center items-center h-full">{children}</main>
            <Footer />
        </div>
    )
}
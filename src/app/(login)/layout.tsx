import Footer from '@/components/layouts/Footer'
import Navbar from '@/components/layouts/Navbar'
import React from 'react'

type Props = {
    children: React.ReactNode
}

export default function LogInLayout({ children }: Props) {
    return (
        <div>
            <Navbar />
            <main className='h-[calc(100vh-196px)]'>{children}</main>
            <Footer />
        </div>
    )
}
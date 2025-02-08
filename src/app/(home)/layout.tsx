import Footer from '@/components/layouts/Footer'
import Navbar from '@/components/layouts/Navbar'
import React from 'react'
import { BannerWrapper } from '@/components/banners/BannerWrapper'

type Props = {
    children: React.ReactNode
}

export default function HomeLayout({ children }: Props) {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <BannerWrapper />
            <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
            <Footer />
        </div>
    )
}
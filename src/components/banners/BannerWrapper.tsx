'use client'

import { usePathname } from 'next/navigation'
import { Banner } from './Banner'

const sampleBanners = [
    {
        id: 'banner-1',
        title: 'ลดสูงสุด 70%',
        subtitle: 'ทุกวันศุกร์สุดสัปดาห์',
        image: '/images/banner-1.jpg',
        link: '/promotion/friday-sale',
    },
    {
        id: 'banner-2',
        title: 'สินค้าใหม่มาแรง',
        subtitle: 'พบกับสินค้าใหม่ประจำเดือนนี้',
        image: '/images/banner-2.jpg',
        link: '/new-arrivals',
    },
    {
        id: 'banner-3',
        title: 'ส่งฟรีทั่วประเทศ',
        subtitle: 'เมื่อช้อปครบ 999 บาท',
        image: '/images/banner-3.jpg',
        link: '/free-shipping',
    },
]

export function BannerWrapper() {
    const pathname = usePathname()
    
    // Don't show banner on product detail pages or cart page
    if (pathname.includes('/cart') || /^\/[^/]+$/.test(pathname)) {
        return null
    }

    return <Banner banners={sampleBanners} />
}

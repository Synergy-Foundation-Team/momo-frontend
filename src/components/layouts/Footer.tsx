import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className='w-full bg-[#2A8993] text-white'>
            <div className='container mx-auto px-4 py-8'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                    {/* Store Info */}
                    <div className='space-y-4'>
                        <h3 className='text-xl font-semibold'>โมโม่ ซุปเปอร์สโตร์ & ยา</h3>
                        <p className='text-sm'>ร้านขายยาและอุปกรณ์ทางการแพทย์ครบวงจร</p>
                        <p className='text-sm'>เปิดทุกวัน 08:00 - 20:00 น.</p>
                    </div>

                    {/* Quick Links */}
                    <div className='space-y-4'>
                        <h3 className='text-xl font-semibold'>ลิงก์ด่วน</h3>
                        <ul className='space-y-2'>
                            <li>
                                <Link href='/' className='text-sm hover:underline'>หน้าแรก</Link>
                            </li>
                            <li>
                                <Link href='/products' className='text-sm hover:underline'>สินค้าทั้งหมด</Link>
                            </li>
                            <li>
                                <Link href='/about' className='text-sm hover:underline'>เกี่ยวกับเรา</Link>
                            </li>
                            <li>
                                <Link href='/contact' className='text-sm hover:underline'>ติดต่อเรา</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact & Social */}
                    <div className='space-y-4'>
                        <h3 className='text-xl font-semibold'>ติดต่อเรา</h3>
                        <p className='text-sm'>โทร: 02-XXX-XXXX</p>
                        <p className='text-sm'>อีเมล: contact@paimai.store</p>
                        <div className='flex space-x-4 pt-2'>
                            <Link href='#' className='hover:text-gray-200'>
                                <Facebook size={20} />
                            </Link>
                            <Link href='#' className='hover:text-gray-200'>
                                <Instagram size={20} />
                            </Link>
                            <Link href='#' className='hover:text-gray-200'>
                                <Twitter size={20} />
                            </Link>
                            <Link href='#' className='hover:text-gray-200'>
                                <Youtube size={20} />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className='border-t border-white/20 mt-8 pt-4 text-center'>
                    <p className='text-sm'>
                        © {currentYear} Momo Store and medicine All Rights Reserved
                    </p>
                </div>
            </div>
        </footer>
    )
}
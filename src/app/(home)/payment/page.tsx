'use client'

import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Minus, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '@/store/cart'
import { useEffect, useState } from 'react'
import OrderSummary from '@/components/order/summary'
import OrderDetail from '@/components/order/orderDetail'

export default function ListOrder() {
  const [mounted, setMounted] = useState(false)
  const { items } = useCartStore()

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#1B4B66]">ชำระเงิน</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            <div className='flex items-center justify-between'>
              {/* Header ชื่อสินค้า จำนวน ราคา ราคารวม */}
              <div className="text-base font-semibold text-[#1B4B66]">
                ช่องทางการชำระเงิน
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-lg  p-4">
              <div className="relative aspect-square h-24 flex-shrink-0 overflow-hidden rounded-md">
                <Image
                  src="/images/qr-code-payment.png"
                  alt="qr-code-payment"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className='flex items-center justify-between'>
              <Button className="mt-6 w-full" size="lg">
                ยืนยันการชำระเงิน
              </Button>
            </div>
          </div>
        </div>

        <div>
          <div className='mb-2'>
            <OrderDetail />
          </div>
          <div>
            <OrderSummary />
          </div>
          <Link href="/">
            <Button className="mt-6 w-full" size="lg">
              ช็อปปิ้งต่อ
            </Button>
          </Link>
        </div>
      </div>
    </div >
  )
}

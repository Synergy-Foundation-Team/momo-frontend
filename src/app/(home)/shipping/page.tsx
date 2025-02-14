'use client'

import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Minus, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '@/store/cart'
import { useEffect, useState } from 'react'
import OrderSummary from '@/components/order/summary'

export default function ListOrder() {
  const [mounted, setMounted] = useState(false)
  const { items, totalPrice, updateQuantity, removeItem } = useCartStore()

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const discount = totalPrice * 0.1 // 10% discount
  const shipping = totalPrice > 1000 ? 0 : 50 // Free shipping over 1000 baht
  const total = totalPrice - discount + shipping


  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-[#1B4B66]">ตะกร้าสินค้า</h1>
          <div className="mt-1 text-sm text-muted-foreground">
            ไม่มีสินค้าในตะกร้า
          </div>
        </div>
        <div className="rounded-lg border bg-card p-8 text-center">
          <p className="text-muted-foreground">ตะกร้าของคุณว่างเปล่า</p>
          <Button className="mt-4" asChild>
            <Link href="/">เลือกซื้อสินค้า</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#1B4B66]">ที่อยู่จัดส่ง</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            <div className='flex items-center justify-between'>
              {/* Header ชื่อสินค้า จำนวน ราคา ราคารวม */}
              <div className="text-base font-semibold text-[#1B4B66]">
                กรอกข้อมูลการจัดส่ง
              </div>
            </div>
              <div>
                <Input
                  type="text"
                  placeholder="ชื่อ-นามสกุล"
                  className="w-full pl-10"
                />
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="เบอร์โทรศัพท์"
                  className="w-full pl-10"
                />
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="ที่อยู่"
                  className="w-full pl-10"
                />
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="ถนน"
                  className="w-full pl-10"
                />
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="ตำบล"
                  className="w-full pl-10"
                />
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="อำเภอ"
                  className="w-full pl-10"
                />
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="จังหวัด"
                  className="w-full pl-10"
                />
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="รหัสไปรษณีย์"
                  className="w-full pl-10"
                />
              </div>

          </div>
        </div>

        <div>
          <OrderSummary />
          <Link href="/payment">
            <Button className="mt-6 w-full" size="lg">
              ชำระเงิน
            </Button>
          </Link>
          <Link href="/cart">
            <Button className="mt-6 w-full" size="lg">
              ตะกร้าสินค้า
            </Button>
          </Link>
        </div>
      </div>

    </div >
  )
}

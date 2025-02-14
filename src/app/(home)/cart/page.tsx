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
        <h1 className="text-2xl font-semibold text-[#1B4B66]">ตะกร้าสินค้า</h1>
        <div className="mt-1 text-sm text-muted-foreground">
          {items.length} รายการในตะกร้า
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            <div className='flex items-center justify-between'>
              {/* Header ชื่อสินค้า จำนวน ราคา ราคารวม */}
              <div className="text-base font-semibold text-[#1B4B66]">
                ชื่อสินค้า
              </div>
              <div className="flex text-base font-semibold text-[#1B4B66] space-x-9 gap-4">
                <span>ราคา</span>
                <span>จำนวน</span>
                <span>ราคารวม</span>
                <span></span>
              </div>
            </div>


            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-lg  p-4"
              // className="flex gap-4 rounded-lg border bg-card p-4"
              >
                <div className="relative aspect-square h-24 flex-shrink-0 overflow-hidden rounded-md">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted">
                      <span className="text-sm text-muted-foreground">No image</span>
                    </div>
                  )}
                </div>


                {/* <div className="flex flex-1 flex-col"> */}
                <div className="flex flex-1 flex-col items-end">
                  {/* <div className="flex justify-between">
                        <Link
                          href={`/${item.id}`}
                          className="font-medium hover:text-primary"
                        >
                          {item.name}
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div> */}

                  <div className="mt-4 flex items-end justify-between">
                    <div className="inline-flex items-center rounded-lg border bg-background p-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>

                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value))
                        }
                        className="h-8 w-12 border-0 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      />

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>

                    </div>
                    <div className="font-medium">฿{(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <OrderSummary />
          <Link href="/shipping">
            <Button className="mt-6 w-full" size="lg">
              ยืนยันการสั่งซื้อ
            </Button>
          </Link>
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

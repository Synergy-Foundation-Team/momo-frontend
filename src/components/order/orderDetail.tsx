'use client'

import Image from 'next/image'
import { useCartStore } from '@/store/cart'
import { useEffect, useState } from 'react'

export default function OrderDetail() {
  const [mounted, setMounted] = useState(false)
  const { items } = useCartStore()

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="lg:col-span-1">
      <div className="rounded-lg border bg-card p-6">
        <h2 className="text-lg font-semibold">รายละเอียดคำสั่งซื้อ</h2>
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 rounded-lg  p-4"
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

            <div className="flex flex-1 flex-col items-start">
              <div className="flex items-start justify-between">
                <div className="font-small">{(item.name)}</div>
              </div>
              <div className="flex items-start justify-between">
                <div className="font-small">จำนวน {(item.quantity)} ชิ้น</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

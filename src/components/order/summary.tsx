"use client"

import { useEffect, useState } from "react"
import { useCartStore } from "@/store/cart"
import { Button } from "@/ui/button"

export default function OrderSummary() {
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

  return (
    <div className="lg:col-span-1">
      <div className="rounded-lg bg-card">
        <h2 className="mb-4 border-b pb-2 text-xl font-semibold text-[#1B4B66]">
          สรุปคำสั่งซื้อ
        </h2>
        <div className="mt-6 space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">ราคารวม</span>
            <span>฿{totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">ส่วนลด</span>
            <span className="text-red-600">-฿{discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">ค่าจัดส่ง</span>
            <span>{shipping === 0 ? "ฟรี" : `฿${shipping.toFixed(2)}`}</span>
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between">
              <span className="font-medium">ยอดรวมทั้งหมด</span>
              <span className="font-medium">฿{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useCallback, useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card"
import { CheckCircle, CreditCard, Truck, User, XCircle } from "lucide-react"

import { fetchOrderDetail, OrderDetail } from "@/lib/orders"
import { OrderItemsList } from "@/components/admin/OrderItemsList"
import { StatusBadge } from "@/components/admin/StatusBadge"

export default function OrderDetailPage() {
  const { id } = useParams()
  const [order, setOrder] = useState<OrderDetail | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (id) {
      fetchOrderDetail(id as string).then(setOrder)
    }
  }, [id])

  const handleAction = useCallback(
    (action: string) => {
      alert(`Order ${order?.id} marked as ${action}`)
    },
    [order]
  )

  if (!order) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg font-medium text-gray-600">
          กำลังโหลดข้อมูล...
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full space-y-8 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">รายละเอียดออเดอร์</h1>
        <StatusBadge status={order.status} />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Customer Information Card */}
        <Card className="group relative overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:shadow-xl">
          {/* Vector Background */}
          <div className="absolute inset-0">
            <svg width="100%" height="100%" className="text-blue-500/[0.03]">
              <rect width="100%" height="100%" fill="url(#customerPattern)" />
            </svg>
          </div>

          {/* Animated Highlight */}
          <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-100/50 blur-3xl transition-all duration-500 group-hover:bg-blue-200/50" />

          <CardHeader className="relative border-b border-blue-100/20 pb-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-500/10 p-2">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <CardTitle className="text-xl font-semibold text-blue-950">
                ข้อมูลลูกค้า
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent className="relative mt-4 space-y-6">
            <div className="space-y-5 rounded-lg p-2">
              <div className="transform transition-all duration-300 hover:translate-x-1">
                <label className="mb-1.5 block text-sm font-medium text-blue-600">
                  ชื่อลูกค้า
                </label>
                <p className="flex items-center text-lg font-medium text-gray-900">
                  {order.customerName}
                </p>
              </div>

              <div className="transform transition-all duration-300 hover:translate-x-1">
                <label className="mb-1.5 block text-sm font-medium text-blue-600">
                  ที่อยู่
                </label>
                <p className="flex items-center text-gray-700">
                  {order.address}
                </p>
              </div>

              <div className="transform transition-all duration-300 hover:translate-x-1">
                <label className="mb-1.5 block text-sm font-medium text-blue-600">
                  วันที่สั่งซื้อ
                </label>
                <p className="flex items-center text-gray-700">{order.date}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Information Card */}
        <Card className="group relative overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:shadow-xl">
          {/* Vector Background */}
          <div className="absolute inset-0">
            <svg width="100%" height="100%" className="text-green-500/[0.03]">
              <rect width="100%" height="100%" fill="url(#paymentPattern)" />
            </svg>
          </div>

          {/* Animated Highlight */}
          <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-green-100/50 blur-3xl transition-all duration-500 group-hover:bg-green-200/50" />

          <CardHeader className="relative border-b border-green-100/20 pb-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-500/10 p-2">
                <CreditCard className="h-5 w-5 text-green-600" />
              </div>
              <CardTitle className="text-xl font-semibold text-green-950">
                ข้อมูลการชำระเงิน
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent className="relative mt-4 space-y-6">
            <div className="space-y-5 rounded-lg p-2">
              <div className="transform transition-all duration-300 hover:translate-x-1">
                <label className="mb-1.5 block text-sm font-medium text-green-600">
                  วิธีการชำระเงิน
                </label>
                <p className="flex items-center text-lg font-medium text-gray-900">
                  {order.paymentMethod}
                </p>
              </div>

              <div className="transform transition-all duration-300 hover:translate-x-1">
                <label className="mb-1.5 block text-sm font-medium text-green-600">
                  ยอดรวม
                </label>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-green-600">
                    {new Intl.NumberFormat("th-TH", {
                      style: "currency",
                      currency: "THB",
                    }).format(order.total)}
                  </p>
                  <span className="text-sm text-green-500">THB</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Items */}
      <OrderItemsList items={order.items} />

      {/* Action Buttons */}
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
        <div className="flex flex-1 gap-4">
          <Button
            className="flex-1 bg-green-500 hover:bg-green-600"
            onClick={() => handleAction("confirmed")}
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            ยืนยันการชำระเงิน
          </Button>
          <Button
            className="flex-1 bg-blue-500 hover:bg-blue-600"
            onClick={() => handleAction("processing")}
          >
            <Truck className="mr-2 h-4 w-4" />
            จดส่งสินค้า
          </Button>
          <Button
            className="flex-1"
            variant="destructive"
            onClick={() => handleAction("rejected")}
          >
            <XCircle className="mr-2 h-4 w-4" />
            ยกเลิก
          </Button>
        </div>
        <Button
          variant="outline"
          onClick={() => router.push("/orders")}
          className="w-full sm:w-auto"
        >
          กลับไปที่รายการออเดอร์
        </Button>
      </div>
    </div>
  )
}

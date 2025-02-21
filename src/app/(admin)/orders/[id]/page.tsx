"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/ui/dialog"
import { Description } from "@radix-ui/react-dialog"
import {
  AlertCircle,
  CheckCircle,
  Clock,
  CreditCard,
  Package,
  Search,
  Truck,
  User,
  XCircle,
} from "lucide-react"

export type OrderDetail = {
  id: string
  customerName: string
  address: string
  items: {
    id: string
    status: string
    productName: string
    notes: string
    price: number
    quantity: number
    barcode?: string
  }[]
  total: number
  paymentMethod: string
  status: "pending" | "processing" | "success" | "failed"
  date: string
  actionBy: string
  receiptUrl?: string
  barcode?: string
}

const fetchOrderDetail = async (id: string): Promise<OrderDetail | null> => {
  const mockOrders: OrderDetail[] = [
    {
      id: "a1b2c3d4",
      customerName: "สมชาย วัฒนธรรม",
      address: "123/45 ถนนพระราม 9, กรุงเทพฯ",
      items: [
        {
          id: "item1",
          productName: "ออกแบบเว็บไซต์ร้านอาหาร",
          price: 15000,
          quantity: 1,
          status: "pending",
          notes: "ต้องการฟีเจอร์ระบบจองโต๊ะ",
          barcode: "/images/barcode.png",
        },
        {
          id: "item2",
          productName: "ระบบจัดการหลังร้าน",
          price: 25000,
          quantity: 1,
          status: "pending",
          notes: "รองรับการจัดการสต็อกสินค้า",
          barcode: "/images/barcode.png",
        },
        {
          id: "item3",
          productName: "แอพพลิเคชันมือถือ",
          price: 35000,
          quantity: 1,
          status: "pending",
          notes: "iOS และ Android",
          barcode: "/images/barcode.png",
        },
      ],
      total: 75000,
      paymentMethod: "Credit Card",
      status: "pending",
      date: "15 มกราคม 2024",
      actionBy: "Admin1",
      receiptUrl: "/images/receipt.png",
    },
    {
      id: "b2c3d4e5",
      customerName: "วิภา สุขสวัสดิ์",
      address: "789/12 ถนนสุขุมวิท, กรุงเทพฯ",
      items: [
        {
          id: "item4",
          productName: "เว็บไซต์ E-commerce",
          price: 45000,
          quantity: 1,
          status: "processing",
          notes: "รองรับระบบชำระเงินหลายช่องทาง",
        },
        {
          id: "item5",
          productName: "ระบบ CRM",
          price: 30000,
          quantity: 1,
          status: "processing",
          notes: "เชื่อมต่อกับ Line OA",
        },
      ],
      total: 75000,
      paymentMethod: "Bank Transfer",
      status: "processing",
      date: "16 มกราคม 2024",
      actionBy: "Admin2",
      receiptUrl: "/images/receipt.png",
    },
    {
      id: "c3d4e5f6",
      customerName: "ประพันธ์ มั่นคง",
      address: "456/78 ถนนรัชดาภิเษก, กรุงเทพฯ",
      items: [
        {
          id: "item6",
          productName: "SEO Optimization",
          price: 15000,
          quantity: 3,
          status: "success",
          notes: "ทำ 3 เดือน",
        },
        {
          id: "item7",
          productName: "Content Writing",
          price: 5000,
          quantity: 10,
          status: "success",
          notes: "บทความ 10 ชิ้น",
        },
        {
          id: "item8",
          productName: "Social Media Management",
          price: 10000,
          quantity: 3,
          status: "pending",
          notes: "ดูแล 3 แพลตฟอร์ม",
        },
      ],
      total: 95000,
      paymentMethod: "Prompt Pay",
      status: "success",
      date: "17 มกราคม 2024",
      actionBy: "Admin1",
      receiptUrl: "/images/receipt.png",
    },
    {
      id: "d4e5f6g7",
      customerName: "นภา วงศ์พาณิชย์",
      address: "321/54 ถนนเพชรบุรี, กรุงเทพฯ",
      items: [
        {
          id: "item9",
          productName: "Line Official Account Setup",
          price: 8000,
          quantity: 1,
          status: "failed",
          notes: "รวมการตั้งค่าและ Rich Menu",
        },
        {
          id: "item10",
          productName: "Chat Bot Development",
          price: 20000,
          quantity: 1,
          status: "failed",
          notes: "ระบบตอบกลับอัตโนมัติ",
        },
      ],
      total: 28000,
      paymentMethod: "Credit Card",
      status: "failed",
      date: "18 มกราคม 2024",
      actionBy: "Admin3",
      receiptUrl: "/images/receipt.png",
    },
    {
      id: "e5f6g7h8",
      customerName: "สุรชัย พัฒนาดี",
      address: "159/87 ถนนลาดพร้าว, กรุงเทพฯ",
      items: [
        {
          id: "item11",
          productName: "Website Maintenance",
          price: 5000,
          quantity: 12,
          status: "processing",
          notes: "ดูแลรายปี",
        },
        {
          id: "item12",
          productName: "SSL Certificate",
          price: 2500,
          quantity: 1,
          status: "success",
          notes: "รับรอง 1 ปี",
        },
        {
          id: "item13",
          productName: "Cloud Hosting",
          price: 1500,
          quantity: 12,
          status: "processing",
          notes: "แพ็คเกจ Premium",
        },
      ],
      total: 80500,
      paymentMethod: "Bank Transfer",
      status: "processing",
      date: "19 มกราคม 2024",
      actionBy: "Admin2",
      receiptUrl: "/images/receipt.png",
    },
  ]
  return mockOrders.find(order => order.id === id) || null
}

const StatusBadge = ({ status }: { status: OrderDetail["status"] }) => {
  const statusConfig = {
    pending: { icon: Clock, color: "bg-yellow-100 text-yellow-700" },
    processing: { icon: AlertCircle, color: "bg-blue-100 text-blue-700" },
    success: { icon: CheckCircle, color: "bg-green-100 text-green-700" },
    failed: { icon: XCircle, color: "bg-red-100 text-red-700" },
  }

  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium ${config.color}`}
    >
      <Icon size={16} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

const OrderItemsList = ({ items }: { items: OrderDetail["items"] }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"name" | "price">("name")
  const [page, setPage] = useState(1)
  const itemsPerPage = 5

  const filteredItems = items
    .filter(item =>
      item.productName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.productName.localeCompare(b.productName)
      }
      return b.price - a.price
    })

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
  const displayedItems = filteredItems.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <CardTitle className="flex items-center text-lg">
            <Package className="mr-2 h-5 w-5" />
            รายการสินค้า
            <span className="ml-2 rounded-full bg-gray-100 px-2 py-1 text-sm text-gray-600">
              {items.length} รายการ
            </span>
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="ค้นหาสินค้า..."
                className="rounded-md border border-gray-300 px-3 py-1 pl-9 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="rounded-md border border-gray-300 px-3 py-1 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={sortBy}
              onChange={e => setSortBy(e.target.value as "name" | "price")}
            >
              <option value="name">เรียงตามชื่อ</option>
              <option value="price">เรียงตามราคา</option>
            </select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <div className="min-w-full divide-y divide-gray-200">
            <div className="grid grid-cols-12 gap-4 bg-gray-50 p-4 text-sm font-medium text-gray-500">
              <div className="col-span-3">สินค้า</div>
              <div className="col-span-2 text-center">Barcode</div>
              <div className="col-span-2 text-center">จำนวน</div>
              <div className="col-span-3 text-right">ราคาต่อชิ้น</div>
              <div className="col-span-2 text-right">รวม</div>
            </div>
            <div className="divide-y divide-gray-200 bg-white">
              {displayedItems.map((item, index) => (
                <div
                  key={item.id || index}
                  className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50"
                >
                  <div className="col-span-3">
                    <p className="font-medium text-gray-900">
                      {item.productName}
                    </p>
                    {item.notes && (
                      <p className="mt-1 text-sm text-gray-500">{item.notes}</p>
                    )}
                  </div>
                  <div className="col-span-2">
                    <Image
                      src={item.barcode}
                      alt="Full Receipt"
                      width={800}
                      height={800}
                      className="rounded-lg"
                    />
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-sm">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="col-span-3 text-right font-medium">
                    {new Intl.NumberFormat("th-TH", {
                      style: "currency",
                      currency: "THB",
                    }).format(item.price)}
                  </div>
                  <div className="col-span-2 text-right font-medium">
                    {new Intl.NumberFormat("th-TH", {
                      style: "currency",
                      currency: "THB",
                    }).format(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Section */}
          <div className="border-t border-gray-200 bg-gray-50 p-4">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-500">จำนวนรวม:</span>
                <span className="font-medium">{totalQuantity} ชิ้น</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-500">ยอดรวม:</span>
                <span className="text-lg font-bold text-gray-900">
                  {new Intl.NumberFormat("th-TH", {
                    style: "currency",
                    currency: "THB",
                  }).format(subtotal)}
                </span>
              </div>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">
                  หน้า {page} จาก {totalPages}
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  ก่อนหน้า
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  ถัดไป
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

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
    <div className="mx-auto space-y-8 p-8 w-full">
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

      {/* Barcode Section */}
      {order.barcode && (
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Barcode</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Dialog>
              <DialogTrigger>
                <div className="overflow-hidden rounded-lg transition-transform hover:scale-105">
                  <Image
                    src={order.barcode}
                    alt="barcode"
                    width={200}
                    height={200}
                    className="cursor-pointer object-cover shadow-lg"
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-2xl bg-white p-6">
                <DialogTitle className="mb-4 text-xl font-bold">
                  Barcode
                </DialogTitle>
                <Description className="mb-4 text-gray-600"></Description>
                <Image
                  src={order.barcode}
                  alt="Full Receipt"
                  width={800}
                  height={800}
                  className="rounded-lg"
                />
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      )}

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

// components/OrderItemsList.tsx
"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog"
import { Package, Search } from "lucide-react"

import { OrderDetail } from "@/lib/orders"

export const OrderItemsList = ({ items }: { items: OrderDetail["items"] }) => {
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
              <div className="col-span-2">สินค้า</div>
              <div className="col-span-2 text-center">Barcode</div>
              <div className="col-span-2 text-center">จำนวน</div>
              <div className="col-span-1 text-center">สถานะ</div>
              <div className="col-span-2 text-center">ราคาต่อชิ้น</div>
              <div className="col-span-2 text-center">รวม</div>
              <div className="col-span-1 text-right">จัดการ</div>
            </div>
            <div className="divide-y divide-gray-200 bg-white">
              {displayedItems.map((item, index) => (
                <div
                  key={item.id || index}
                  className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50"
                >
                  <div className="col-span-2">
                    <p className="font-medium text-gray-900">
                      {item.productName}
                    </p>
                    {item.notes && (
                      <p className="mt-1 text-sm text-gray-500">{item.notes}</p>
                    )}
                  </div>
                  <div className="col-span-2">
                    <Dialog>
                      <DialogContent className="bg-white">
                        <DialogHeader>Barcode</DialogHeader>
                        <DialogTitle></DialogTitle>
                        <DialogDescription></DialogDescription>
                        <Image
                          src={item.barcode}
                          alt="Full Receipt"
                          width={800}
                          height={800}
                          className="rounded-lg"
                        />
                      </DialogContent>
                      <DialogTrigger>
                        <Image
                          src={item.barcode}
                          alt="Full Receipt"
                          width={800}
                          height={800}
                          className="rounded-lg"
                        />
                      </DialogTrigger>
                    </Dialog>
                  </div>
                  <div className="col-span-2 flex flex-col items-center">
                    <span className="mb-2 w-fit rounded-full bg-gray-100 px-2 py-1 text-sm">
                      {item.quantity}
                    </span>
                    <span className="text-sm text-gray-500">
                      สินค้าในคลัง: {item.stock || 0}
                    </span>
                  </div>
                  <div className="col-span-1 flex flex-col items-center justify-center text-center">
                    {item.stock === 0 ? (
                      <span className="text-red-500">สินค้าหมด</span>
                    ) : (
                      <span className="text-green-500">มีสินค้า</span>
                    )}
                  </div>
                  <div className="col-span-2 flex flex-col items-center justify-center text-right font-medium">
                    {new Intl.NumberFormat("th-TH", {
                      style: "currency",
                      currency: "THB",
                    }).format(item.price)}
                  </div>
                  <div className="col-span-2 flex flex-col items-center justify-center text-right font-medium">
                    {new Intl.NumberFormat("th-TH", {
                      style: "currency",
                      currency: "THB",
                    }).format(item.price * item.quantity)}
                  </div>
                  <div className="col-span-1 flex flex-col items-center justify-center">
                    <Button
                      variant="destructive"
                      size="sm"
                      className="w-full px-2 py-1 text-xs"
                    >
                      ยกเลิก
                    </Button>
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

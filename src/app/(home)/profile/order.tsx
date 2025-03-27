import { useState } from "react"

import OrderDetail from "./order-detail"
import { Pagination } from "./paginate"
import Table from "./table"

export type Orders = {
  id: string
  orderNumber: string
  price: number
  date: Date
  status: "อยู่ระหว่างดำเนินการ" | "สำเร็จแล้ว" | "ยกเลิกแล้ว"
}

const ordersList: Orders[] = Array.from({ length: 50 }, (_, i) => ({
  id: (i + 1).toString(),
  orderNumber: Math.floor(100000000 + Math.random() * 900000000).toString(),
  price: Math.floor(Math.random() * 50000) + 1000,
  status: ["อยู่ระหว่างดำเนินการ", "สำเร็จแล้ว", "ยกเลิกแล้ว"][
    Math.floor(Math.random() * 3)
  ] as "อยู่ระหว่างดำเนินการ" | "สำเร็จแล้ว" | "ยกเลิกแล้ว",
  date: new Date(
    2023 + Math.floor(Math.random() * 2),
    Math.floor(Math.random() * 12),
    Math.floor(Math.random() * 28) + 1
  ),
}))

const statusOptions = [
  "ทั้งหมด",
  "อยู่ระหว่างดำเนินการ",
  "สำเร็จแล้ว",
  "ยกเลิกแล้ว",
]

const columns = [
  {
    key: "orderNumber",
    label: "เลข Order",
    className: "w-40",
    render: (row: any) => (
      <div className="text-[#1B4B66]">Order#{row.orderNumber}</div>
    ),
  },
  {
    key: "price",
    label: "ราคา",
    className: "w-32",
    render: (row: any) => `${row.price.toLocaleString()} บาท`,
  },
  {
    key: "date",
    label: "วันที่สั่งซื้อ",
    className: "w-40",
    format: (value: Date) => {
      const formatted = new Intl.DateTimeFormat("th-TH", {
        dateStyle: "medium",
      }).format(value)
      return <div>{formatted}</div>
    },
  },
  { key: "status", label: "สถานะ", className: "w-40" },
]

const formattedOrders = ordersList.map(order => ({
  ...order,
  date: order.date.toLocaleDateString("th-TH"),
}))

export default function Orders() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [selectedStatus, setSelectedStatus] = useState("ทั้งหมด")
  const filteredOrders =
    selectedStatus === "ทั้งหมด"
      ? formattedOrders
      : formattedOrders.filter(order => order.status === selectedStatus)

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
  const handleRowClick = (row: any) => {
    setSelectedOrder(row)
  }

  return (
    <div className="space-y-4">
      {selectedOrder ? (
        <OrderDetail
          order={selectedOrder}
          onBack={() => setSelectedOrder(null)}
        />
      ) : (
        <>
          <div className="flex flex-wrap gap-2 rounded-md bg-gray-100 p-2">
            {statusOptions.map(status => (
              <button
                key={status}
                className={`rounded-md px-2 py-1 text-sm sm:px-4 sm:py-2 sm:text-base ${
                  selectedStatus === status
                    ? "bg-[#1B4B66] text-white"
                    : "bg-transparent text-gray-600 hover:bg-gray-200"
                }`}
                onClick={() => {
                  setSelectedStatus(status)
                  setCurrentPage(1)
                }}
              >
                {status}
              </button>
            ))}
          </div>
          <div className="xs:max-w-none w-full max-w-[340px] overflow-x-auto sm:max-w-none md:max-w-none lg:max-w-none">
            <div className="w-max sm:w-full md:w-full lg:w-full">
              <Table
                data={filteredOrders}
                columns={columns}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                onRowClick={handleRowClick}
              />
            </div>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  )
}

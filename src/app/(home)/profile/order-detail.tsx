"use client"

import { useState } from "react"

import { Pagination } from "./paginate"
import Table from "./table"

export type Products = {
  id: number
  productImg: string
  productName: string
  productType: string
  price: number
  totalItem: number
  totalPrice: number
}

const columns = [
  {
    key: "productName",
    label: "ชื่อสินค้า",
    className: "w-[40%]",
    render: (row: any) => (
      <div className="flex items-center space-x-3">
        <img
          src={row.productImg}
          alt="สินค้า"
          className="h-12 w-12 rounded object-cover"
        />
        <div>
          <div className="font-medium">{row.productName}</div>
          <div className="text-xs text-gray-500">{row.productType}</div>
        </div>
      </div>
    ),
  },
  {
    key: "price",
    label: "ราคา",
    className: "w-[15%]",
    render: (row: any) => `${row.price.toLocaleString()} บาท`,
  },
  {
    key: "totalItem",
    label: "จำนวน",
    className: "w-[15%]",
    render: (row: any) => `${row.price.toLocaleString()} บาท`,
  },
  {
    key: "totalPrice",
    label: "ราคารวม",
    className: "w-[15%]",
    render: (row: any) => `${row.totalPrice.toLocaleString()} บาท`,
  },
]

const productList: Products[] = [
  {
    id: 1,
    productImg:
      "https://medthai.com/wp-content/uploads/2016/11/%E0%B8%8B%E0%B8%B5%E0%B8%A1%E0%B8%AD%E0%B8%A5.jpg",
    productName: "พารา",
    productType: "ยาสามัญ",
    price: 1000,
    totalItem: 3,
    totalPrice: 3000,
  },
]

export default function OrderDetail({
  order,
  onBack,
}: {
  order: any
  onBack: () => void
}) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const totalPages = Math.ceil(productList.length / itemsPerPage)

  return (
    <div className="space-y-6 p-4">
      <div>
        <button
          onClick={onBack}
          className="text-blue-500 transition-all hover:text-blue-700"
        >
          &larr; ย้อนกลับ
        </button>
      </div>

      <div className="sm:flex sm:justify-between">
        <h2 className="text-2xl font-bold text-[#1B4B66]">
          Order#{order.orderNumber}
        </h2>
        <div>
          <div className="mt-3 w-fit rounded bg-[#1B4B66] px-4 py-2 text-white sm:mt-0">
            จัดส่งสำเร็จแล้ว
          </div>
        </div>
      </div>
      <div className="xs:max-w-none w-full max-w-[340px] overflow-x-auto sm:max-w-none md:max-w-none lg:max-w-none">
        <div className="w-max sm:w-full md:w-full lg:w-full">
          <Table
            data={productList}
            columns={columns}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
          />
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      <div className="h-20"></div>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-10">
        <div className="space-y-2">
          <h3 className="font-bold">รายละเอียดคำสั่งซื้อ</h3>
          <hr />
          <div className="flex justify-between">
            <span>ราคาสินค้า</span>
            <span>119.69</span>
          </div>
          <div className="flex justify-between">
            <span>ส่วนลด</span>
            <span>-13.40</span>
          </div>
          <div className="flex justify-between">
            <span>ค่าจัดส่ง</span>
            <span>0.00</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>ราคารวมทั้งหมด</span>
            <span>106.29</span>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-bold">ที่อยู่</h3>
          <hr />
          <p>Vincent Lobo</p>
          <p>3068 Woodlawn Drive</p>
          <p>Milwaukee Ubon 34000 THAILAND</p>
          <p>098-672-5388</p>
        </div>
      </div>
    </div>
  )
}

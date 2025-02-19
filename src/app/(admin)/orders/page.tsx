"use client"

import { Button } from "@/ui/button"
import { Checkbox } from "@/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { DataTable } from "@/components/ui/table"

const payments: Orders[] = [
  {
    id: "a1b2c3d4",
    customerName: "สมชาย วัฒนธรรม",
    productName: "ออกแบบเว็บไซต์ร้านอาหาร",
    price: 15000,
    status: "success",
    date: new Date(2024, 0, 15),
    actionBy: "Admin1",
  },
  {
    id: "e5f6g7h8",
    customerName: "วิภา สงวนศิลป์",
    productName: "พัฒนาแอปมือถือ",
    price: 32000,
    status: "pending",
    date: new Date(2024, 2, 10),
    actionBy: "Admin1",
  },
  {
    id: "i9j1k2l3",
    customerName: "กิตติพงศ์ สมบูรณ์",
    productName: "บริการทำ SEO",
    price: 8500,
    status: "failed",
    date: new Date(2023, 10, 5),
    actionBy: "Admin1",
  },
  {
    id: "m4n5o6p7",
    customerName: "ณัฐกานต์ บัวทอง",
    productName: "ออกแบบโลโก้บริษัท",
    price: 5000,
    status: "success",
    date: new Date(2024, 5, 20),
    actionBy: "Admin1",
  },
  {
    id: "q8r9s1t2",
    customerName: "ปรีชา ทองดี",
    productName: "พัฒนาเว็บอีคอมเมิร์ซ",
    price: 28000,
    status: "pending",
    date: new Date(2023, 8, 12),
    actionBy: "Admin1",
  },
  {
    id: "u3v4w5x6",
    customerName: "สุพรรณี ชัยชนะ",
    productName: "จัดการโฆษณา Facebook",
    price: 12000,
    status: "success",
    date: new Date(2024, 3, 30),
    actionBy: "Admin1",
  },
  {
    id: "y7z8a9b1",
    customerName: "สมบัติ พูนสุข",
    productName: "ออกแบบ UI/UX แอปพลิเคชัน",
    price: 18000,
    status: "failed",
    date: new Date(2023, 6, 25),
    actionBy: "Admin1",
  },
  {
    id: "c2d3e4f5",
    customerName: "จิราพร วงศ์วาน",
    productName: "ถ่ายภาพสินค้า",
    price: 6000,
    status: "success",
    date: new Date(2024, 9, 15),
    actionBy: "Admin1",
  },
  {
    id: "g6h7i8j9",
    customerName: "อภิชาติ เรืองศรี",
    productName: "สร้างระบบจัดการสต๊อกสินค้า",
    price: 25000,
    status: "pending",
    date: new Date(2023, 11, 5),
    actionBy: "Admin1",
  },
  {
    id: "k1l2m3n4",
    customerName: "พิมพ์พิชชา แสงทอง",
    productName: "เขียนคอนเทนต์การตลาด",
    price: 9000,
    status: "success",
    date: new Date(2024, 7, 18),
    actionBy: "Admin1",
  },
]

export type Orders = {
  id: string
  customerName: string
  productName: string
  price: number
  date: Date
  status: "pending" | "processing" | "success" | "failed"
  actionBy: string
}

export const columns: ColumnDef<Orders>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "customerName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Customer Name
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("customerName")}</div>
    ),
  },
  {
    accessorKey: "productName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product Name
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("productName")}</div>
    ),
  },
  {
    accessorKey: "price",
    header: () => <div>Price</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"))

      const formatted = new Intl.NumberFormat("th-TH", {
        style: "currency",
        currency: "THB",
      }).format(price)

      return <div>{formatted}</div>
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = row.getValue("date") as Date
      const formatted = new Intl.DateTimeFormat("th-TH", {
        dateStyle: "medium",
      }).format(date)
      return <div>{formatted}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string

      const statusColors: Record<string, string> = {
        success: "text-green-500",
        pending: "text-yellow-500",
        processing: "text-blue-500",
        failed: "text-red-500",
      }
      const statusBgColors: Record<string, string> = {
        success: "bg-green-100 ",
        pending: "bg-yellow-100 ",
        processing: "bg-blue-100 ",
        failed: "bg-red-100 ",
      }

      return (
        <div className="flex items-center gap-2">
          <div
            className={`h-2 w-2 rounded-full ${statusBgColors[status]}`}
          ></div>
          <span className={`${statusColors[status]}`}>{status}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "actionBy",
    header: () => <div className="text-right">Action By</div>,
    cell: ({ row }) => {
      const actionBy = row.getValue("actionBy") as string
      return <div className="text-right">{actionBy}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>จัดการออเดอร์</DropdownMenuLabel>
            <DropdownMenuItem disabled>
              <span className="text-blue-500">รับออเดอร์</span>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <span className="text-green-500">จัดส่ง</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span className="text-red-500">ยกเลิก</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            {/* <DropdownMenuSeparator />
              <DropdownMenuLabel>ดูรายละเอียด</DropdownMenuLabel>
            <DropdownMenuItem>ลูกค้า</DropdownMenuItem>
            <DropdownMenuItem>การจ่ายเงิน</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function OrdersPage() {
  return <DataTable data={payments} columns={columns} />
}

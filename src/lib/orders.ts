// lib/orders.ts
export type OrderItem = {
  id: string
  status: string
  productName: string
  notes: string
  price: number
  quantity: number
  barcode: string
  stock: number
}

export type OrderDetail = {
  id: string
  customerName: string
  address: string
  items: OrderItem[]
  total: number
  paymentMethod: string
  status: "pending" | "processing" | "success" | "failed"
  date: string
  actionBy: string
  receiptUrl?: string
}

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
        stock: 27,
      },
      {
        id: "item2",
        productName: "ระบบจัดการหลังร้าน",
        price: 25000,
        quantity: 1,
        status: "pending",
        notes: "รองรับการจัดการสต็อกสินค้า",
        barcode: "/images/barcode.png",
        stock: 7,
      },
      {
        id: "item3",
        productName: "แอพพลิเคชันมือถือ",
        price: 35000,
        quantity: 1,
        status: "pending",
        notes: "iOS และ Android",
        barcode: "/images/barcode.png",
        stock: 0,
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
        barcode: "/images/barcode.png",
        stock: 0,
      },
      {
        id: "item5",
        productName: "ระบบ CRM",
        price: 30000,
        quantity: 1,
        status: "processing",
        notes: "เชื่อมต่อกับ Line OA",
        barcode: "/images/barcode.png",
        stock: 0,
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
        barcode: "/images/barcode.png",
        stock: 0,
      },
      {
        id: "item7",
        productName: "Content Writing",
        price: 5000,
        quantity: 10,
        status: "success",
        notes: "บทความ 10 ชิ้น",
        barcode: "/images/barcode.png",
        stock: 0,
      },
      {
        id: "item8",
        productName: "Social Media Management",
        price: 10000,
        quantity: 3,
        status: "pending",
        notes: "ดูแล 3 แพลตฟอร์ม",
        barcode: "/images/barcode.png",
        stock: 0,
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
        barcode: "/images/barcode.png",
        stock: 0,
      },
      {
        id: "item10",
        productName: "Chat Bot Development",
        price: 20000,
        quantity: 1,
        status: "failed",
        notes: "ระบบตอบกลับอัตโนมัติ",
        barcode: "/images/barcode.png",
        stock: 0,
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
        barcode: "/images/barcode.png",
        stock: 0,
      },
      {
        id: "item12",
        productName: "SSL Certificate",
        price: 2500,
        quantity: 1,
        status: "success",
        notes: "รับรอง 1 ปี",
        barcode: "/images/barcode.png",
        stock: 0,
      },
      {
        id: "item13",
        productName: "Cloud Hosting",
        price: 1500,
        quantity: 12,
        status: "processing",
        notes: "แพ็คเกจ Premium",
        barcode: "/images/barcode.png",
        stock: 0,
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

export const fetchOrderDetail = async (
  id: string
): Promise<OrderDetail | null> => {
  return mockOrders.find(order => order.id === id) || null
}

"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useCartStore } from "@/store/cart"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowRight,
  ChevronRight,
  Minus,
  PackageCheck,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react"

import OrderSummary from "@/components/order/summary"

export default function ListOrder() {
  const [mounted, setMounted] = useState(false)
  const { items, updateQuantity, removeItem } = useCartStore()

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  }

  if (items.length === 0) {
    return (
      <motion.div
        className="container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-[#1B4B66]">ตะกร้าสินค้า</h1>
          <div className="mt-2 text-sm text-muted-foreground">
            ไม่มีสินค้าในตะกร้า
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-card p-12 text-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.5,
            }}
            className="mb-6 rounded-full bg-blue-50 p-6"
          >
            <ShoppingBag className="h-12 w-12 text-[#1B4B66]" />
          </motion.div>
          <p className="mb-4 text-lg text-gray-700">ตะกร้าของคุณว่างเปล่า</p>
          <p className="mb-8 text-muted-foreground">
            เริ่มต้นช้อปปิ้งเพื่อเพิ่มสินค้าในตะกร้า
          </p>
          <Button
            size="lg"
            className="bg-[#1B4B66] px-8 hover:bg-[#16405A]"
            asChild
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link href="/" className="flex items-center gap-2">
                เลือกซื้อสินค้า <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </Button>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <div className="pb-[7rem] md:pb-5">
      <motion.div
        className="mb-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-4xl font-bold text-[#1B4B66]">ตะกร้าสินค้า</h1>
        <motion.div
          className="mt-2 flex items-center gap-2 text-sm text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <ShoppingBag className="h-4 w-4" />
          <span>{items.length} รายการในตะกร้า</span>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
        <motion.div
          className="md:col-span-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Desktop Table */}
          <motion.div
            className="hidden overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm sm:block"
            variants={itemVariants}
          >
            {/* Table Header */}
            <div className="flex w-full items-center justify-between bg-gradient-to-r from-[#1B4B66] to-[#2D6A8E] px-6 py-4 text-white">
              <div className="flex-[2] text-sm font-medium">ชื่อสินค้า</div>
              <div className="flex-1 text-center text-sm font-medium">ราคา</div>
              <div className="flex-1 text-center text-sm font-medium">
                จำนวน
              </div>
              <div className="flex-1 text-center text-sm font-medium">
                ราคารวม
              </div>
            </div>

            {/* Table Body */}
            <div className="max-h-[600px] overflow-y-auto">
              <AnimatePresence>
                {items.slice(0, 20).map(item => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="flex w-full items-center justify-between border-b border-gray-100 px-6 py-4 hover:bg-gray-50"
                  >
                    {/* Product Info */}
                    <div className="flex min-w-0 flex-[2] items-center gap-4">
                      <div className="flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-1 shadow-sm">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            className="aspect-square w-16 rounded-md object-contain"
                            width={80}
                            height={80}
                          />
                        ) : (
                          <div className="flex h-16 w-16 items-center justify-center bg-gray-200 text-xs text-gray-500">
                            No image
                          </div>
                        )}
                      </div>
                      <div className="w-full min-w-0">
                        <div className="overflow-hidden truncate text-ellipsis whitespace-nowrap font-medium text-gray-800">
                          {item.name}
                        </div>
                        <div className="mt-1 text-xs text-emerald-600">
                          เหลือ {item.quantity} ชิ้น
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 text-center font-medium text-gray-800">
                      ฿{item.price}
                    </div>

                    <div className="flex flex-1 justify-center">
                      <motion.div
                        className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-1 py-1 shadow-sm"
                        whileHover={{ scale: 1.05 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 20,
                        }}
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            item.quantity > 1
                              ? updateQuantity(item.id, item.quantity - 1)
                              : removeItem(item.id)
                          }
                          className="h-8 w-8 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>

                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={e =>
                            updateQuantity(item.id, parseInt(e.target.value))
                          }
                          className="h-8 w-12 border-0 text-center text-sm font-medium"
                        />

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="h-8 w-8 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </motion.div>
                    </div>

                    <div className="flex-1 text-center font-medium text-[#1B4B66]">
                      ฿{item.quantity * item.price}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Mobile View: Card Layout */}
          <motion.div
            className="space-y-4 sm:hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {items.slice(0, 20).map(item => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  layout
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="overflow-hidden rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex gap-4">
                    <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-1 shadow-sm">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          className="h-16 w-16 rounded-md object-cover"
                          width={60}
                          height={60}
                        />
                      ) : (
                        <div className="flex h-16 w-16 items-center justify-center bg-gray-200 text-xs text-gray-500">
                          No image
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-800">
                        {item.name}
                      </div>
                      <div className="mt-1 text-xs text-emerald-600">
                        เหลือ {item.quantity} ชิ้น
                      </div>
                      <div className="mt-2 text-sm font-medium text-[#1B4B66]">
                        ฿{item.price}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                    <div className="text-sm text-gray-700">
                      รวม:{" "}
                      <span className="font-bold text-[#1B4B66]">
                        ฿{item.quantity * item.price}
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <motion.div
                        className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-1 shadow-sm"
                        whileHover={{ scale: 1.05 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 20,
                        }}
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            item.quantity > 1
                              ? updateQuantity(item.id, item.quantity - 1)
                              : removeItem(item.id)
                          }
                          className="h-8 w-8 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>

                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={e =>
                            updateQuantity(item.id, parseInt(e.target.value))
                          }
                          className="h-8 w-12 border-0 text-center text-sm font-medium"
                        />

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="h-8 w-8 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-red-200 bg-red-50 text-red-500 hover:bg-red-100"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        <motion.div
          className="md:col-span-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <motion.div
            className="sticky top-[5rem] rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <OrderSummary />

              <div className="mt-6 hidden grid-cols-2 gap-3 md:grid">
                <Link href="/shipping" className="col-span-2">
                  <Button
                    className="w-full bg-[#1B4B66] hover:bg-[#16405A]"
                    size="lg"
                    asChild
                  >
                    <motion.div
                      className="flex w-full items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <PackageCheck className="h-5 w-5" />
                      <span>ยืนยันการสั่งซื้อ</span>
                    </motion.div>
                  </Button>
                </Link>
                <Link href="/" className="col-span-2">
                  <Button
                    className="w-full border-[#1B4B66] text-[#1B4B66] hover:bg-[#1B4B66] hover:text-white"
                    size="lg"
                    variant="outline"
                    asChild
                  >
                    <motion.div
                      className="flex w-full items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ShoppingBag className="h-5 w-5" />
                      <span>ช็อปปิ้งต่อ</span>
                    </motion.div>
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div
          className="fixed bottom-0 left-0 z-10 w-full bg-white p-4 drop-shadow-[0_-8px_20px_rgba(0,0,0,0.15)] md:hidden"
          initial={{ y: 130 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
        >
          <Button className="mb-2 flex h-14 w-full items-center justify-center bg-[#1B4B66] text-lg font-medium hover:bg-[#2D6F99]">
            <Link className="flex items-center" href={"/shipping"}>
              ยืนยันการสั่งซื้อ <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            variant={"outline"}
            className="flex h-14 w-full items-center justify-center bg-white text-lg font-medium"
          >
            <Link className="flex items-center" href={"/"}>
              ช็อปปิ้งต่อ <ShoppingBag className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

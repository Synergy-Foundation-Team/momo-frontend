"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form"
import { Input } from "@/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import {
  ChevronRight,
  CreditCard,
  MapPinHouse,
  ShoppingBag,
} from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import OrderSummary from "@/components/order/summary"

const schema = z.object({
  fullName: z.string().min(1, "กรุณากรอกชื่อ-นามสกุล"),
  phone: z.string().min(10, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง"),
  address: z.string().min(1, "กรุณากรอกที่อยู่"),
  road: z.string().optional(),
  subdistrict: z.string().min(1, "กรุณากรอกตำบล"),
  district: z.string().min(1, "กรุณากรอกอำเภอ"),
  province: z.string().min(1, "กรุณากรอกจังหวัด"),
  postalCode: z.string().min(5, "กรุณากรอกรหัสไปรษณีย์ให้ถูกต้อง"),
})

export default function ShippingAddress() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      phone: "",
      address: "",
      road: "",
      subdistrict: "",
      district: "",
      province: "",
      postalCode: "",
    },
    mode: "onChange",
  })

  // Check form validity on change
  useEffect(() => {
    setIsFormValid(form.formState.isValid)
  }, [form.formState.isValid])

  // form.watch(() => {
  //   setIsFormValid(form.formState.isValid)
  // })

  // Sample address for "Use my address" feature
  const myAddress = {
    fullName: "ชื่อของคุณ นามสกุลของคุณ",
    phone: "0812345678",
    address: "บ้านเลขที่ 123",
    road: "ถนนตัวอย่าง",
    subdistrict: "ตำบลตัวอย่าง",
    district: "อำเภอตัวอย่าง",
    province: "จังหวัดตัวอย่าง",
    postalCode: "10000",
  }

  function useMyAddress() {
    form.reset(myAddress)
  }
  const handleNavigate = () => {
    if (isFormValid && !isSubmitting) {
      router.push("/payment")
    }
  }
  function onSubmit() {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      // Navigate to payment page
      handleNavigate()
    }, 1000)
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  }

  return (
    <div className="mx-auto mb-[80px] mt-6 max-w-7xl px-4 sm:mb-4 sm:px-6">
      <div className="mb-8 flex items-center justify-between rounded-lg bg-gradient-to-r from-[#1B4B66] to-[#2D6F99] p-4 text-white">
        <h1 className="text-2xl font-semibold">ที่อยู่จัดส่ง</h1>
        <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
          <Button
            variant="outline"
            onClick={useMyAddress}
            className="border-none bg-white font-medium text-[#1B4B66] hover:bg-blue-50"
          >
            <MapPinHouse className="mr-2 h-5 w-5" /> ใช้ที่อยู่ของฉัน
          </Button>
        </motion.div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-[#1B4B66]">
                        ชื่อ-นามสกุล
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="กรุณากรอกชื่อ-นามสกุล"
                          className="transition-all duration-300 focus-visible:ring-[#1B4B66]"
                        />
                      </FormControl>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-[#1B4B66]">
                        เบอร์โทรศัพท์
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="กรุณากรอกเบอร์โทรศัพท์"
                          className="transition-all duration-300 focus-visible:ring-[#1B4B66]"
                        />
                      </FormControl>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-[#1B4B66]">
                        ที่อยู่
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="กรุณากรอกที่อยู่"
                          className="transition-all duration-300 focus-visible:ring-[#1B4B66]"
                        />
                      </FormControl>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="road"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-[#1B4B66]">
                        ถนน (ถ้ามี)
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="กรุณากรอกถนน"
                          className="transition-all duration-300 focus-visible:ring-[#1B4B66]"
                        />
                      </FormControl>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
              </motion.div>

              <div className="grid grid-cols-2 gap-4">
                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="subdistrict"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium text-[#1B4B66]">
                          ตำบล
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="กรุณากรอกตำบล"
                            className="transition-all duration-300 focus-visible:ring-[#1B4B66]"
                          />
                        </FormControl>
                        <FormMessage className="text-sm text-red-500" />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="district"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium text-[#1B4B66]">
                          อำเภอ
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="กรุณากรอกอำเภอ"
                            className="transition-all duration-300 focus-visible:ring-[#1B4B66]"
                          />
                        </FormControl>
                        <FormMessage className="text-sm text-red-500" />
                      </FormItem>
                    )}
                  />
                </motion.div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="province"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium text-[#1B4B66]">
                          จังหวัด
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="กรุณากรอกจังหวัด"
                            className="transition-all duration-300 focus-visible:ring-[#1B4B66]"
                          />
                        </FormControl>
                        <FormMessage className="text-sm text-red-500" />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium text-[#1B4B66]">
                          รหัสไปรษณีย์
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="กรุณากรอกรหัสไปรษณีย์"
                            className="transition-all duration-300 focus-visible:ring-[#1B4B66]"
                          />
                        </FormControl>
                        <FormMessage className="text-sm text-red-500" />
                      </FormItem>
                    )}
                  />
                </motion.div>
              </div>

              <motion.div
                variants={itemVariants}
                className="pt-4"
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  type="submit"
                  className="mt-4 hidden h-12 w-full items-center justify-center bg-[#1B4B66] text-lg font-medium transition-all duration-300 hover:bg-[#2D6F99] md:flex"
                  disabled={!isFormValid || isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="mr-2 h-5 w-5 rounded-full border-2 border-white border-t-transparent"
                      />
                      กำลังดำเนินการ...
                    </div>
                  ) : (
                    <>
                      ยืนยันที่อยู่ <ChevronRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </Form>
        </div>

        <div className="hidden md:block">
          <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
            <OrderSummary />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <Button
              className="rounded-lg bg-[#1B4B66] py-3 font-medium text-white"
              disabled={!isFormValid || isSubmitting}
              onClick={onSubmit}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="mr-2 h-5 w-5 rounded-full border-2 border-white border-t-transparent"
                  />
                  กำลังดำเนินการ...
                </div>
              ) : (
                <>
                  <CreditCard className="mr-2 h-5 w-5" /> ชำระเงิน
                </>
              )}
            </Button>
            <Link href="/cart" className="block">
              <Button className="flex w-full items-center justify-center rounded-lg bg-gray-100 py-3 font-medium text-[#1B4B66]">
                <ShoppingBag className="mr-2 h-5 w-5" /> ตะกร้าสินค้า
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <motion.div
        className="fixed bottom-0 left-0 z-10 w-full bg-white p-4 drop-shadow-[0_-8px_20px_rgba(0,0,0,0.15)] md:hidden"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
      >
        <Button
          onClick={form.handleSubmit(onSubmit)}
          className="flex h-14 w-full items-center justify-center bg-[#1B4B66] text-lg font-medium hover:bg-[#2D6F99]"
          disabled={!isFormValid || isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="mr-2 h-5 w-5 rounded-full border-2 border-white border-t-transparent"
              />
              กำลังดำเนินการ...
            </div>
          ) : (
            <>
              ยืนยันที่อยู่และถัดไป <ChevronRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>

        <div className="mt-3 flex justify-between text-sm text-gray-600">
          <Link href="/cart" className="flex items-center">
            <ShoppingBag className="mr-1 h-4 w-4" /> ตะกร้าสินค้า
          </Link>
          <Link href="#" className="flex items-center">
            ดูสรุปคำสั่งซื้อ <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

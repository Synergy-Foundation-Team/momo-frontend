"use client"

import { useEffect, useState } from "react"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/ui/button"
import { ArrowLeft, Check, CreditCard, Download, Share2 } from "lucide-react"

import OrderDetail from "@/components/order/orderDetail"
import OrderSummary from "@/components/order/summary"

export default function PaymentPage() {
  const [mounted, setMounted] = useState(false)
  const [isPaymentConfirming, setIsPaymentConfirming] = useState(false)
  const [showQRSaveOptions, setShowQRSaveOptions] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handlePaymentConfirmation = () => {
    setIsPaymentConfirming(true)
    setTimeout(() => {
      window.location.href = "/ordered"
    }, 1500)
  }

  const toggleQRSaveOptions = () => {
    setShowQRSaveOptions(!showQRSaveOptions)
  }

  if (!mounted) return null

  return (
    <>
      <Head>
        <title>ชำระเงิน | ร้านค้าออนไลน์ของคุณ</title>
        <meta
          name="description"
          content="ชำระเงินง่ายๆ ผ่าน PromptPay ด้วย QR Code เพื่อความสะดวกและปลอดภัยในการสั่งซื้อของคุณ"
        />
        <meta property="og:title" content="ชำระเงิน | ร้านค้าออนไลน์ของคุณ" />
        <meta
          property="og:description"
          content="สแกน QR Code เพื่อชำระเงินผ่าน PromptPay ได้อย่างง่ายดาย"
        />
        <meta property="og:image" content="/images/qr-code-payments.svg" />
        <meta property="og:url" content="https://yourstore.com/payment" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main className="container mx-auto mb-20 px-4 py-8 sm:mb-0">
        <header className="mb-8 flex items-center justify-between rounded-lg bg-gradient-to-r from-[#1B4B66] to-[#2D6F99] p-4 text-white">
          <h1 className="text-2xl font-semibold">ชำระเงิน</h1>
          <Link href="/shipping">
            <Button
              variant="outline"
              className="border-none bg-white font-medium text-[#1B4B66] hover:bg-blue-50"
            >
              <ArrowLeft className="mr-2 h-5 w-5" /> กลับไปแก้ไขที่อยู่
            </Button>
          </Link>
        </header>

        <section className="grid gap-8 lg:grid-cols-3">
          <article className="space-y-4 rounded-lg border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="flex items-center text-lg font-semibold text-[#1B4B66]">
              <CreditCard className="mr-2 h-5 w-5" /> ช่องทางการชำระเงิน
            </h2>

            <div className="flex flex-col items-center justify-center gap-6 rounded-lg bg-gradient-to-b from-[#F1F1F1] to-[#F9F9F9] p-8">
              <figure className="relative aspect-square h-48 flex-shrink-0 overflow-hidden rounded-lg border-8 border-white shadow-md">
                <Image
                  src="/images/qr-code-payments.svg"
                  alt="QR Code สำหรับชำระเงินผ่าน PromptPay"
                  fill
                  className="object-cover"
                />
              </figure>

              <figcaption className="max-w-md text-center">
                <h2 className="mb-2 text-lg font-medium text-[#1B4B66]">
                  กรุณาสแกนรหัส QR โดยใช้แอป Mobile Banking
                </h2>
                <p className="text-gray-600">
                  ที่รองรับการดำเนินการชำระเงินผ่าน PromptPay 
                </p>
              </figcaption>
            </div>

            <div className="space-y-2">
              <Button
                onClick={toggleQRSaveOptions}
                className="w-full"
                variant="outline"
                size="lg"
              >
                <Download className="mr-2 h-5 w-5" /> บันทึกรูปภาพ QR Code
              </Button>

              {showQRSaveOptions && (
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="text-sm">
                    <Download className="mr-2 h-4 w-4" /> ดาวน์โหลดรูปภาพ
                  </Button>
                  <Button variant="outline" size="sm" className="text-sm">
                    <Share2 className="mr-2 h-4 w-4" /> แชร์ QR Code
                  </Button>
                </div>
              )}
            </div>

            <Button
              onClick={handlePaymentConfirmation}
              className="h-14 w-full bg-[#1B4B66] text-lg font-medium text-white hover:bg-[#2D6F99]"
              disabled={isPaymentConfirming}
            >
              {isPaymentConfirming ? (
                "กำลังยืนยันการชำระเงิน..."
              ) : (
                <>
                  <Check className="mr-2 h-5 w-5" /> ยืนยันการชำระเงิน
                </>
              )}
            </Button>

            <section className="mt-4 rounded-lg bg-blue-50 p-4 text-sm text-[#1B4B66]">
              <h3 className="mb-1 font-medium">คำแนะนำการชำระเงิน:</h3>
              <ul className="list-disc pl-5">
                <li>เปิดแอปธนาคารของคุณ</li>
                <li>เลือกฟังก์ชันสแกน QR Code</li>
                <li>สแกน QR Code ที่แสดงด้านบน</li>
                <li>ตรวจสอบจำนวนเงินและยืนยันการชำระเงิน</li>
              </ul>
            </section>
          </article>

          <aside className="space-y-4">
            <OrderDetail />
            <OrderSummary />
          </aside>
        </section>
      </main>
      <footer className="fixed bottom-0 left-0 w-full bg-white shadow-md sm:hidden">
        <div className="container mx-auto flex items-center justify-between p-4">
          <Button
            onClick={handlePaymentConfirmation}
            className="h-14 flex-1 bg-[#1B4B66] text-lg font-medium text-white hover:bg-[#2D6F99]"
            disabled={isPaymentConfirming}
          >
            {isPaymentConfirming ? (
              "กำลังยืนยัน..."
            ) : (
              <>
                <Check className="mr-2 h-5 w-5" /> ยืนยันชำระเงิน
              </>
            )}
          </Button>
        </div>
      </footer>
    </>
  )
}

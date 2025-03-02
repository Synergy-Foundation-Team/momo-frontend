"use client"

import { useEffect } from "react"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/ui/button"
import { Card, CardContent } from "@/ui/card"
import { Check, Package, ShoppingBag, Star, Truck } from "lucide-react"

export default function OrderSuccess() {
  // Track page view for analytics
  useEffect(() => {
    // This could be connected to your analytics service
    if (typeof window !== "undefined") {
      // Example tracking code
      console.log("Order success page viewed")
    }
  }, [])

  // Order details - could come from context/props in a real app
  const orderNumber = "ORD-2025-3872"
  const orderDate = new Date().toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <>
      <Head>
        <title>สั่งซื้อสำเร็จ | ขอบคุณสำหรับคำสั่งซื้อของคุณ</title>
        <meta
          name="description"
          content="การสั่งซื้อของคุณเสร็จสมบูรณ์แล้ว ขอบคุณที่เลือกช้อปกับเรา ติดตามการจัดส่งและเรียกดูรายละเอียดการสั่งซื้อได้ที่นี่"
        />
        <meta
          property="og:title"
          content="สั่งซื้อสำเร็จ | ขอบคุณสำหรับคำสั่งซื้อของคุณ"
        />
        <meta
          property="og:description"
          content="การสั่งซื้อของคุณเสร็จสมบูรณ์แล้ว ติดตามการจัดส่งและรับส่วนลดพิเศษสำหรับการสั่งซื้อครั้งต่อไปของคุณ"
        />
        <meta property="og:image" content="/images/order-success.jpg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://yourstore.com/order-success" />
      </Head>

      <main
        className="flex min-h-screen flex-col items-center bg-white px-4 py-10"
        itemScope
        itemType="https://schema.org/OrderConfirmationPage"
      >
        {/* Header Bar with Improved Gradient */}
        <header className="mb-8 w-full max-w-xl rounded-lg bg-gradient-to-r from-[#1B4B66] via-[#246080] to-[#2D6F99] p-5 text-white shadow-lg">
          <h1 className="text-center text-2xl font-semibold" itemProp="name">
            การสั่งซื้อสำเร็จแล้ว
          </h1>
        </header>

        {/* Success Animation and Message */}
        <section
          className="mb-8 w-full max-w-xl text-center"
          itemProp="description"
        >
          <div className="flex justify-center">
            <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-2 border-[#1B4B66] bg-gradient-to-br from-blue-50 to-blue-100 shadow-md">
              <Check size={54} className="text-[#1B4B66]" strokeWidth={2.5} />
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-[#1B4B66]">
              สั่งซื้อสินค้าเรียบร้อยแล้ว!
            </h2>
            <p className="mt-2 text-gray-600">
              คำสั่งซื้อของคุณได้รับการดำเนินการเรียบร้อยแล้ว
              และกำลังจัดส่งถึงคุณในไม่ช้า
            </p>
          </div>

          {/* Order Details Card - Improving user value */}
          <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4 text-left">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">หมายเลขคำสั่งซื้อ</p>
                <p
                  className="font-medium text-[#1B4B66]"
                  itemProp="orderNumber"
                >
                  {orderNumber}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">วันที่สั่งซื้อ</p>
                <p className="font-medium text-[#1B4B66]" itemProp="orderDate">
                  {orderDate}
                </p>
              </div>
            </div>
            <div className="mt-3 border-t border-gray-200 pt-3">
              <div className="flex items-center gap-2 text-green-600">
                <Truck size={16} />
                <span className="text-sm font-medium">
                  คาดว่าจะจัดส่งภายใน 2-3 วันทำการ
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Buttons with improved styling */}
        <section className="mt-2 w-full max-w-xl space-y-4">
          <Link href="/cart" className="block w-full">
            <Button className="h-14 w-full bg-[#1B4B66] text-lg font-medium text-white shadow-md transition-all duration-300 hover:bg-[#2D6F99]">
              <Package className="mr-2 h-5 w-5" />
              รายละเอียดการสั่งซื้อ
            </Button>
          </Link>
          <Link href="/" className="block w-full">
            <Button
              variant="outline"
              className="h-14 w-full border border-[#1B4B66] text-[#1B4B66] transition-all duration-300 hover:bg-blue-50"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              ช๊อปปิ้งต่อ
            </Button>
          </Link>
        </section>

        {/* Product Recommendations with Improved Design */}
        <section
          className="mt-12 w-full max-w-xl"
          itemProp="recommendedProducts"
        >
          <div className="mb-5 flex items-center justify-between">
            <h3 className="flex items-center text-lg font-semibold text-[#1B4B66]">
              <Star className="mr-2 h-5 w-5" />
              สินค้าที่คุณอาจสนใจ
            </h3>
            <Link
              href="/recommendations"
              className="text-sm text-[#2D6F99] hover:underline"
            >
              ดูทั้งหมด
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
            {[
              {
                src: "https://placehold.co/240x240",
                alt: "White Hat Premium - หมวกแฟชั่นคุณภาพสูง",
                name: "White Hat Premium",
                price: "฿980",
                rating: 4.8,
                reviews: 124,
              },
              {
                src: "https://placehold.co/240x240",
                alt: "Original Tee - เสื้อยืดคอกลมคุณภาพดี",
                name: "Original Tee",
                price: "฿590",
                rating: 4.5,
                reviews: 89,
              },
              {
                src: "https://placehold.co/240x240",
                alt: "Classic Hoodie - เสื้อฮู้ดสไตล์คลาสสิค",
                name: "Classic Hoodie",
                price: "฿1,290",
                rating: 4.9,
                reviews: 56,
                hidden: true,
              },
            ].map((product, index) => (
              <div
                key={index}
                className={`${product.hidden ? "hidden md:block" : ""}`}
                itemScope
                itemType="https://schema.org/Product"
              >
                <Card className="w-full border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md">
                  <CardContent className="p-3">
                    <div className="overflow-hidden rounded-lg">
                      <Image
                        src={product.src}
                        alt={product.alt}
                        width={240}
                        height={240}
                        className="w-full rounded-lg object-cover transition-transform duration-300 hover:scale-105"
                        itemProp="image"
                      />
                    </div>
                    <div className="mt-3">
                      <p
                        className="text-sm font-medium text-[#1B4B66]"
                        itemProp="name"
                      >
                        {product.name}
                      </p>
                      <p
                        className="mt-1 font-bold text-gray-700"
                        itemProp="offers"
                        itemScope
                        itemType="https://schema.org/Offer"
                      >
                        <span itemProp="price">{product.price}</span>
                      </p>
                      <div className="mt-1 flex items-center">
                        <div className="flex items-center text-amber-400">
                          <Star size={14} fill="currentColor" />
                          <span
                            className="ml-1 text-xs text-gray-600"
                            itemProp="aggregateRating"
                            itemScope
                            itemType="https://schema.org/AggregateRating"
                          >
                            <span itemProp="ratingValue">{product.rating}</span>
                            <span className="ml-1 text-gray-400">
                              ({product.reviews})
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </section>

        {/* Coupon Section - Adding value */}
        <section className="mt-12 w-full max-w-xl">
          <div className="rounded-lg bg-gradient-to-r from-[#1B4B66] to-[#2D6F99] p-5 text-white">
            <div className="flex flex-col items-center text-center">
              <h3 className="mb-2 text-lg font-semibold">
                ขอบคุณสำหรับการสั่งซื้อ!
              </h3>
              <p className="mb-3 text-sm">
                คุณได้รับแต้มสะสนในการซื้อครั้งนี้จำนวน 10 แต้ม
              </p>
              <div className="rounded bg-white px-6 py-2 tracking-wider text-[#1B4B66]">
                แต้มสะสมทั้งหมด <span className="font-bold">20</span> แต้ม
              </div>
            </div>
          </div>
        </section>

        {/* Footer with Social Sharing - Enhancing virality */}
        <footer className="mt-12 w-full max-w-xl border-t border-gray-200 pt-6">
          <div className="text-center">
            <p className="mb-3 text-sm text-gray-500">
              แชร์ประสบการณ์การช้อปปิ้งของคุณ
            </p>
            <div className="flex justify-center space-x-4">
              {["facebook", "twitter", "line", "instagram"].map(platform => (
                <Link
                  key={platform}
                  href={`#share-${platform}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-[#1B4B66] transition-colors duration-300 hover:bg-[#1B4B66] hover:text-white"
                >
                  <span className="sr-only">Share on {platform}</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </footer>
      </main>

      {/* Mobile Footer Button */}
      <div className="fixed bottom-0 left-0 w-full bg-white drop-shadow sm:hidden">
        <div className="container mx-auto flex items-center justify-between p-4">
          <Link href="/" className="w-full">
            <Button className="h-14 w-full bg-[#1B4B66] text-lg font-medium text-white hover:bg-[#2D6F99]">
              <ShoppingBag className="mr-2 h-5 w-5" />
              ช๊อปปิ้งต่อ
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}

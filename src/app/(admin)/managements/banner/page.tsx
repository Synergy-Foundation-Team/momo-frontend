"use client"
import React from "react"

// import BannerUploader from "@/components/BannerUploader"
import BannerUploader from "@/components/bannerUploader/BannerUploader"

export default function Banner() {
  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">จัดการแบนเนอร์</h1>
      <BannerUploader />
    </div>
  )
}

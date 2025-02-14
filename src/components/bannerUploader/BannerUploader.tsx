"use client"

import React, { useRef, useState } from "react"
import { Button } from "@/ui/button"
import { Card } from "@/ui/card"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog"
import { Loader2 } from "lucide-react"

export default function BannerUploader() {
  const [mainBanner, setMainBanner] = useState<string | null>(null)
  const [secondBanner, setSecondBanner] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const mainInputRef = useRef<HTMLInputElement | null>(null)
  const secondInputRef = useRef<HTMLInputElement | null>(null)

  const resizeImage = (
    file: File,
    callback: (resizedDataUrl: string) => void
  ) => {
    const img = new Image()
    img.src = URL.createObjectURL(file)
    img.onload = () => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Set canvas size to 1284x400
      canvas.width = 1284
      canvas.height = 400

      // Calculate scaling to maintain aspect ratio
      const scale = Math.max(1284 / img.width, 400 / img.height)
      const newWidth = img.width * scale
      const newHeight = img.height * scale

      // Center the image on canvas
      const offsetX = (1284 - newWidth) / 2
      const offsetY = (400 - newHeight) / 2

      ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight)

      // Convert canvas to Data URL and return
      callback(canvas.toDataURL("image/jpeg", 0.9))
    }
  }

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "main" | "second"
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    resizeImage(file, resizedDataUrl => {
      if (type === "main") setMainBanner(resizedDataUrl)
      else setSecondBanner(resizedDataUrl)
    })
  }

  const handleSave = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setShowConfirm(false)
      alert("บันทึกแบนเนอร์เรียบร้อยแล้ว!")
    }, 2000)
  }

  return (
    <div className="space-y-4 pb-20">
      {/* Main Banner */}
      <Card className="p-4">
        <h2 className="mb-2 text-lg font-semibold">แบนเนอร์หลัก</h2>
        <div
          className="relative flex h-40 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-500"
          onClick={() => mainInputRef.current?.click()}
        >
          {mainBanner ? (
            <>
              <img
                src={mainBanner}
                alt="Main Banner"
                className="h-full w-full rounded-md object-cover"
              />
              <Button
                className="absolute right-2 top-[-20px] bg-[#FF5465] text-white"
                size="sm"
                onClick={e => {
                  e.stopPropagation()
                  mainInputRef.current?.click()
                }}
              >
                แก้ไขรูปภาพ
              </Button>
            </>
          ) : (
            <span className="text-lg text-gray-500">+ เพิ่มรูปภาพ</span>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          ref={mainInputRef}
          className="hidden"
          onChange={e => handleImageUpload(e, "main")}
        />
      </Card>

      {/* Second Banner */}
      <Card className="p-4">
        <h2 className="mb-2 text-lg font-semibold">แบนเนอร์รอง</h2>
        <div
          className="relative flex h-40 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-500"
          onClick={() => secondInputRef.current?.click()}
        >
          {secondBanner ? (
            <>
              <img
                src={secondBanner}
                alt="Second Banner"
                className="h-full w-full rounded-md object-cover"
              />
              <Button
                className="absolute right-2 top-[-20px] bg-[#FF5465] text-white"
                size="sm"
                onClick={e => {
                  e.stopPropagation()
                  secondInputRef.current?.click()
                }}
              >
                แก้ไขรูปภาพ
              </Button>
            </>
          ) : (
            <span className="text-lg text-gray-500">+ เพิ่มรูปภาพ</span>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          ref={secondInputRef}
          className="hidden"
          onChange={e => handleImageUpload(e, "second")}
        />
      </Card>

      {/* Save Button Fixed at Bottom */}
      <div className="">
        <Button
          className="w-full"
          onClick={() => setShowConfirm(true)}
          disabled={loading}
        >
          {loading ? <Loader2 className="mr-2 animate-spin" /> : null}
          {loading ? "กำลังบันทึก..." : "บันทึก"}
        </Button>
      </div>

      {/* Confirm Dialog */}
      {showConfirm && (
        <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>ยืนยันการบันทึก</DialogTitle>
            </DialogHeader>
            <p>คุณต้องการบันทึกแบนเนอร์ที่เลือกใช่หรือไม่?</p>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowConfirm(false)}>
                ยกเลิก
              </Button>
              <Button onClick={handleSave} disabled={loading}>
                {loading ? <Loader2 className="mr-2 animate-spin" /> : null}
                {loading ? "กำลังบันทึก..." : "ยืนยัน"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

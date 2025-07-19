"use client"

import React, { useRef, useState } from "react"
import Image from "next/image"
import ReactCrop, { Crop } from "react-image-crop"

import "react-image-crop/dist/ReactCrop.css"

import { Button } from "@/ui/button"
import { Card } from "@/ui/card"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog"
import { DialogDescription } from "@radix-ui/react-dialog"

type BannerType = "main" | "secondary"

export default function BannerUploader() {
  const [banners, setBanners] = useState<{
    [key in BannerType]: string | null
  }>({
    main: null,
    secondary: null,
  })
  const [cropImages, setCropImages] = useState<{
    [key in BannerType]: string | null
  }>({
    main: null,
    secondary: null,
  })
  const [showCropper, setShowCropper] = useState<{
    [key in BannerType]: boolean
  }>({
    main: false,
    secondary: false,
  })
  const [currentBanner, setCurrentBanner] = useState<BannerType | null>(null)
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 80,
    height: 20,
    // aspect: 1284 / 400, // Maintain aspect ratio
    x: 0,
    y: 0,
  })
  const imgRef = useRef<HTMLImageElement | null>(null)
  const inputRefs = {
    main: useRef<HTMLInputElement | null>(null),
    secondary: useRef<HTMLInputElement | null>(null),
  }

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    bannerType: BannerType
  ) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setCropImages(prev => ({
        ...prev,
        [bannerType]: reader.result as string,
      }))
      setCurrentBanner(bannerType)
      setShowCropper(prev => ({ ...prev, [bannerType]: true }))
    }
  }

  const getCroppedImg = () => {
    if (!imgRef.current || !currentBanner) return

    const image = imgRef.current
    const canvas = document.createElement("canvas")
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    canvas.width = 1284
    canvas.height = 400
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const cropX = crop.x ? crop.x * scaleX : 0
    const cropY = crop.y ? crop.y * scaleY : 0
    const cropWidth = crop.width ? crop.width * scaleX : image.naturalWidth
    const cropHeight = crop.height ? crop.height * scaleY : image.naturalHeight

    ctx.drawImage(image, cropX, cropY, cropWidth, cropHeight, 0, 0, 1284, 400)

    const croppedDataUrl = canvas.toDataURL("image/jpeg", 0.9)
    setBanners(prev => ({ ...prev, [currentBanner]: croppedDataUrl }))
    setShowCropper(prev => ({ ...prev, [currentBanner]: false }))
  }

  return (
    <div className="space-y-4 pb-20">
      {(["main", "secondary"] as BannerType[]).map(bannerType => (
        <Card
          key={bannerType}
          className="p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          <h2 className="mb-2 text-lg font-semibold">
            {bannerType === "main" ? "แบนเนอร์หลัก" : "แบนเนอร์รอง"}{" "}
            <span className="text-sm text-gray-400">(1024x400)</span>
          </h2>
          <div
            className="relative flex h-40 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-500"
            onClick={() => inputRefs[bannerType].current?.click()}
          >
            {banners[bannerType] ? (
              <div className="relative h-full w-full">
                <Image
                  src={banners[bannerType]!}
                  alt={`${bannerType} banner`}
                  layout="fill"
                  objectFit="cover"
                />
                <Button
                  className="absolute right-[70px] top-[-20px] text-white"
                  size="sm"
                  onClick={e => {
                    e.stopPropagation()
                    inputRefs[bannerType].current?.click()
                  }}
                >
                  แก้ไขรูปภาพ
                </Button>
                <Button
                  className="absolute right-2 top-[-20px] bg-[#FF5465] text-white"
                  size="sm"
                  onClick={e => {
                    setBanners(prev => ({ ...prev, [bannerType]: null }))
                    e.stopPropagation()
                  }}
                >
                  ลบ
                </Button>
              </div>
            ) : (
              <span className="text-lg text-gray-500">+ อัพโหลดรูปภาพ</span>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            ref={inputRefs[bannerType]}
            className="hidden"
            onChange={e => handleImageUpload(e, bannerType)}
          />
        </Card>
      ))}

      {/* Cropper Dialog */}
      {currentBanner && showCropper[currentBanner] && (
        <Dialog
          open={showCropper[currentBanner]}
          onOpenChange={() =>
            setShowCropper(prev => ({ ...prev, [currentBanner]: false }))
          }
        >
          <DialogContent className="max-fit w-[90vw] bg-white">
            <DialogHeader>
              <DialogTitle>ครอบตัดรูปภาพ</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="relative flex w-full justify-center bg-gray-200">
              {cropImages[currentBanner] && (
                <ReactCrop
                  // src={cropImages[currentBanner]!}
                  crop={crop}
                  onChange={setCrop}
                  aspect={1284 / 400}
                >
                  <Image
                    ref={imgRef}
                    src={cropImages[currentBanner]!}
                    alt="Crop preview"
                    width={1284}
                    height={400}
                  />
                </ReactCrop>
              )}
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() =>
                  setShowCropper(prev => ({ ...prev, [currentBanner]: false }))
                }
              >
                ยกเลิก
              </Button>
              <Button onClick={getCroppedImg}>บันทึก</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

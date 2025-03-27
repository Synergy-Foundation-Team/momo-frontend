"use client"

import { useEffect, useState } from "react"
import { useAddressStore } from "@/store/address"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import { Textarea } from "@/ui/text-area"

export default function Addresses() {
  const {
    addressLine1,
    addressLine2,
    subdistrict,
    district,
    province,
    postalCode,
    country,
    addressType,
    landmark,
    setAddress,
  } = useAddressStore()

  const [isEditing, setIsEditing] = useState(false)
  const [mounted, setMounted] = useState(false)

  const [tempAddress, setTempAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    subdistrict: "",
    district: "",
    province: "",
    postalCode: "",
    country: "",
    addressType: "",
    landmark: "",
  })

  useEffect(() => {
    setMounted(true)
    initAddress()
  }, [
    addressLine1,
    addressLine2,
    subdistrict,
    district,
    province,
    postalCode,
    country,
    addressType,
    landmark,
  ])

  const initAddress = () => {
    setTempAddress({
      addressLine1: addressLine1 ?? "",
      addressLine2: addressLine2 ?? "",
      subdistrict: subdistrict ?? "",
      district: district ?? "",
      province: province ?? "",
      postalCode: postalCode ?? "",
      country: country ?? "",
      addressType: addressType ?? "",
      landmark: landmark ?? "",
    })
  }

  if (!mounted) return null

  const handleEdit = () => {
    setIsEditing(true)
    initAddress()
  }

  const handleCancel = () => {
    setIsEditing(false)
    initAddress()
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setAddress(tempAddress)
    setIsEditing(false)
  }

  const handleChange =
    (key: keyof typeof tempAddress) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setTempAddress({ ...tempAddress, [key]: e.target.value })
    }

  const requiredLabel = (label: string) => (
    <div className="flex gap-1">
      <div>{label}</div>
      <div className="text-red-700">*</div>
    </div>
  )

  const renderInput = (
    id: string,
    label: string,
    isRequired = false,
    placeholder: string = ""
  ) => (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {isRequired ? requiredLabel(label) : <div>{label}</div>}
      </Label>
      <Input
        id={id}
        value={tempAddress[id as keyof typeof tempAddress]}
        onChange={handleChange(id as keyof typeof tempAddress)}
        className="bg-[#F1F1F1]"
        disabled={!isEditing}
        placeholder={placeholder}
        required={isRequired}
      />
    </div>
  )

  const renderTextarea = (
    id: string,
    label: string,
    isRequired = false,
    placeholder: string = ""
  ) => (
    <div className="space-y-2">
      <Label htmlFor={id}>{isRequired ? requiredLabel(label) : label}</Label>
      <Textarea
        id={id}
        value={tempAddress[id as keyof typeof tempAddress]}
        onChange={handleChange(id as keyof typeof tempAddress)}
        className="bg-[#F1F1F1]"
        disabled={!isEditing}
        placeholder={placeholder}
        required={isRequired}
      />
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={handleSave} className="mx-auto max-w-2xl space-y-8">
        <div className="grid grid-cols-1 gap-6">
          {renderTextarea("addressLine1", "ที่อยู่ 1", true)}
          {renderTextarea("addressLine2", "ที่อยู่ 2")}
        </div>
        <div className="grid grid-cols-2 gap-6">
          {renderInput("subdistrict", "ตำบล", true, "ตำบล")}
          {renderInput("district", "อำเภอ", true, "อำเภอ")}
        </div>
        <div className="grid grid-cols-2 gap-6">
          {renderInput("province", "จังหวัด", true, "จังหวัด")}
          {renderInput("postalCode", "รหัสไปรษณีย์", true, "รหัสไปรษณีย์")}
        </div>
        <div className="grid grid-cols-2 gap-6">
          {renderInput("country", "เมือง", true)}
          {renderInput("addressType", "ประเภทที่อยู่อาศัย")}
        </div>
        <div className="grid grid-cols-1 gap-6">
          {renderTextarea(
            "landmark",
            "หมายเหตุ",
            false,
            "กรณีต้องการ ระบุหมายเหตุเพิ่มเติม"
          )}
        </div>
        <div className="flex justify-end space-x-4">
          {!isEditing ? (
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={handleEdit}
            >
              แก้ไขข้อมูล
            </Button>
          ) : (
            <>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={handleCancel}
              >
                ยกเลิก
              </Button>
              <Button
                type="submit"
                className="bg-[#1B4B66] hover:bg-[#1B4B66]/90"
                size="lg"
              >
                บันทึก
              </Button>
            </>
          )}
        </div>
      </form>
    </div>
  )
}

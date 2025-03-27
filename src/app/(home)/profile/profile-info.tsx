"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useProfileStore } from "@/store/profile"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"

import { PointCard } from "@/components/display/PointCard"

export default function ProfileInfo() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const {
    firstName,
    lastName,
    phone,
    email,
    idCard,
    points,
    expiryDate,
    setProfile,
  } = useProfileStore()

  const [isEditing, setIsEditing] = useState(false)
  const [tempProfile, setTempProfile] = useState({
    firstName: firstName || "",
    lastName: lastName || "",
    idCard: idCard || "",
    phone: phone || "",
    email: email || "",
  })

  useEffect(() => {
    setMounted(true)
    setTempProfile({
      firstName: firstName || "",
      lastName: lastName || "",
      idCard: idCard || "",
      phone: phone || "",
      email: email || "",
    })
  }, [firstName, lastName, phone, email])

  if (!mounted) return null

  const formatPhoneNumber = (phone: string = "") => {
    const cleaned = phone.replace(/\D/g, "").slice(0, 10)

    if (cleaned.length <= 3) {
      return cleaned
    } else if (cleaned.length <= 6) {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`
    } else {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
    }
  }

  const formatIdCard = (idCard: string = "") => {
    const cleaned = idCard.replace(/\D/g, "").slice(0, 13)

    if (cleaned.length <= 1) {
      return cleaned
    } else if (cleaned.length <= 5) {
      return `${cleaned.slice(0, 1)}-${cleaned.slice(1)}`
    } else if (cleaned.length <= 10) {
      return `${cleaned.slice(0, 1)}-${cleaned.slice(1, 5)}-${cleaned.slice(5)}`
    } else if (cleaned.length <= 12) {
      return `${cleaned.slice(0, 1)}-${cleaned.slice(1, 5)}-${cleaned.slice(5, 10)}-${cleaned.slice(10)}`
    } else {
      return `${cleaned.slice(0, 1)}-${cleaned.slice(1, 5)}-${cleaned.slice(5, 10)}-${cleaned.slice(10, 12)}-${cleaned.slice(12)}`
    }
  }

  const handleIdCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 13)
    setTempProfile(prev => ({ ...prev, idCard: value }))
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 10)
    setTempProfile(prev => ({ ...prev, phone: value }))
  }

  const handleEdit = () => {
    setIsEditing(true)
    setTempProfile({ firstName, lastName, idCard, phone, email })
  }

  const handleCancel = () => {
    setIsEditing(false)
    setTempProfile({ firstName, lastName, idCard, phone, email })
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setProfile(tempProfile)
    setIsEditing(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={handleSave} className="mx-auto max-w-2xl">
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">ชื่อ</Label>
              <Input
                id="firstName"
                value={tempProfile.firstName}
                onChange={e =>
                  setTempProfile({ ...tempProfile, firstName: e.target.value })
                }
                placeholder="ใส่ชื่อ"
                className="bg-[#F1F1F1]"
                required
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">นามสกุล</Label>
              <Input
                id="lastName"
                value={tempProfile.lastName}
                onChange={e =>
                  setTempProfile({ ...tempProfile, lastName: e.target.value })
                }
                placeholder="ใส่นามสกุล"
                className="bg-[#F1F1F1]"
                required
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="idCard">เลขบัตรประชาชน</Label>
              <Input
                id="idCard"
                value={formatIdCard(tempProfile.idCard)}
                onChange={handleIdCardChange}
                placeholder="1-2345-67890-12-3"
                className="bg-[#F1F1F1]"
                required
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">อีเมล</Label>
              <Input
                id="email"
                type="email"
                value={tempProfile.email}
                onChange={e =>
                  setTempProfile({ ...tempProfile, email: e.target.value })
                }
                placeholder="example@email.com"
                className="bg-[#F1F1F1]"
                required
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="phone">เบอร์โทรศัพท์</Label>
              <Input
                id="phone"
                value={formatPhoneNumber(tempProfile.phone)}
                onChange={handlePhoneChange}
                placeholder="123-456-7890"
                className="bg-[#F1F1F1]"
                required
                disabled={!isEditing}
              />
            </div>
            <div className="mt-[28px] flex items-center space-x-2">
              <Input
                id="userStatus"
                type="checkbox"
                checked={true}
                disabled
                className="flex h-6 w-6 items-center justify-center rounded-md border"
              />
              <Label htmlFor="phone">เป็นร้านยา</Label>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="mb-4 text-lg font-semibold text-[#1B4B66]">
              แต้มสะสมของคุณ
            </h2>
            <PointCard
              points={points}
              expiryDate={expiryDate}
              memberName={
                isEditing
                  ? `${tempProfile.firstName} ${tempProfile.lastName}`
                  : `${firstName} ${lastName}`
              }
              phone={isEditing ? tempProfile.phone : phone}
            />
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
        </div>
      </form>
    </div>
  )
}

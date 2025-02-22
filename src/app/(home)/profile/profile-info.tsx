'use client'

import { Input } from '@/ui/input'
import { Label } from '@/ui/label'
import { useProfileStore } from '@/store/profile'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { PointCard } from '@/components/display/PointCard'
import { Button } from '@/ui/button'

export default function ProfileInfo() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const { firstName, lastName, phone, email, points, expiryDate, setProfile } = useProfileStore()

  const [isEditing, setIsEditing] = useState(false)
  const [tempProfile, setTempProfile] = useState({
    firstName: firstName || "", 
    lastName: lastName || "",
    phone: phone || "",
    email: email || ""
  })

  useEffect(() => {
    setMounted(true)
    setTempProfile({
      firstName: firstName || "",
      lastName: lastName || "",
      phone: phone || "",
      email: email || ""
    })
  }, [firstName, lastName, phone, email])

  if (!mounted) return null

  const formatPhoneNumber = (phone: string = "") => {
    const cleaned = phone.replace(/\D/g, "").slice(0, 10);
  
    if (cleaned.length <= 3) {
      return cleaned;
    } else if (cleaned.length <= 6) {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    } else {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setTempProfile((prev) => ({ ...prev, phone: value }));
  };

  const handleEdit = () => {
    setIsEditing(true)
    setTempProfile({ firstName, lastName, phone, email })
  }

  const handleCancel = () => {
    setIsEditing(false)
    setTempProfile({ firstName, lastName, phone, email })
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
                onChange={(e) => setTempProfile({ ...tempProfile, firstName: e.target.value })}
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
                onChange={(e) => setTempProfile({ ...tempProfile, lastName: e.target.value })}
                placeholder="ใส่นามสกุล"
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
            <div className="space-y-2">
              <Label htmlFor="email">อีเมล</Label>
              <Input
                id="email"
                type="email"
                value={tempProfile.email}
                onChange={(e) => setTempProfile({ ...tempProfile, email: e.target.value })}
                placeholder="example@email.com"
                className="bg-[#F1F1F1]"
                required
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="mt-8">
            <h2 className="mb-4 text-lg font-semibold text-[#1B4B66]">แต้มสะสมของคุณ</h2>
            <PointCard 
              points={points} 
              expiryDate={expiryDate}
              memberName={isEditing ? `${tempProfile.firstName} ${tempProfile.lastName}` : `${firstName} ${lastName}`}
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

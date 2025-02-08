'use client'

import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Label } from '@/ui/label'
import Image from 'next/image'
import { useProfileStore } from '@/store/profile'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { PointCard } from '@/components/display/PointCard'

export default function ProfilePage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const { firstName, lastName, phone, email, points, expiryDate, setProfile } =
    useProfileStore()

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would make an API call here
    alert('บันทึกข้อมูลเรียบร้อย')
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <div className="container mx-auto px-4 py-8">


      <form onSubmit={handleSubmit} className="mx-auto max-w-2xl">
        <div className="space-y-8">
          {/* Personal Information */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">ชื่อ</Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setProfile({ firstName: e.target.value })}
                placeholder="ใส่ชื่อ"
                className="bg-[#F1F1F1]"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">นามสกุล</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setProfile({ lastName: e.target.value })}
                placeholder="ใส่นามสกุล"
                className="bg-[#F1F1F1]"
                required
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="phone">เบอร์โทรศัพท์</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setProfile({ phone: e.target.value })}
                placeholder="123-456-7890"
                className="bg-[#F1F1F1]"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">อีเมล</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setProfile({ email: e.target.value })}
                placeholder="example@email.com"
                className="bg-[#F1F1F1]"
                required
              />
            </div>
          </div>

          {/* Point Card */}
          <div className="mt-8">
            <h2 className="mb-4 text-lg font-semibold text-[#1B4B66]">แต้มสะสมของคุณ</h2>
            <PointCard 
              points={points} 
              expiryDate={expiryDate}
              memberName={`${firstName} ${lastName}`}
            />
          </div>

          {/* <div className="flex justify-end space-x-4">
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
          </div> */}
        </div>
      </form>
    </div>
  )
}
import Image from 'next/image'

interface PointCardProps {
  points: number
  expiryDate: string
  memberName?: string
}

export function PointCard({ points, expiryDate, memberName = 'คุณไม่ไป ร้านรวย' }: PointCardProps) {
  return (
    <div className="relative aspect-[1.8/1] w-full overflow-hidden rounded-2xl bg-[#6FDDDC] p-4" style={{ background: 'linear-gradient(180deg, #D8FEF2 0%, #02C0D2 100%)' }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10" />

      {/* Logo */}
      <div className="absolute ml-[-16px]">
        <Image
          src="/images/transparent-logo.svg"
          alt="MoMo Logo"
          width={120}
          height={60}
          className="h-10 w-auto sm:h-12 md:h-12 lg:h-20"
          priority
        />
      </div>

      {/* Points Display */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 transform space-y-1">
        <div className="text-5xl font-bold text-[#1B4B66]">{points}</div>
        <div className="text-lg font-medium text-[#1B4B66]">คะแนนสะสม</div>
      </div>

      {/* Member Info */}
      <div className="absolute bottom-6 left-6 right-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-sm text-[#1B4B66] opacity-80">ชื่อสมาชิก</div>
            <div className="font-medium text-[#1B4B66]">{memberName}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-[#1B4B66] opacity-80">เบอร์โทร</div>
            <div className="font-medium text-[#1B4B66]">{expiryDate}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

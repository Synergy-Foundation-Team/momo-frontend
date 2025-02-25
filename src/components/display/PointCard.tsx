import Image from "next/image"

interface PointCardProps {
  points: number
  expiryDate: string
  memberName?: string
  phone?: string
}

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

export function PointCard({
  points,
  expiryDate,
  memberName = "คุณไม่ไป ร้านรวย",
  phone,
}: PointCardProps) {
  return (
    <div className="flex items-center justify-center">
      <div
        className="relative aspect-[1.8/1] w-full max-w-[450px] overflow-hidden rounded-2xl bg-[#6FDDDC] p-4"
        style={{
          background: "linear-gradient(180deg, #D8FEF2 0%, #02C0D2 100%)",
        }}
      >
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

        <div className="flex h-full flex-col justify-around">
          {/* right-6 text-right */}
          <div className="flex w-full justify-end">
            <div className="flex flex-col">
              <div className="text-4xl font-bold text-[#1B4B66] md:text-5xl lg:text-5xl">
                {points}
              </div>
              <div className="text-lg font-medium text-[#1B4B66]">
                คะแนนสะสม
              </div>
            </div>
          </div>

          {/* Member Info */}
          <div className="">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <div className="text-sm text-[#1B4B66] opacity-80">
                  ชื่อสมาชิก
                </div>
                <div className="truncate font-medium text-[#1B4B66]">
                  {memberName}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-[#1B4B66] opacity-80">
                  เบอร์โทร
                </div>
                <div className="font-medium text-[#1B4B66]">
                  {formatPhoneNumber(phone)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

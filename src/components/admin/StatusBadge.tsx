// components/StatusBadge.tsx
import { AlertCircle, CheckCircle, Clock, XCircle } from "lucide-react"

const statusConfig = {
  pending: { icon: Clock, color: "bg-yellow-100 text-yellow-700" },
  processing: { icon: AlertCircle, color: "bg-blue-100 text-blue-700" },
  success: { icon: CheckCircle, color: "bg-green-100 text-green-700" },
  failed: { icon: XCircle, color: "bg-red-100 text-red-700" },
}

export const StatusBadge = ({
  status,
}: {
  status: "pending" | "processing" | "success" | "failed"
}) => {
  const { icon: Icon, color } = statusConfig[status]

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium ${color}`}
    >
      <Icon size={16} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

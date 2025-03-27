"use client"

interface TableProps {
  data: any[]
  columns: {
    key: string
    label: string
    render?: (row: any) => React.ReactNode
    className?: string
  }[]
  currentPage: number
  itemsPerPage: number
  onRowClick?: (row: any) => void
}

export default function Table({
  data,
  columns,
  currentPage,
  itemsPerPage,
  onRowClick,
}: TableProps) {
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse text-left shadow-md">
        <thead className="sticky top-0 z-10 border-b border-gray-300 bg-gray-100 text-gray-600">
          <tr>
            {columns.map(col => (
              <th key={col.key} className="px-4 py-3">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row, index) => (
              <tr
                key={index}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => onRowClick && onRowClick(row)}
              >
                {columns.map(col => (
                  <td
                    key={col.key}
                    className={`px-4 py-3 ${col.className || ""}`}
                  >
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-4 py-3 text-center">
                ไม่พบข้อมูล
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

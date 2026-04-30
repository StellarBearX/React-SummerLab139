import { useExpenses } from '../hooks/useExpenses'
import { exportToCSV } from '../utils/csvExport'

const CATEGORY_EMOJI = {
  อาหาร: '🍜',
  เดินทาง: '🚗',
  ช้อปปิ้ง: '🛍️',
  สุขภาพ: '💊',
  ความบันเทิง: '🎬',
  บ้าน: '🏠',
  การศึกษา: '📚',
  'อื่นๆ': '📌',
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 2,
  }).format(amount)
}

function formatDate(dateStr) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function ExpenseList({ onEdit }) {
  const { expenses, deleteExpense } = useExpenses()

  // Sort: ใหม่สุดก่อน
  const sorted = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date))

  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
        <p className="text-4xl mb-3">🧾</p>
        <p className="text-gray-500 font-medium">ยังไม่มีรายการ</p>
        <p className="text-sm text-gray-400 mt-1">เพิ่มรายจ่ายแรกของคุณได้เลย!</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          📋 รายการทั้งหมด
          <span className="text-sm font-normal text-gray-400">({expenses.length} รายการ)</span>
        </h2>
        <button
          onClick={() => exportToCSV(expenses)}
          className="flex items-center gap-2 text-sm bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-medium px-4 py-2 rounded-xl transition"
        >
          <span>📥</span> Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-left">
              <th className="px-6 py-3 font-medium">รายการ</th>
              <th className="px-4 py-3 font-medium">หมวดหมู่</th>
              <th className="px-4 py-3 font-medium">วันที่</th>
              <th className="px-4 py-3 font-medium text-right">จำนวนเงิน</th>
              <th className="px-4 py-3 font-medium text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {sorted.map((expense) => (
              <tr key={expense.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-3.5 font-medium text-gray-800">{expense.name}</td>
                <td className="px-4 py-3.5">
                  <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 text-xs font-medium px-2.5 py-1 rounded-full">
                    {CATEGORY_EMOJI[expense.category] || '📌'} {expense.category}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-gray-500">{formatDate(expense.date)}</td>
                <td className="px-4 py-3.5 text-right font-semibold text-rose-600">
                  {formatCurrency(expense.amount)}
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onEdit(expense)}
                      className="text-xs px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 font-medium transition"
                    >
                      ✏️ แก้ไข
                    </button>
                    <button
                      onClick={() => deleteExpense(expense.id)}
                      className="text-xs px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 font-medium transition"
                    >
                      🗑️ ลบ
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

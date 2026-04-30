import { useExpenses } from '../hooks/useExpenses'

const CARD_CONFIG = [
  {
    label: 'ยอดรายจ่ายทั้งหมด',
    key: 'totalExpenses',
    icon: '💸',
    colorClass: 'text-rose-600',
    bgClass: 'bg-rose-50',
    borderClass: 'border-rose-100',
  },
  {
    label: 'งบประมาณที่ตั้ง',
    key: 'budget',
    icon: '🎯',
    colorClass: 'text-indigo-600',
    bgClass: 'bg-indigo-50',
    borderClass: 'border-indigo-100',
  },
  {
    label: 'งบคงเหลือ',
    key: 'remaining',
    icon: '💰',
    dynamic: true,
  },
  {
    label: 'จำนวนรายการ',
    key: 'count',
    icon: '📋',
    colorClass: 'text-violet-600',
    bgClass: 'bg-violet-50',
    borderClass: 'border-violet-100',
  },
]

function formatCurrency(amount) {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 2,
  }).format(amount)
}

export default function Dashboard() {
  const { totalExpenses, budget, remaining, expenses } = useExpenses()

  const dataMap = {
    totalExpenses,
    budget,
    remaining,
    count: expenses.length,
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {CARD_CONFIG.map((card) => {
        const value = dataMap[card.key]
        const isRemaining = card.dynamic
        const isNegative = isRemaining && remaining < 0

        const colorClass = isRemaining
          ? isNegative ? 'text-red-600' : 'text-emerald-600'
          : card.colorClass
        const bgClass = isRemaining
          ? isNegative ? 'bg-red-50' : 'bg-emerald-50'
          : card.bgClass
        const borderClass = isRemaining
          ? isNegative ? 'border-red-100' : 'border-emerald-100'
          : card.borderClass

        return (
          <div
            key={card.key}
            className={`rounded-2xl border ${borderClass} ${bgClass} p-5 flex flex-col gap-2 shadow-sm`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 font-medium">{card.label}</span>
              <span className="text-xl">{card.icon}</span>
            </div>
            <p className={`text-2xl font-bold tracking-tight ${colorClass}`}>
              {card.key === 'count'
                ? `${value} รายการ`
                : formatCurrency(value)}
            </p>
            {isRemaining && isNegative && (
              <p className="text-xs text-red-500 font-medium">⚠️ เกินงบประมาณ!</p>
            )}
            {isRemaining && budget === 0 && (
              <p className="text-xs text-gray-400">ยังไม่ได้ตั้งงบประมาณ</p>
            )}
          </div>
        )
      })}
    </div>
  )
}

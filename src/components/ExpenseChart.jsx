import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { useExpenses } from '../hooks/useExpenses'

const COLORS = [
  '#6366f1', // indigo
  '#f43f5e', // rose
  '#10b981', // emerald
  '#f59e0b', // amber
  '#8b5cf6', // violet
  '#06b6d4', // cyan
  '#84cc16', // lime
  '#94a3b8', // slate
]

// Custom Tooltip สำหรับ Recharts
function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl shadow-lg px-4 py-3">
        <p className="font-semibold text-gray-800 text-sm">{label}</p>
        <p className="text-indigo-600 font-bold text-base mt-0.5">
          ฿{payload[0].value.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
        </p>
      </div>
    )
  }
  return null
}

export default function ExpenseChart() {
  const { expenses } = useExpenses()

  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
          📊 สรุปตามหมวดหมู่
        </h2>
        <div className="flex flex-col items-center justify-center h-40 text-gray-400">
          <p className="text-3xl mb-2">📈</p>
          <p className="text-sm">เพิ่มรายจ่ายเพื่อดูกราฟ</p>
        </div>
      </div>
    )
  }

  // Group by category แล้ว sum amount
  const categoryMap = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + Number(e.amount)
    return acc
  }, {})

  const chartData = Object.entries(categoryMap)
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total) // เรียงจากมากไปน้อย

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
        📊 สรุปรายจ่ายตามหมวดหมู่
      </h2>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={chartData}
          margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
          barCategoryGap="35%"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis
            dataKey="category"
            tick={{ fontSize: 12, fill: '#6b7280' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `฿${v >= 1000 ? (v / 1000).toFixed(0) + 'k' : v}`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
          <Bar dataKey="total" radius={[8, 8, 0, 0]}>
            {chartData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

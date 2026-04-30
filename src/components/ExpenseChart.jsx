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
import styles from './ExpenseChart.module.css'

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

// Custom Tooltip สำหรับ Recharts — ใช้ CSS Module เพื่อป้องกัน class ชนกัน
function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className={styles.tooltip}>
        <p className={styles.tooltipLabel}>{label}</p>
        <p className={styles.tooltipValue}>
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
      <div className={styles.card}>
        <h2 className={styles.title}>📊 สรุปตามหมวดหมู่</h2>
        <div className={styles.empty}>
          <p className={styles.emptyIcon}>📈</p>
          <p className={styles.emptyText}>เพิ่มรายจ่ายเพื่อดูกราฟ</p>
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
    .sort((a, b) => b.total - a.total)

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>📊 สรุปรายจ่ายตามหมวดหมู่</h2>
      <div className={styles.chartWrapper}>
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
    </div>
  )
}

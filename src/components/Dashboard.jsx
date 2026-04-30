import { useExpenses } from '../hooks/useExpenses'
import styles from './Dashboard.module.css'

// Map จาก key → CSS Module class สำหรับสีแต่ละ card
const CARD_CONFIG = [
  {
    label: 'ยอดรายจ่ายทั้งหมด',
    key: 'totalExpenses',
    icon: '💸',
    colorClass: styles.colorRose,
    bgClass: styles.bgRose,
  },
  {
    label: 'งบประมาณที่ตั้ง',
    key: 'budget',
    icon: '🎯',
    colorClass: styles.colorIndigo,
    bgClass: styles.bgIndigo,
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
    colorClass: styles.colorViolet,
    bgClass: styles.bgViolet,
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
    <div className={styles.grid}>
      {CARD_CONFIG.map((card) => {
        const value = dataMap[card.key]
        const isRemaining = card.dynamic
        const isNegative = isRemaining && remaining < 0

        const colorClass = isRemaining
          ? isNegative ? styles.colorRed : styles.colorEmerald
          : card.colorClass
        const bgClass = isRemaining
          ? isNegative ? styles.bgRed : styles.bgEmerald
          : card.bgClass

        return (
          <div key={card.key} className={`${styles.card} ${bgClass}`}>
            <div className={styles.cardHeader}>
              <span className={styles.cardLabel}>{card.label}</span>
              <span className={styles.cardIcon}>{card.icon}</span>
            </div>
            <p className={`${styles.cardValue} ${colorClass}`}>
              {card.key === 'count'
                ? `${value} รายการ`
                : formatCurrency(value)}
            </p>
            {isRemaining && isNegative && (
              <p className={styles.cardWarning}>⚠️ เกินงบประมาณ!</p>
            )}
            {isRemaining && budget === 0 && (
              <p className={styles.cardHint}>ยังไม่ได้ตั้งงบประมาณ</p>
            )}
          </div>
        )
      })}
    </div>
  )
}

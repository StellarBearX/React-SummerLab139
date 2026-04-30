import { useState } from 'react'
import { useExpenses } from '../hooks/useExpenses'
import styles from './BudgetSetter.module.css'

export default function BudgetSetter() {
  const { budget, setBudget } = useExpenses()
  const [inputValue, setInputValue] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    const val = Number(inputValue)
    if (val >= 0) {
      setBudget(val)
      setInputValue('')
      setIsEditing(false)
    }
  }

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>🎯 ตั้งงบประมาณ</h2>

      {!isEditing ? (
        <div className={styles.displayRow}>
          <div>
            <p className={styles.budgetLabel}>งบประมาณปัจจุบัน</p>
            <p className={styles.budgetAmount}>
              {budget > 0
                ? new Intl.NumberFormat('th-TH', {
                    style: 'currency',
                    currency: 'THB',
                  }).format(budget)
                : 'ยังไม่ได้ตั้ง'}
            </p>
          </div>
          <button
            onClick={() => {
              setInputValue(budget > 0 ? String(budget) : '')
              setIsEditing(true)
            }}
            className={styles.editBtn}
          >
            {budget > 0 ? '✏️ แก้ไข' : '+ ตั้งงบ'}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="ใส่งบประมาณ (บาท)"
            min="0"
            autoFocus
            className={styles.input}
          />
          <button type="submit" className={styles.saveBtn}>
            บันทึก
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className={styles.cancelBtn}
          >
            ยกเลิก
          </button>
        </form>
      )}
    </div>
  )
}

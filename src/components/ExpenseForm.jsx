import { useState, useEffect } from 'react'
import { useExpenses } from '../hooks/useExpenses'
import { CATEGORIES } from '../context/ExpenseContext'
import styles from './ExpenseForm.module.css'

const EMPTY_FORM = {
  name: '',
  amount: '',
  category: CATEGORIES[0],
  date: new Date().toISOString().split('T')[0],
}

export default function ExpenseForm({ editingExpense, onCancelEdit }) {
  const { addExpense, editExpense } = useExpenses()
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})

  // ถ้ามี editingExpense ให้โหลดข้อมูลเข้า form
  useEffect(() => {
    if (editingExpense) {
      setForm({
        name: editingExpense.name,
        amount: editingExpense.amount,
        category: editingExpense.category,
        date: editingExpense.date,
      })
    } else {
      setForm(EMPTY_FORM)
    }
    setErrors({})
  }, [editingExpense])

  function validate() {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = 'กรุณาใส่ชื่อรายการ'
    if (!form.amount || Number(form.amount) <= 0) newErrors.amount = 'กรุณาใส่จำนวนเงินที่ถูกต้อง'
    if (!form.date) newErrors.date = 'กรุณาเลือกวันที่'
    return newErrors
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const expense = { ...form, amount: Number(form.amount) }

    if (editingExpense) {
      editExpense({ ...expense, id: editingExpense.id })
      onCancelEdit()
    } else {
      addExpense(expense)
      setForm(EMPTY_FORM)
    }
  }

  const isEditing = Boolean(editingExpense)

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>
        {isEditing ? '✏️ แก้ไขรายการ' : '➕ เพิ่มรายจ่าย'}
      </h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* ชื่อรายการ */}
        <div className={styles.field}>
          <label className={styles.label}>ชื่อรายการ</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="เช่น ข้าวกล่อง, BTS, ยา..."
            className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
          />
          {errors.name && <p className={styles.errorMsg}>{errors.name}</p>}
        </div>

        {/* จำนวนเงิน */}
        <div className={styles.field}>
          <label className={styles.label}>จำนวนเงิน (บาท)</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="0.00"
            min="0"
            step="0.01"
            className={`${styles.input} ${errors.amount ? styles.inputError : ''}`}
          />
          {errors.amount && <p className={styles.errorMsg}>{errors.amount}</p>}
        </div>

        {/* หมวดหมู่ */}
        <div className={styles.field}>
          <label className={styles.label}>หมวดหมู่</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className={styles.select}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* วันที่ */}
        <div className={styles.field}>
          <label className={styles.label}>วันที่</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className={`${styles.input} ${errors.date ? styles.inputError : ''}`}
          />
          {errors.date && <p className={styles.errorMsg}>{errors.date}</p>}
        </div>

        {/* Buttons */}
        <div className={styles.actions}>
          <button type="submit" className={styles.submitBtn}>
            {isEditing ? 'บันทึกการแก้ไข' : 'เพิ่มรายการ'}
          </button>
          {isEditing && (
            <button type="button" onClick={onCancelEdit} className={styles.cancelBtn}>
              ยกเลิก
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

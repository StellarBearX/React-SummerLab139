import { useState, useEffect } from 'react'
import { useExpenses } from '../hooks/useExpenses'
import { CATEGORIES } from '../context/ExpenseContext'

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
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
        {isEditing ? '✏️ แก้ไขรายการ' : '➕ เพิ่มรายจ่าย'}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* ชื่อรายการ */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ชื่อรายการ
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="เช่น ข้าวกล่อง, BTS, ยา..."
            className={`w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${
              errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'
            }`}
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>

        {/* จำนวนเงิน */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            จำนวนเงิน (บาท)
          </label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="0.00"
            min="0"
            step="0.01"
            className={`w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${
              errors.amount ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'
            }`}
          />
          {errors.amount && <p className="text-xs text-red-500 mt-1">{errors.amount}</p>}
        </div>

        {/* หมวดหมู่ */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            หมวดหมู่
          </label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* วันที่ */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            วันที่
          </label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className={`w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${
              errors.date ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'
            }`}
          />
          {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-1">
          <button
            type="submit"
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl transition text-sm shadow-sm"
          >
            {isEditing ? 'บันทึกการแก้ไข' : 'เพิ่มรายการ'}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="px-5 bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold py-2.5 rounded-xl transition text-sm"
            >
              ยกเลิก
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

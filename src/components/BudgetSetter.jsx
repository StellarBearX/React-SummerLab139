import { useState } from 'react'
import { useExpenses } from '../hooks/useExpenses'

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
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        🎯 ตั้งงบประมาณ
      </h2>

      {!isEditing ? (
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">งบประมาณปัจจุบัน</p>
            <p className="text-2xl font-bold text-indigo-600 mt-0.5">
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
            className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium text-sm rounded-xl transition"
          >
            {budget > 0 ? '✏️ แก้ไข' : '+ ตั้งงบ'}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="ใส่งบประมาณ (บาท)"
            min="0"
            autoFocus
            className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
          <button
            type="submit"
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl transition"
          >
            บันทึก
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm rounded-xl transition"
          >
            ยกเลิก
          </button>
        </form>
      )}
    </div>
  )
}

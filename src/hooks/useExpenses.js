import { useContext } from 'react'
import { ExpenseContext } from '../context/ExpenseContext'

/**
 * useExpenses — Custom Hook สำหรับเข้าถึง ExpenseContext
 *
 * แทนที่จะ import ExpenseContext + useContext ในทุก component
 * ใช้ hook นี้แทนเพื่อ:
 * 1. ลด boilerplate code
 * 2. แสดง error ชัดเจนเมื่อใช้นอก Provider
 * 3. เปลี่ยน context implementation ได้โดยไม่กระทบ components
 */
export function useExpenses() {
  const context = useContext(ExpenseContext)
  if (!context) {
    throw new Error('useExpenses ต้องใช้ภายใน <ExpenseProvider>')
  }
  return context
}

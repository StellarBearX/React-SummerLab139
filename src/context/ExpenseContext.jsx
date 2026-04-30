import { createContext, useReducer, useEffect } from 'react'

// ─── Constants ──────────────────────────────────────────────────────────────
export const CATEGORIES = [
  'อาหาร',
  'เดินทาง',
  'ช้อปปิ้ง',
  'สุขภาพ',
  'ความบันเทิง',
  'บ้าน',
  'การศึกษา',
  'อื่นๆ',
]

const STORAGE_KEY = 'expenseTrackerState'

// ─── Initial State ────────────────────────────────────────────────────────────
function getInitialState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch {
    // ถ้า parse ไม่ได้ให้ใช้ค่าเริ่มต้น
  }
  return { expenses: [], budget: 0 }
}

// ─── Reducer ─────────────────────────────────────────────────────────────────
/**
 * expenseReducer จัดการ state ของแอปทั้งหมดผ่าน action types:
 *
 * ADD_EXPENSE    → เพิ่ม expense ใหม่เข้า array (immutable concat)
 * DELETE_EXPENSE → กรองเอา expense ที่มี id ตรงออก (filter)
 * EDIT_EXPENSE   → แทนที่ expense ใน array ด้วย spread (map)
 * SET_BUDGET     → อัปเดต budget ตัวเลขเดียว
 *
 * ทุก case คืนค่า state ใหม่ (ไม่ mutate ของเดิม) ทำให้ React
 * detect การเปลี่ยนแปลงได้ถูกต้องและ re-render เฉพาะส่วนที่เปลี่ยน
 */
function expenseReducer(state, action) {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return {
        ...state,
        expenses: [action.payload, ...state.expenses],
      }

    case 'DELETE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.filter((e) => e.id !== action.payload),
      }

    case 'EDIT_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.map((e) =>
          e.id === action.payload.id ? { ...e, ...action.payload } : e
        ),
      }

    case 'SET_BUDGET':
      return {
        ...state,
        budget: Number(action.payload),
      }

    default:
      return state
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────
export const ExpenseContext = createContext(null)

// ─── Provider ─────────────────────────────────────────────────────────────────
export function ExpenseProvider({ children }) {
  const [state, dispatch] = useReducer(expenseReducer, undefined, getInitialState)

  // Sync state → localStorage ทุกครั้งที่ state เปลี่ยน
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  // Helper actions (ห่อ dispatch ให้ใช้งานง่าย)
  function addExpense(expense) {
    dispatch({
      type: 'ADD_EXPENSE',
      payload: { ...expense, id: crypto.randomUUID() },
    })
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE_EXPENSE', payload: id })
  }

  function editExpense(expense) {
    dispatch({ type: 'EDIT_EXPENSE', payload: expense })
  }

  function setBudget(amount) {
    dispatch({ type: 'SET_BUDGET', payload: amount })
  }

  // Derived values
  const totalExpenses = state.expenses.reduce((sum, e) => sum + Number(e.amount), 0)
  const remaining = state.budget - totalExpenses

  const value = {
    expenses: state.expenses,
    budget: state.budget,
    totalExpenses,
    remaining,
    addExpense,
    deleteExpense,
    editExpense,
    setBudget,
  }

  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
}

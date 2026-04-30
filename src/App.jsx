import { useState } from 'react'
import { ExpenseProvider } from './context/ExpenseContext'
import Dashboard from './components/Dashboard'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import ExpenseChart from './components/ExpenseChart'
import BudgetSetter from './components/BudgetSetter'

export default function App() {
  const [editingExpense, setEditingExpense] = useState(null)

  return (
    <ExpenseProvider>
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">💼</span>
              <div>
                <h1 className="text-lg font-bold text-gray-900 leading-tight">
                  Personal Expense Tracker
                </h1>
                <p className="text-xs text-gray-400">ติดตามรายจ่ายของคุณ</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 hidden sm:block">
              {new Date().toLocaleDateString('th-TH', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">

          {/* Dashboard Summary Cards */}
          <Dashboard />

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Left Column: Form + Budget */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              <BudgetSetter />
              <ExpenseForm
                editingExpense={editingExpense}
                onCancelEdit={() => setEditingExpense(null)}
              />
            </div>

            {/* Right Column: Chart + List */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <ExpenseChart />
              <ExpenseList onEdit={setEditingExpense} />
            </div>

          </div>
        </main>

        {/* Footer */}
        <footer className="text-center py-6 text-xs text-gray-400 border-t border-gray-100 mt-8">
          Personal Expense Tracker • ข้อมูลถูกบันทึกในอุปกรณ์ของคุณ (localStorage)
        </footer>
      </div>
    </ExpenseProvider>
  )
}

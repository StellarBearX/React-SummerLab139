import { useState } from 'react'
import { ExpenseProvider } from './context/ExpenseContext'
import Dashboard from './components/Dashboard'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import ExpenseChart from './components/ExpenseChart'
import BudgetSetter from './components/BudgetSetter'
import styles from './App.module.css'

const APP_NAME = import.meta.env.VITE_APP_NAME ?? 'Personal Expense Tracker'

export default function App() {
  const [editingExpense, setEditingExpense] = useState(null)

  return (
    <ExpenseProvider>
      <div className={styles.appWrapper}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerInner}>
            <div className={styles.headerBrand}>
              <span className={styles.headerIcon}>💼</span>
              <div>
                <h1 className={styles.headerTitle}>{APP_NAME}</h1>
                <p className={styles.headerSubtitle}>ติดตามรายจ่ายของคุณ</p>
              </div>
            </div>
            <p className={styles.headerDate}>
              {new Date().toLocaleDateString('th-TH', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className={styles.main}>
          {/* Dashboard Summary Cards */}
          <Dashboard />

          {/* Content Grid */}
          <div className={styles.contentGrid}>
            {/* Left Column: Form + Budget */}
            <div className={styles.leftColumn}>
              <BudgetSetter />
              <ExpenseForm
                editingExpense={editingExpense}
                onCancelEdit={() => setEditingExpense(null)}
              />
            </div>

            {/* Right Column: Chart + List */}
            <div className={styles.rightColumn}>
              <ExpenseChart />
              <ExpenseList onEdit={setEditingExpense} />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className={styles.footer}>
          {APP_NAME} • ข้อมูลถูกบันทึกในอุปกรณ์ของคุณ (localStorage)
        </footer>
      </div>
    </ExpenseProvider>
  )
}

/**
 * exportToCSV — แปลง expenses array เป็นไฟล์ .csv แล้ว trigger download
 *
 * ขั้นตอน:
 * 1. สร้าง header row
 * 2. Map expense objects เป็น arrays
 * 3. Join ด้วย comma และ newline
 * 4. เพิ่ม BOM (﻿) เพื่อให้ Excel อ่าน UTF-8 ภาษาไทยได้ถูกต้อง
 * 5. สร้าง Blob → Object URL → click programmatically → revoke URL
 */
export function exportToCSV(expenses) {
  if (expenses.length === 0) {
    alert('ไม่มีข้อมูลสำหรับ Export')
    return
  }

  const headers = ['ชื่อรายการ', 'จำนวนเงิน (บาท)', 'หมวดหมู่', 'วันที่']

  const rows = expenses
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map((e) => [
      `"${e.name.replace(/"/g, '""')}"`,  // escape quotes
      e.amount,
      e.category,
      e.date,
    ])

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.join(',')),
  ].join('\n')

  // BOM สำหรับ Excel ภาษาไทย
  const blob = new Blob(['﻿' + csvContent], {
    type: 'text/csv;charset=utf-8;',
  })

  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', `expenses_${new Date().toISOString().split('T')[0]}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

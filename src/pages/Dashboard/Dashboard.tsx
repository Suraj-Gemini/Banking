
import { NavLink, Route, Routes, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchDashboardData, setAccountTypes, setDateRange } from '../../features/dashboard/dashboardSlice'
import SummaryTab from './Tabs/SummaryTab'
import AccountsTab from './Tabs/AccountsTab'
import InvestmentsTab from './Tabs/InvestmentsTab'

export default function Dashboard() {
  const dispatch = useAppDispatch()
  const status = useAppSelector(s => s.dashboard.status)
  const filters = useAppSelector(s => s.dashboard.filters)

  useEffect(() => { if (status === 'idle') dispatch(fetchDashboardData()) }, [status, dispatch])

  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>Personal Investment Dashboard</h2>

      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <label className="small">Date Range</label>
          <div className="row">
            <input type="date" value={filters.startDate || ''} onChange={e => dispatch(setDateRange({ startDate: e.target.value || null, endDate: filters.endDate }))} />
            <input type="date" value={filters.endDate || ''} onChange={e => dispatch(setDateRange({ startDate: filters.startDate, endDate: e.target.value || null }))} />
          </div>
        </div>
        <div>
          <label className="small">Account Types</label>
          <select multiple value={filters.accountTypes as string[]} onChange={(e) => {
            const opts = Array.from(e.target.selectedOptions).map(o => o.value as any)
            dispatch(setAccountTypes(opts))
          }} style={{ minWidth: 220, height: 74 }}>
            <option value="Savings">Savings</option>
            <option value="Checking">Checking</option>
            <option value="FD">FD</option>
            <option value="CreditCard">CreditCard</option>
          </select>
        </div>
      </div>

      <div className="tabs" role="tablist">
        <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/dashboard/summary" role="tab">Summary</NavLink>
        <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/dashboard/accounts" role="tab">Accounts</NavLink>
        <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/dashboard/investments" role="tab">Investments</NavLink>
      </div>

      <Routes>
        <Route index element={<Navigate to="summary" replace />} />
        <Route path="summary" element={<SummaryTab />} />
        <Route path="accounts" element={<AccountsTab />} />
        <Route path="investments" element={<InvestmentsTab />} />
      </Routes>
    </div>
  )
}

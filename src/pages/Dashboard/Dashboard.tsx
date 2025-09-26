
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchDashboardData, setActiveTab, setAccountTypes, setDateRange } from '../../features/dashboard/dashboardSlice'
import DateRangePicker from '../../components/DateRangePicker'
import AccountsTab from './Tabs/AccountsTab'
import InvestmentsTab from './Tabs/InvestmentsTab'
import SummaryTab from './Tabs/SummaryTab'

export default function Dashboard(){
  const dispatch = useDispatch()
  const { status, filters, activeTab } = useSelector(s=>s.dashboard)

  useEffect(()=>{ if (status==='idle') dispatch(fetchDashboardData()) },[status, dispatch])

  return (
    <div className="grid" style={{gap:'1rem'}}>
      <div className="card">
        <h2 style={{marginTop:0}}>Personal Investment Dashboard</h2>
        <div className="row" style={{justifyContent:'space-between', alignItems:'flex-end'}}>
          <DateRangePicker start={filters.startDate} end={filters.endDate} onChange={(v)=>dispatch(setDateRange(v))} />
          <div className="field">
            <label>Account Types</label>
            <select multiple value={filters.accountTypes} onChange={(e)=>{
              const opts = Array.from(e.target.selectedOptions).map(o=>o.value)
              dispatch(setAccountTypes(opts))
            }} style={{minWidth:220, height:75}}>
              <option value="Savings">Savings</option>
              <option value="Checking">Checking</option>
              <option value="FD">FD</option>
              <option value="CreditCard">CreditCard</option>
            </select>
          </div>
        </div>
        <div className="tabs">
          <button className={activeTab==='summary'?'active':''} onClick={()=>dispatch(setActiveTab('summary'))}>Summary</button>
          <button className={activeTab==='accounts'?'active':''} onClick={()=>dispatch(setActiveTab('accounts'))}>Accounts</button>
          <button className={activeTab==='investments'?'active':''} onClick={()=>dispatch(setActiveTab('investments'))}>Investments</button>
        </div>
        {activeTab==='summary' && <SummaryTab />}
        {activeTab==='accounts' && <AccountsTab />}
        {activeTab==='investments' && <InvestmentsTab />}
      </div>
    </div>
  )
}


import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchTransactions, selectFiltered, selectPaged, selectTotals, setPage, setPageSize, setSearch, setTxFilters } from '../../features/transactions/transactionsSlice'
import Pagination from '../../components/Pagination'

function downloadCSV(rows){
  const header = ['transaction_id','date','type','amount','balance_after','description']
  const escape = (v)=>`"${String(v).replaceAll('"','""')}"`
  const csv = [header.join(',')].concat(rows.map(r=> header.map(h=>escape(r[h])).join(','))).join('')
  const blob = new Blob([csv], { type:'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'transactions.csv'
  link.click()
}

export default function Transactions(){
  const dispatch = useDispatch()
  const status = useSelector(s=>s.transactions.status)
  const page = useSelector(s=>s.transactions.page)
  const pageSize = useSelector(s=>s.transactions.pageSize)
  const search = useSelector(s=>s.transactions.search)
  const filters = useSelector(s=>s.transactions.filters)
  const rows = useSelector(selectPaged)
  const allFiltered = useSelector(selectFiltered)
  const totals = useSelector(selectTotals)

  useEffect(()=>{ if (status==='idle') dispatch(fetchTransactions()) },[status, dispatch])

  return (
    <div className="card">
      <h2 style={{marginTop:0}}>Transaction History</h2>

      <div className="grid cols-3">
        <div className="field"><label>Search by Txn ID</label><input value={search} onChange={e=>dispatch(setSearch(e.target.value))} placeholder="e.g., TXN-0012" /></div>
        <div className="field"><label>Date Range</label>
          <div className="row">
            <input type="date" value={filters.startDate || ''} onChange={e=>dispatch(setTxFilters({ startDate: e.target.value || null }))} />
            <input type="date" value={filters.endDate || ''} onChange={e=>dispatch(setTxFilters({ endDate: e.target.value || null }))} />
          </div>
        </div>
        <div className="field"><label>Type</label>
          <select value={filters.type} onChange={e=>dispatch(setTxFilters({ type: e.target.value }))}>
            <option value="all">All</option>
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
          </select>
        </div>
        <div className="field"><label>Balance min</label><input type="number" value={filters.minBalance} onChange={e=>dispatch(setTxFilters({ minBalance: e.target.value }))} /></div>
        <div className="field"><label>Balance max</label><input type="number" value={filters.maxBalance} onChange={e=>dispatch(setTxFilters({ maxBalance: e.target.value }))} /></div>
        <div className="field"><label>&nbsp;</label><button className="btn secondary" onClick={()=>dispatch(setTxFilters({ startDate:null, endDate:null, type:'all', minBalance:'', maxBalance:'' }))}>Reset Filters</button></div>
      </div>

      <div className="row" style={{justifyContent:'space-between', alignItems:'center'}}>
        <div>
          <span className="badge green">Total Credit: ₹{totals.credit.toLocaleString()}</span>{' '}
          <span className="badge red">Total Debit: ₹{totals.debit.toLocaleString()}</span>
        </div>
        <button className="btn" onClick={()=>downloadCSV(allFiltered)}>Download CSV</button>
      </div>

      <div className="separator" />

      <table className="table">
        <thead>
          <tr>
            <th>Txn ID</th>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Balance After</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r=> (
            <tr key={r.transaction_id}>
              <td>{r.transaction_id}</td>
              <td>{r.date}</td>
              <td>{r.type==='credit' ? <span className="badge green">Credit</span> : <span className="badge red">Debit</span>}</td>
              <td>₹{Number(r.amount).toLocaleString()}</td>
              <td>₹{Number(r.balance_after).toLocaleString()}</td>
              <td>{r.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{marginTop:'1rem'}}>
        <Pagination page={page} total={allFiltered.length} pageSize={pageSize} onPage={(p)=>dispatch(setPage(p))} onPageSize={(s)=>dispatch(setPageSize(s))} />
      </div>
    </div>
  )
}

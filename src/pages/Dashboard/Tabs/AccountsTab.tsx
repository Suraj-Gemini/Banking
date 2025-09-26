
import { useSelector } from 'react-redux'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444']

export default function AccountsTab(){
  const { accounts, filters } = useSelector(s=>s.dashboard)
  const filtered = accounts.filter(a=>{
    if (filters.accountTypes.length && !filters.accountTypes.includes(a.type)) return false
    return true
  })
  const data = filtered.map(a=>({ name: `${a.type} (${a.accountId})`, value: a.balance }))

  return (
    <div className="grid cols-2">
      <div className="card">
        <h3 style={{marginTop:0}}>Balances by Account</h3>
        <div style={{width:'100%', height:320}}>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v)=>`₹${v.toLocaleString()}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="card">
        <h3 style={{marginTop:0}}>Accounts</h3>
        <table className="table">
          <thead>
            <tr><th>Account</th><th>Type</th><th>Balance</th></tr>
          </thead>
          <tbody>
            {filtered.map(a=> (
              <tr key={a.accountId}>
                <td>{a.accountId}</td>
                <td>{a.type}</td>
                <td>₹{Number(a.balance).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

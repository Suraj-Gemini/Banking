
import { useSelector } from 'react-redux'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

export default function InvestmentsTab(){
  const { investments } = useSelector(s=>s.dashboard)
  if(!investments) return <div className="card">Loading...</div>

  const lines = [
    { key: 'mutualFunds', name: 'Mutual Funds', color: '#2563eb' },
    { key: 'stocksValue', name: 'Stocks', color: '#10b981' },
    { key: 'returns', name: 'Returns', color: '#f59e0b' },
  ]

  return (
    <div className="grid cols-2">
      <div className="card">
        <h3 style={{marginTop:0}}>Monthly Investment Performance</h3>
        <div style={{width:'100%', height:320}}>
          <ResponsiveContainer>
            <LineChart data={investments.timeseries} margin={{ left: 8, right: 8, top: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(v)=>`₹${Number(v).toLocaleString()}`} />
              <Legend />
              {lines.map(l => (
                <Line key={l.key} type="monotone" dataKey={l.key} name={l.name} stroke={l.color} strokeWidth={2} dot={false} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="card">
        <h3 style={{marginTop:0}}>Holdings</h3>
        <div className="grid cols-2">
          <div>
            <h4>Mutual Funds</h4>
            <ul>
              {investments.mutualFunds.map(m => (
                <li key={m.name}>{m.name}: ₹{m.currentValue.toLocaleString()} (Invested ₹{m.amountInvested.toLocaleString()})</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Stocks</h4>
            <ul>
              {investments.stocks.map(s => (
                <li key={s.symbol}>{s.symbol}: {s.units} @ ₹{s.currentPrice} (Avg ₹{s.buyPrice})</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

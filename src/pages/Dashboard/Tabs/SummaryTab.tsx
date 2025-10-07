import { useAppSelector } from '../../../store/hooks'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useMemo } from 'react'
export default function SummaryTab() {
  const { allCreditCardSpends, investments, accounts, filters } = useAppSelector(s => s.dashboard)

  const totalBalance = accounts.reduce((a, b) => a + Number(b.balance), 0)
  const totalInvested = investments ? investments.mutualFunds.reduce((a, b) => a + b.amountInvested, 0) + investments.stocks.reduce((a, b) => a + (b.units * b.buyPrice), 0) : 0

  const filteredCreditCardData = useMemo(() => {
  return allCreditCardSpends.filter(row => {
    const m = row.month + '-01' // Convert to full date format
    if (filters.startDate && m < filters.startDate) return false
    if (filters.endDate && m > filters.endDate) return false
    return true
  })
}, [allCreditCardSpends, filters.startDate, filters.endDate])


  return (
    <div className="grid cols">
      <div className="card">
        <h3 style={{ marginTop: 0 }}>Summary</h3>
        <div className="grid cols-2">
          <div>
            <div className="small">Total Bank Balance</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 700 }}>₹{totalBalance.toLocaleString()}</div>
          </div>
          <div>
            <div className="small">Total Invested (MF+Stocks)</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 700 }}>₹{totalInvested.toLocaleString()}</div>
          </div>
        </div>
        <div className="separator" />
        <h4>Credit Card Spends (Monthly)</h4>
        <div style={{ width: '100%', height: 280 }}>
          <ResponsiveContainer>

            <AreaChart data={filteredCreditCardData} margin={{ left: 8, right: 8, top: 10, bottom: 10 }}>
              <defs>
                <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(v: number) => `₹${Number(v).toLocaleString()}`} />
              <Legend />
              <Area type="monotone" dataKey="spend" name="Spends" stroke="#ef4444" fillOpacity={1} fill="url(#colorSpend)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}


interface Props {
  start: string | null
  end: string | null
  onChange: (v: { startDate: string | null; endDate: string | null }) => void
}
export default function DateRangePicker({ start, end, onChange }: Props){
  return (
    <div className="row">
      <div className="field">
        <label>Start Date</label>
        <input type="date" value={start || ''} onChange={e=>onChange({ startDate: e.target.value || null, endDate: end })} />
      </div>
      <div className="field">
        <label>End Date</label>
        <input type="date" value={end || ''} onChange={e=>onChange({ startDate: start, endDate: e.target.value || null })} />
      </div>
    </div>
  )
}

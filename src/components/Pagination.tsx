
interface Props{
  page: number
  total: number
  pageSize: number
  onPage: (p:number) => void
  onPageSize: (s:number) => void
}
export default function Pagination({ page, total, pageSize, onPage, onPageSize }: Props){
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  return (
    <div className="row" style={{alignItems:'center', justifyContent:'space-between'}}>
      <div className="row" style={{gap:'.25rem'}}>
        <button className="btn secondary" disabled={page<=1} onClick={()=>onPage(1)}>⏮</button>
        <button className="btn secondary" disabled={page<=1} onClick={()=>onPage(page-1)}>◀</button>
        <span className="small">Page {page} / {totalPages}</span>
        <button className="btn secondary" disabled={page>=totalPages} onClick={()=>onPage(page+1)}>▶</button>
        <button className="btn secondary" disabled={page>=totalPages} onClick={()=>onPage(totalPages)}>⏭</button>
      </div>
      <div className="row" style={{alignItems:'center', gap:'.5rem'}}>
        <span className="small">Rows per page</span>
        <select value={pageSize} onChange={e=>onPageSize(Number(e.target.value))}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  )
}

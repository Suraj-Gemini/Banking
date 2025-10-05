
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { toggleTheme } from '../features/theme/themeSlice'

export default function ThemeToggle(){
  const dispatch = useAppDispatch()
  const mode = useAppSelector(s=>s.theme.mode)
  return (
    <button className="btn secondary" onClick={()=>dispatch(toggleTheme())} aria-label="Toggle theme">
      {mode === 'light' ? '🌞 Light' : '🌙 Dark'}
    </button>
  )
}

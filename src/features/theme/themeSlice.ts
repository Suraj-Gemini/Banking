
import { createSlice } from '@reduxjs/toolkit'

const initialTheme = (localStorage.getItem('theme') || 'light') as 'light' | 'dark'
document.documentElement.setAttribute('data-theme', initialTheme)

const themeSlice = createSlice({
  name: 'theme',
  initialState: { mode: initialTheme as 'light' | 'dark' },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
      document.documentElement.setAttribute('data-theme', state.mode)
      localStorage.setItem('theme', state.mode)
    }
  }
})

export const { toggleTheme } = themeSlice.actions
export default themeSlice.reducer

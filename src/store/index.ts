
import { configureStore } from '@reduxjs/toolkit'
import themeReducer from '../features/theme/themeSlice'
import dashboardReducer from '../features/dashboard/dashboardSlice'

const store = configureStore({
  reducer: {
    theme: themeReducer,
    dashboard: dashboardReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store

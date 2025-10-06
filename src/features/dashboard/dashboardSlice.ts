
// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit';

// export type Account = { accountId: string; type: 'Savings'|'Checking'|'FD'|'CreditCard'; balance: number }
// export type InvestmentTimeseriesRow = { month: string; mutualFunds: number; stocksValue: number; returns: number }
// export type MutualFund = { name: string; amountInvested: number; currentValue: number }
// export type Stock = { symbol: string; units: number; buyPrice: number; currentPrice: number }
// export type Investments = { mutualFunds: MutualFund[]; stocks: Stock[]; timeseries: InvestmentTimeseriesRow[] }
// export type CreditCardSpend = { month: string; spend: number }

// export type DashboardData = {
//   accounts: Account[]
//   investments: Investments
//   creditCardSpends: CreditCardSpend[]
// }

// export const fetchDashboardData = createAsyncThunk<DashboardData>('dashboard/fetch', async () => {
//   const accounts = (await import('../../mockAPI/accounts.json')).default as Account[]
//   const investments = (await import('../../mockAPI/investments.json')).default as Investments
//   const cc = (await import('../../mockAPI/creditCardSpends.json')).default as CreditCardSpend[]
//   await new Promise(r => setTimeout(r, 300))
//   return { accounts, investments, creditCardSpends: cc }
// })

// export type DashboardFilters = { startDate: string | null; endDate: string | null; accountTypes: Account['type'][] }

// const slice = createSlice({
//   name: 'dashboard',
//   initialState: {
//     status: 'idle' as 'idle'|'loading'|'succeeded'|'failed',
//     accounts: [] as Account[],
//     investments: null as Investments | null,
//     creditCardSpends: [] as CreditCardSpend[],
//     filters: { startDate: null, endDate: null, accountTypes: [] as Account['type'][] } as DashboardFilters,
//   },
//   reducers: {
//     setDateRange: (state, action: PayloadAction<{ startDate: string | null; endDate: string | null }>) => {
//       state.filters.startDate = action.payload.startDate
//       state.filters.endDate = action.payload.endDate
//     },
//     setAccountTypes: (state, action: PayloadAction<Account['type'][]>) => {
//       state.filters.accountTypes = action.payload
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchDashboardData.pending, (state)=>{ state.status='loading' })
//       .addCase(fetchDashboardData.fulfilled, (state, action)=>{
//         state.status='succeeded'
//         state.accounts = action.payload.accounts
//         state.investments = action.payload.investments
//         state.creditCardSpends = action.payload.creditCardSpends
//       })
//       .addCase(fetchDashboardData.rejected, (state)=>{ state.status='failed' })
//   }
// })

// export const { setDateRange, setAccountTypes } = slice.actions
// export default slice.reducer

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type Account = { accountId: string; type: 'Savings'|'Checking'|'FD'|'CreditCard'; balance: number };
export type InvestmentTimeseriesRow = { month: string; mutualFunds: number; stocksValue: number; returns: number };
export type MutualFund = { name: string; amountInvested: number; currentValue: number };
export type Stock = { symbol: string; units: number; buyPrice: number; currentPrice: number };
export type Investments = { mutualFunds: MutualFund[]; stocks: Stock[]; timeseries: InvestmentTimeseriesRow[] };
export type CreditCardSpend = { month: string; spend: number };

export type DashboardData = {
  accounts: Account[];
  investments: Investments;
  creditCardSpends: CreditCardSpend[];
};

export const fetchDashboardData = createAsyncThunk<DashboardData>('dashboard/fetch', async () => {
  const accounts = (await import('../../mockAPI/accounts.json')).default as Account[];
  const investments = (await import('../../mockAPI/investments.json')).default as Investments;
  const cc = (await import('../../mockAPI/creditCardSpends.json')).default as CreditCardSpend[];
  await new Promise(r => setTimeout(r, 300));
  return { accounts, investments, creditCardSpends: cc };
});

export type DashboardFilters = { startDate: string | null; endDate: string | null; accountTypes: Account['type'][] };

const slice = createSlice({
  name: 'dashboard',
  initialState: {
    status: 'idle' as 'idle'|'loading'|'succeeded'|'failed',
    accounts: [] as Account[],
    investments: null as Investments | null,
    creditCardSpends: [] as CreditCardSpend[],
    allCreditCardSpends: [] as CreditCardSpend[], // preserve original data
    filters: { startDate: null, endDate: null, accountTypes: [] as Account['type'][] } as DashboardFilters,
  },
  reducers: {
    setDateRange: (state, action: PayloadAction<{ startDate: string | null; endDate: string | null }>) => {
      state.filters.startDate = action.payload.startDate;
      state.filters.endDate = action.payload.endDate;
    },
    setAccountTypes: (state, action: PayloadAction<Account['type'][]>) => {
      state.filters.accountTypes = action.payload;
    },
    filterCreditCardSpendsByDateRange: (state, action: PayloadAction<{ startDate: string; endDate: string }>) => {
      const { startDate, endDate } = action.payload;
      const start = new Date(startDate + '-01');
      const end = new Date(endDate + '-01');
      state.creditCardSpends = state.allCreditCardSpends.filter(spend => {
        const spendDate = new Date(spend.month + '-01');
        return spendDate >= start && spendDate <= end;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.accounts = action.payload.accounts;
        state.investments = action.payload.investments;
        state.creditCardSpends = action.payload.creditCardSpends;
        state.allCreditCardSpends = action.payload.creditCardSpends;
      })
      .addCase(fetchDashboardData.rejected, (state) => { state.status = 'failed'; });
  }
});

export const { setDateRange, setAccountTypes, filterCreditCardSpendsByDateRange } = slice.actions;
export default slice.reducer;
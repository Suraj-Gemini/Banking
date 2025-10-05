// import Transactions from "../src/pages/Transactions/Transactions";
// import { AppBar, Toolbar, Typography, Button } from '@mui/material';
// import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
// import LoanForm from './pages/Loan/LoanForm';

// function App() {
//   return (
    
//      <Router>
//       <AppBar position="fixed">
//         <Toolbar>
//           <Typography variant="h6" sx={{ flexGrow: 1 }}>
//             Banking App
//           </Typography>
//           <Button color="inherit" component={Link} to="/loan">
//             Loan
//           </Button>
//         </Toolbar>
//       </AppBar>
//         <Routes>
//           <Route path="/loan" element={<LoanForm />} />
//         </Routes>

//     </Router>
    
   
//   );
// }

// export default App;


import { NavLink, Route, Routes, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'
import LoanForm from './pages/Loan/LoanForm'
import Transactions from './pages/Transactions/Transactions'
import ThemeToggle from './components/ThemeToggle'

export default function App(){
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Banking App</h1>
        <nav>
          <NavLink to="/dashboard/summary" className={({isActive})=> isActive? 'active': ''}>Dashboard</NavLink>
          <NavLink to="/loan" className={({isActive})=> isActive? 'active': ''}>Loan</NavLink>
          <NavLink to="/transactions" className={({isActive})=> isActive? 'active': ''}>Transactions</NavLink>
        </nav>
        <ThemeToggle />
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard/summary" replace />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/loan" element={<LoanForm />} />
          <Route path="/transactions" element={<Transactions />} />
        </Routes>
      </main>
    </div>
  )
}

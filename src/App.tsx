import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import LoanForm from './pages/Loan/LoanForm';

function App() {
  return (
    
     <Router>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Banking App
          </Typography>
          <Button color="inherit" component={Link} to="/loan">
            Loan
          </Button>
        </Toolbar>
      </AppBar>
        <Routes>
          <Route path="/loan" element={<LoanForm />} />
        </Routes>
   
    </Router>
    
   
  );
}

export default App;

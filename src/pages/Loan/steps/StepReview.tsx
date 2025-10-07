import { Box, Button, Typography } from '@mui/material';
import { type UseFormGetValues } from 'react-hook-form';
import { type LoanFormData } from '../loanSchema';

interface StepReviewProps {
  getValues: UseFormGetValues<LoanFormData>;
   setStep: (step: number) => void;
}

export default function StepReview({ getValues}: StepReviewProps) {
  const values = getValues();

  return (
    <Box className="review-grid">
         <Typography variant="h6">
     Personal Information{' '}
    
  </Typography>
      <Typography><strong>Full Name:</strong> {values.fullName}</Typography>
      <Typography><strong>Email:</strong> {values.email}</Typography>
      <Typography><strong>Phone:</strong> {values.phone}</Typography>
      <Typography><strong>Date of Birth:</strong> {values.dob}</Typography>
      <Typography><strong>Address:</strong> {values.address}</Typography>
      
      <Typography variant="h6">
        Loan Details{' '}

      </Typography>
      <Typography><strong>Loan Type:</strong> {values.loanType}</Typography>
      <Typography><strong>Amount:</strong> ₹{values.amount}</Typography>
      <Typography><strong>Tenure:</strong> {values.tenure} months</Typography>
      <Typography><strong>Annual Income:</strong> ₹{values.income}</Typography>
      <Typography variant="h6">
        Documents{' '}
      </Typography>
      <Typography><strong>Aadhar:</strong> {getValues().aadhar?.[0]?.name || 'Not uploaded'}</Typography>
      <Typography variant="body1"><strong>PAN:</strong> {getValues().pan?.[0]?.name || 'Not uploaded'}</Typography>
    </Box>
  );
}

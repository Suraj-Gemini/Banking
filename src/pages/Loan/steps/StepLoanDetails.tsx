// import { Box, TextField, MenuItem } from '@mui/material';
// import type { FieldErrors, UseFormRegister, UseFormGetValues } from 'react-hook-form';
// import { type LoanFormData } from '../loanSchema';

// interface StepLoanDetailsProps {
//   register: UseFormRegister<LoanFormData>;
//   errors: FieldErrors<LoanFormData>;
//   getValues: UseFormGetValues<LoanFormData>;
// }

// export default function StepLoanDetails({ register, errors, getValues }: StepLoanDetailsProps) {
//   return (
//     <Box className="grid cols-2">
//       <TextField
//         label="Loan Type"
//         select
//         {...register('loanType')}
//         error={!!errors.loanType}
//         fullWidth
//         value={getValues().loanType || 'Personal'}
//       >
//         <MenuItem value="Home">Home</MenuItem>
//         <MenuItem value="Personal">Personal</MenuItem>
//         <MenuItem value="Auto">Auto</MenuItem>
//         <MenuItem value="Education">Education</MenuItem>
//       </TextField>
//       <TextField
//         label="Amount (₹)"
//         type="number"
//         {...register('amount', { valueAsNumber: true })}
//         error={!!errors.amount}
//         helperText={errors.amount?.message}
//         fullWidth
//       />
//       <TextField
//         label="Tenure (months)"
//         type="number"
//         {...register('tenure', { valueAsNumber: true })}
//         error={!!errors.tenure}
//         helperText={errors.tenure?.message}
//         fullWidth
//       />
//       <TextField
//         label="Annual Income (₹)"
//         type="number"
//         {...register('income', { valueAsNumber: true })}
//         error={!!errors.income}
//         helperText={errors.income?.message}
//         fullWidth
//       />
//     </Box>
//   );
// }

import { Box, TextField, MenuItem } from '@mui/material';
import type { FieldErrors, UseFormRegister, UseFormGetValues } from 'react-hook-form';
import { type LoanFormData } from '../loanSchema';

interface StepLoanDetailsProps {
  register: UseFormRegister<LoanFormData>;
  errors: FieldErrors<LoanFormData>;
  getValues: UseFormGetValues<LoanFormData>;
}

// Theme-aware styles using CSS variables
const inputStyles = {
  '& .MuiInputBase-input': {
    backgroundColor: 'var(--input-bg)',
    color: 'var(--input-text)',
  },
  '& .MuiInputLabel-root': {
    color: 'var(--input-label)',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'var(--input-border)',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'var(--input-border)',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'var(--input-border)',
  },
  '& .MuiSelect-icon': {
    color: 'var(--input-text)',
  },
};

export default function StepLoanDetails({ register, errors, getValues }: StepLoanDetailsProps) {
  return (
    <Box
      className="grid cols-2"
      sx={{
        backgroundColor: 'var(--bg-color)',
        color: 'var(--text-color)',
        gap: 2,
        padding: 2,
        borderRadius: 2,
      }}
    >
      <TextField
        label="Loan Type"
        select
        {...register('loanType')}
        error={!!errors.loanType}
        fullWidth
        value={getValues().loanType || 'Personal'}
        sx={inputStyles}
      >
        <MenuItem value="Home">Home</MenuItem>
        <MenuItem value="Personal">Personal</MenuItem>
        <MenuItem value="Auto">Auto</MenuItem>
        <MenuItem value="Education">Education</MenuItem>
      </TextField>

      <TextField
        label="Amount (₹)"
        type="number"
        {...register('amount', { valueAsNumber: true })}
        error={!!errors.amount}
        helperText={errors.amount?.message}
        fullWidth
        sx={inputStyles}
      />

      <TextField
        label="Tenure (months)"
        type="number"
        {...register('tenure', { valueAsNumber: true })}
        error={!!errors.tenure}
        helperText={errors.tenure?.message}
        fullWidth
        sx={inputStyles}
      />

      <TextField
        label="Annual Income (₹)"
        type="number"
        {...register('income', { valueAsNumber: true })}
        error={!!errors.income}
        helperText={errors.income?.message}
        fullWidth
        sx={inputStyles}
      />
    </Box>
  );
}

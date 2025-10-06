// import { Box, TextField } from '@mui/material';
// import type { FieldErrors, UseFormRegister } from 'react-hook-form';
// import type { LoanFormData } from '../loanSchema';

// interface StepPersonalProps {
//   register: UseFormRegister<LoanFormData>;
//   errors: FieldErrors<LoanFormData>;
// }

// export default function StepPersonal({ register, errors }: StepPersonalProps) {
//   return (
//     <Box className="grid cols-2">
//       <TextField
//         label="Full Name"
//         {...register('fullName')}
//         error={!!errors.fullName}
//         helperText={errors.fullName?.message}
//         fullWidth
//         className="input_first"
//       />
//       <TextField
//         label="Email"
//         type="email"
//         {...register('email')}
//         error={!!errors.email}
//         helperText={errors.email?.message}
//         fullWidth
//       />
//       <TextField
//         label="Phone"
//         {...register('phone')}
//         error={!!errors.phone}
//         helperText={errors.phone?.message}
//         fullWidth
//       />
//       <TextField
//         label="Date of Birth"
//         type="date"
//         InputLabelProps={{ shrink: true }}
//         {...register('dob')}
//         error={!!errors.dob}
//         helperText={errors.dob?.message}
//         fullWidth
//       />
//       <TextField
//         label="Address"
//         multiline
//         rows={3}
//         {...register('address')}
//         error={!!errors.address}
//         helperText={errors.address?.message}
//         fullWidth
//       />
//     </Box>
//   );
// }

import { Box, TextField } from '@mui/material';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { LoanFormData } from '../loanSchema';

interface StepPersonalProps {
  register: UseFormRegister<LoanFormData>;
  errors: FieldErrors<LoanFormData>;
}

// Theme-aware styles using CSS variables and correct MUI selectors
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
};

export default function StepPersonal({ register, errors }: StepPersonalProps) {
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
        label="Full Name"
        {...register('fullName')}
        error={!!errors.fullName}
        helperText={errors.fullName?.message}
        fullWidth
        sx={inputStyles}
      />
      <TextField
        label="Email"
        type="email"
        {...register('email')}
        error={!!errors.email}
        helperText={errors.email?.message}
        fullWidth
        sx={inputStyles}
      />
      <TextField
        label="Phone"
        {...register('phone')}
        error={!!errors.phone}
        helperText={errors.phone?.message}
        fullWidth
        sx={inputStyles}
      />
      <TextField
        label="Date of Birth"
        type="date"
        InputLabelProps={{ shrink: true }}
        {...register('dob')}
        error={!!errors.dob}
        helperText={errors.dob?.message}
        fullWidth
        sx={inputStyles}
      />
      <TextField
        label="Address"
        multiline
        rows={3}
        {...register('address')}
        error={!!errors.address}
        helperText={errors.address?.message}
        fullWidth
        sx={inputStyles}
      />
    </Box>
  );
}

import { Box, TextField } from '@mui/material';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { LoanFormData } from '../loanSchema';

interface StepPersonalProps {
  register: UseFormRegister<LoanFormData>;
  errors: FieldErrors<LoanFormData>;
}

export default function StepPersonal({ register, errors }: StepPersonalProps) {
  return (
    <Box className="grid cols-2">
      <TextField
        label="Full Name"
        {...register('fullName')}
        error={!!errors.fullName}
        helperText={errors.fullName?.message}
        fullWidth
        className="input_first"
      />
      <TextField
        label="Email"
        type="email"
        {...register('email')}
        error={!!errors.email}
        helperText={errors.email?.message}
        fullWidth
      />
      <TextField
        label="Phone"
        {...register('phone')}
        error={!!errors.phone}
        helperText={errors.phone?.message}
        fullWidth
      />
      <TextField
        label="Date of Birth"
        type="date"
        InputLabelProps={{ shrink: true }}
        {...register('dob')}
        error={!!errors.dob}
        helperText={errors.dob?.message}
        fullWidth
      />
      <TextField
        label="Address"
        multiline
        rows={3}
        {...register('address')}
        error={!!errors.address}
        helperText={errors.address?.message}
        fullWidth
      />
    </Box>
  );
}

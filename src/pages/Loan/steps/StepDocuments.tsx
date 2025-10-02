import { Box, TextField } from '@mui/material';
import type { UseFormRegister } from 'react-hook-form';
import type { LoanFormData } from '../loanSchema';

interface StepDocumentsProps {
  register: UseFormRegister<LoanFormData>;
}

export default function StepDocuments({ register }: StepDocumentsProps) {
  return (
    <Box className="grid cols-2">
      <TextField
        label="Upload Aadhar"
        type="file"
        inputProps={{ accept: 'image/*,application/pdf',  multiple: false  }}
        {...register('aadhar')}
        fullWidth
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Upload PAN"
        type="file"
        inputProps={{ accept: 'image/*,application/pdf',  multiple: false  }}
        {...register('pan')}
        fullWidth
        InputLabelProps={{ shrink: true }}
      />
    </Box>
  );
}

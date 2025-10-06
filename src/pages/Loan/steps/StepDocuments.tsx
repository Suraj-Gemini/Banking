// import { Box, TextField } from '@mui/material';
// import type { UseFormRegister } from 'react-hook-form';
// import type { LoanFormData } from '../loanSchema';

// interface StepDocumentsProps {
//   register: UseFormRegister<LoanFormData>;
// }

// export default function StepDocuments({ register }: StepDocumentsProps) {
//   return (
//     <Box className="grid cols-2">
//       <TextField
//         label="Upload Aadhar"
//         type="file"
//         inputProps={{ accept: 'image/*,application/pdf',  multiple: false  }}
//         {...register('aadhar')}
//         fullWidth
//         InputLabelProps={{ shrink: true }}
//       />
//       <TextField
//         label="Upload PAN"
//         type="file"
//         inputProps={{ accept: 'image/*,application/pdf',  multiple: false  }}
//         {...register('pan')}
//         fullWidth
//         InputLabelProps={{ shrink: true }}
//       />
//     </Box>
//   );
// }

import { Box, TextField } from '@mui/material';
import type { UseFormRegister } from 'react-hook-form';
import type { LoanFormData } from '../loanSchema';

interface StepDocumentsProps {
  register: UseFormRegister<LoanFormData>;
}

// Theme-aware styles for file inputs
const fileInputStyles = {
  '& .MuiInputBase-input': {
    backgroundColor: 'var(--input-bg)',
    color: 'var(--input-text)',
    padding: '10px',
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


export default function StepDocuments({ register }: StepDocumentsProps) {
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
        label="Upload Aadhar"
        type="file"
        inputProps={{ accept: 'image/*,application/pdf', multiple: false }}
        {...register('aadhar')}
        fullWidth
        InputLabelProps={{ shrink: true }}
        sx={inputStyles}
      />
      <TextField
        label="Upload PAN"
        type="file"
        inputProps={{ accept: 'image/*,application/pdf', multiple: false }}
        {...register('pan')}
        fullWidth
        InputLabelProps={{ shrink: true }}
        sx={inputStyles}
      />
    </Box>
  );
}
